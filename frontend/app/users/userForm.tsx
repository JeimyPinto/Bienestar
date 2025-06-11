import { useEffect, useState } from "react";
import Image from "next/image";
import { UserFormProps, User } from "../types/user"
import { create, update } from "../services/services/user";
const emptyUser: User = {
    id: "",
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    email: "",
    password: "",
    status: "activo",
    role: "user",
    image: "",
    createdAt: "",
    updatedAt: "",
    services: [],
};

export default function UserForm(props: UserFormProps) {
    const { dialogRef, closeDialog, onClose, mode, userToEdit } = props;
    const [token, setToken] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<User>(emptyUser);

    // Obtener token y usuario autenticado
    useEffect(() => {
        let tokenValue: string | null = null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
            tokenValue = localStorage.getItem("token");
        } else {
            const cookie = document.cookie;
            tokenValue =
                cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null;
        }
        setToken(tokenValue);
    }, []);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && userToEdit) {
            setNewUser({ ...userToEdit, password: "" });
        } else if (mode === "create") {
            setNewUser(emptyUser);
        }
    }, [mode, userToEdit]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!token) return;

        try {
            let responseData;

            if (mode === "create") {
                responseData = await create(
                    newUser,
                    newUser.file ? newUser.file : undefined,
                    token
                );
                if (responseData.error) {
                    props.setErrorMessage?.(
                        responseData.error || "Error al crear el usuario. / Error creating user."
                    );
                } else {
                    props.setSuccessMessage?.(
                        responseData.message || "Usuario creado exitosamente. / User created successfully."
                    );
                }
            } else if (mode === "edit") {
                responseData = await update(
                    newUser.id,
                    newUser,
                    newUser.file ? newUser.file : undefined,
                    token
                );
                if (responseData.error) {
                    props.setErrorMessage?.(
                        responseData.error || "Error al actualizar el usuario. / Error updating user."
                    );
                } else {
                    props.setSuccessMessage?.(
                        responseData.message || "Usuario actualizado exitosamente. / User updated successfully."
                    );
                }
            }
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            if (mode === "create") {
                props.setErrorMessage?.("Error al crear el usuario. / Error creating user. " + error);
            } else if (mode === "edit") {
                props.setErrorMessage?.("Error al actualizar el usuario. / Error updating user. " + error);
            }
        }

        onClose?.();
        closeDialog();
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-azul">
                    {mode === "create"
                        ? "          Añadir Nuevo Usuario"
                        : "Editar Usuario"}
                </h2>
                <button
                    onClick={closeDialog}
                    className="text-cian hover:text-azul transition-colors"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-azul">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Tipo de Documento
                        </label>
                        <select
                            name="documentType"
                            value={newUser.documentType}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                            aria-required="true"
                        >
                            <option value="" disabled>
                                Seleccione una opción
                            </option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="PA">Pasaporte</option>
                            <option value="RC">Registro Civil</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="PEP">Permiso Especial de Permanencia</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Número de Documento
                        </label>
                        <input
                            type="text"
                            name="documentNumber"
                            value={newUser.documentNumber}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={newUser.phone}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-azul">Rol</label>
                        <select
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Estado
                        </label>
                        <select
                            name="status"
                            value={newUser.status}
                            onChange={handleInputChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                            required
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-azul">
                        Imagen de Perfil
                    </label>
                    {mode === "edit" && newUser.image && (
                        <div className="mb-4">
                            <Image
                                src={
                                    newUser?.image
                                        ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + newUser.image
                                        : "/images/ico-profile.svg"
                                }
                                alt={`${newUser.firstName} avatar`}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setNewUser((prevUser) => ({
                                    ...prevUser,
                                    file: file, // el archivo real
                                    image: file.name, // el nombre del archivo
                                }));
                            }
                        }}
                        className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian"
                    >
                        {mode === "create" ? "Guardar" : "Actualizar"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
