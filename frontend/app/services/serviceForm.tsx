import { useEffect, useState } from "react"
import Image from "next/image"
import { ServiceFormProps, Service, Area, User } from "../types/index"
import { create, update } from "../services/services/service"
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"
import getUserToken from "../lib/getUserToken"
import ServiceFormMainFields from "./serviceFormMainFields";
import ServiceFormAdminFields from "./serviceFormAdminFields";

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
    const [formError, setFormError] = useState<string>("");
    const [formSuccess, setFormSuccess] = useState<string>("");

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
            let userValue = null;
            if (tokenValue) {
                try {
                    userValue = getUserToken(tokenValue);
                } catch (e) {
                    userValue = null;
                }
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
            // Mostrar imagen actual si existe
            if (serviceToEdit.image) {
                setPreviewImage(`${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/services/${serviceToEdit.image}`);
            } else {
                setPreviewImage("");
            }
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
        setFormError("");
        setFormSuccess("");
        if (!newService.name.trim() || !newService.description.trim()) {
            setFormError("Todos los campos obligatorios deben estar completos.");
            return;
        }
        if (!token) {
            setFormError("No hay sesión activa. Por favor, inicia sesión.");
            return;
        }
        try {
            let responseData;
            if (mode === "create") {
                const { file, image, ...serviceData } = newService;
                serviceData.creatorId = user?.id ? Number(user.id) : 0;
                // No enviar image si está vacío o null
                if (!image) delete serviceData.image;
                responseData = await create(
                    serviceData,
                    file ? file : undefined,
                    token
                );
            } else if (mode === "edit") {
                // Solo enviar image si existe y no es null
                const { file, ...serviceData } = newService;
                if (!serviceData.image) delete serviceData.image;
                responseData = await update(
                    newService.id,
                    serviceData,
                    newService.file ? newService.file : undefined,
                    token
                );
            }
            if (!responseData) {
                setFormError("No se pudo procesar la solicitud. Intenta de nuevo.");
                props.setErrorMessage?.("No se pudo procesar la solicitud. Intenta de nuevo.");
                return;
            }
            if (responseData.error) {
                setFormError(responseData.message || responseData.error || "Error al guardar el servicio");
                props.setErrorMessage?.(responseData.message || responseData.error || "Error al guardar el servicio");
                return;
            }
            setFormSuccess(responseData.message || "Servicio guardado correctamente");
            props.setSuccessMessage?.(responseData.message || "Servicio guardado correctamente");
            onClose?.();
            closeDialog();
        } catch (error) {
            setFormError("Error inesperado al guardar el servicio. " + error);
            props.setErrorMessage?.("Error inesperado al guardar el servicio. " + error);
        }
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
                    className="text-cian hover:text-azul transition-colors p-1"
                    type="button"
                    aria-label="Cerrar"
                >
                    <Image
                        src="/images/ico-close.svg"
                        alt="Cerrar"
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ServiceFormMainFields
                        newService={newService}
                        handleInputChange={handleInputChange}
                    />
                    <ServiceFormAdminFields
                        newService={newService}
                        user={user}
                        handleInputChange={handleInputChange}
                    />
                    <div className="sm:col-span-2">
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
                {formError && (
                    <div className="text-red-600 text-center font-semibold">{formError}</div>
                )}
                {formSuccess && (
                    <div className="text-green-600 text-center font-semibold">{formSuccess}</div>
                )}
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