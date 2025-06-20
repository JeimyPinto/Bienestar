import { useEffect, useState } from "react";
import Image from "next/image";
import { UserFormProps, User } from "../types"
import { create, update } from "../services/services/user";
import { ROLES } from "../lib/roles";
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"

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
    const { dialogRef, closeDialog, onClose, mode, userToEdit, setSuccessMessage, setErrorMessage } = props;
    const [token, setToken] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<User>(emptyUser);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Obtener token
    useEffect(() => {
        const fetchData = async () => {
            const tokenValue = getToken();
            if (tokenValue) {
                if (isTokenExpired(tokenValue)) {
                    localStorage.removeItem("token");
                    setToken(null);
                } else {
                    setToken(tokenValue);
                }
            } else {
                setToken(null);
            }
        }
        fetchData();
    }, []);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && userToEdit) {
            setNewUser({ ...userToEdit, password: "" });
            setPreviewImage(null); // Limpiar preview al abrir modal de edición
        } else if (mode === "create") {
            setNewUser({ ...emptyUser }); // Asegura que todos los campos estén vacíos
            setPreviewImage(null);
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
                    setErrorMessage?.(responseData.message);
                } else {
                    if (responseData.details) {
                        setErrorMessage?.(responseData.message);
                    } else {
                        setSuccessMessage?.(responseData.message);
                    }
                }
            } else if (mode === "edit") {
                responseData = await update(
                    newUser.id,
                    newUser,
                    newUser.file ? newUser.file : undefined,
                    token
                );
               if (responseData.error) {
                    setErrorMessage?.(responseData.message);
                } else {
                    if (responseData.details) {
                        setErrorMessage?.(responseData.message);
                    } else {
                        setSuccessMessage?.(responseData.message);
                    }
                }
            }
            // Solo recarga si fue éxito
            if (!responseData.details) {
                window.location.reload();
            }
        } catch (error) {
            if (mode === "create") {
                setErrorMessage?.("Error al crear el usuario. / Error creating user. " + error);
            } else if (mode === "edit") {
                setErrorMessage?.("Error al actualizar el usuario. / Error updating user. " + error);
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
                            {Object.entries(ROLES).map(([key, value]) => (
                                <option key={value} value={value}>
                                    {key.charAt(0) + key.slice(1).toLowerCase()}
                                </option>
                            ))}
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
                    {mode === "edit" && (previewImage || newUser.image) && (
                        <div className="mb-4">
                            <Image
                                src={
                                    previewImage
                                        ? previewImage
                                        : `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${newUser.image}`
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
                                setPreviewImage(URL.createObjectURL(file));
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
