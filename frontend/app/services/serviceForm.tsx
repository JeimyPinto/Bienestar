
import { useEffect, useState } from "react"
import Image from "next/image"
import { ServiceFormProps, Service } from "../types/service"
import { User } from "../types/user"
import { create, update } from "../services/services/service"
import { Area } from "../types/service";

const emptyService: Service = {
    id: "",
    name: "",
    description: "",
    creatorId: 0,
    area: "Apoyo Socioeconomico y Reconocimiento a la Excelencia" as Area,
    image: "",
    status: "activo",
    createdAt: "",
    updatedAt: "",
};

export default function ServiceForm(props: ServiceFormProps) {
    const { dialogRef, closeDialog, onClose, mode, serviceToEdit } = props;
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [newService, setNewService] = useState<Service>(emptyService);

    // Obtener token y usuario autenticado
    useEffect(() => {
        let tokenValue: string | null = null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        // Extraer el token del localStorage o de las cookies
       const extractUserFromToken = (token: string) => {
        try {
          const base64Url = token.split(".")[1];
          let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          while (base64.length % 4 !== 0) {
            base64 += "=";
          }
          return JSON.parse(atob(base64));
        } catch {
          return null;
        }
      };

        if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
            tokenValue = localStorage.getItem("token");
        } else {
            // Buscar token en cookies
            const cookie = document.cookie;
            tokenValue = cookie.split("; ").find((row) =>
                row.startsWith("token="))?.split("=")[1] || null;
        }

        setToken(tokenValue);

        if (tokenValue) {
            setUser(extractUserFromToken(tokenValue));
        } else {
            setUser(null);
        }
    }, []);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && serviceToEdit) {
            setNewService({
                ...serviceToEdit,
                file: null, // Limpiar el archivo anterior si es edición
            });
        } else if (mode === "create") {
            setNewService(emptyService);
        }
    }, [mode, serviceToEdit]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewService((prevService) => ({
                ...prevService,
                file: file,
                image: URL.createObjectURL(file), // Previsualizar la imagen nueva
            }));
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!token) return;

        try {
            let responseData;

            if (mode === "create") {
                const { file, ...serviceData } = newService;
                serviceData.creatorId = user?.id ? Number(user.id) : 0;

                responseData = await create(
                    serviceData,
                    file ? file : undefined,
                    token
                );
                if (responseData.error) {
                    props.setErrorMessage?.(
                        responseData.error || "Error al crear el servicio. / Error creating service."
                    );
                } else {
                    props.setSuccessMessage?.(
                        responseData.message || "Servicio creado exitosamente. / Service created successfully."
                    );
                }
            } else if (mode === "edit") {
                responseData = await update(
                    newService.id,
                    newService,
                    newService.file ? newService.file : undefined,
                    token
                );
                if (responseData.error) {
                    props.setErrorMessage?.(
                        responseData.error || "Error al actualizar el servicio. / Error updating service."
                    );
                } else {
                    props.setSuccessMessage?.(
                        responseData.message || "Servicio actualizado exitosamente. / Service updated successfully."
                    );
                }
            }
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            if (mode === "create") {
                props.setErrorMessage?.("Error al crear el usuario. / Error creating user. (" + error + ")");
            } else if (mode === "edit") {
                props.setErrorMessage?.("Error al actualizar el usuario. / Error updating user. (" + error + ")");
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
                    {mode === "create" ? "Crear Servicio" : "Editar Servicio"}
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
                            name="name"
                            value={newService.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Descripción
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={newService.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Área
                        </label>
                        <select
                            name="area"
                            value={newService.area}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                            required
                        >
                            <option value="Salud">Salud</option>
                            <option value="Arte y Cultura">Arte y Cultura</option>
                            <option value="Deporte y Recreación">Deporte y Recreación</option>
                            <option value="Apoyo Socioeconomico y Reconocimiento a la Excelencia">
                                Apoyo Socioeconómico y Reconocimiento a la Excelencia
                            </option>
                            <option value="Apoyo Psicosocial">Apoyo Psicosocial</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Creador
                        </label>
                        <input
                            type="text"
                            name="creator"
                            value={user?.firstName ? user.firstName + " " + user.lastName : ""}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
                            tabIndex={-1}
                        />
                        <input
                            type="hidden"
                            name="creatorId"
                            value={user?.id ?? ""}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Estado
                        </label>
                        <select
                            name="status"
                            value={newService.status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Imagen de Perfil
                        </label>
                        {mode === "edit" && newService.image && (
                            <div className="mb-4">
                                <Image
                                    src={
                                        newService.file
                                            ? newService.image
                                            : (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + (serviceToEdit?.image || newService.image)
                                    }
                                    alt={`${newService.name} avatar`}
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
                            onChange={handleFileChange}
                            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cian text-blanco rounded-lg hover:bg-azul transition-colors"
                    >
                        {mode === "create" ? "Crear Servicio" : "Actualizar Servicio"}
                    </button>
                    <button
                        type="button"
                        onClick={closeDialog}
                        className="ml-4 px-4 py-2 bg-gris text-blanco rounded-lg hover:bg-gris-claro transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </dialog>
    );
}