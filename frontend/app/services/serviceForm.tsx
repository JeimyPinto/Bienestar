import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ServiceFormProps, Service } from "../types/service"
import { User } from "../types/user"
import { create, update } from "../services/services/service"
import { Area } from "../types/service";
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"
import getUserToken from "../lib/getUserToken"

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
    const [previewImage, setPreviewImage] = useState<string>("");
    const firstRender = useRef(true);

    // Mostrar modal automáticamente al montar
    useEffect(() => {
        if (dialogRef && typeof dialogRef !== "function" && dialogRef.current) {
            dialogRef.current.showModal?.();
        }
    }, [dialogRef]);

     // Obtener token
        useEffect(() => {
            const fetchData = async () => {
              const tokenValue = getToken();
              const userValue = getUserToken();
              if (tokenValue) {
                if (isTokenExpired(tokenValue)) {
                  localStorage.removeItem("token");
                  setToken(null);
                  setUser(null);
                } else {
                  setToken(tokenValue);
                    setUser(userValue as User);
                }
              } else {
                setToken(null);
                setUser(null);
              }
            }
            fetchData();
        }, []);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && serviceToEdit) {
            setNewService({
                ...serviceToEdit,
                file: null, // Limpiar el archivo anterior si es edición
            });
            setPreviewImage((process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + (serviceToEdit.image || ""));
        } else if (mode === "create") {
            setNewService(emptyService);
            setPreviewImage("");
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
            }));
            setPreviewImage(URL.createObjectURL(file));
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
                        {previewImage && (
                            <div className="mb-4">
                                <Image
                                    src={previewImage}
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