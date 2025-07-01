import { useEffect, useState } from "react"
import Image from "next/image"
import { ServiceFormProps, Service, Area } from "../types/index"
import { create, update } from "../services/services/service"
import ServiceFormMainFields from "./serviceFormMainFields";
import ServiceFormAdminFields from "./serviceFormAdminFields";
import { useAuth } from "../hooks/useAuth";

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
    const { token, user, isExpired } = useAuth();
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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
        if (!token || isExpired) {
            setFormError("No hay sesión activa o el token expiró. Por favor, inicia sesión.");
            return;
        }
        try {
            let responseData;
            if (mode === "create") {
                const { file, ...serviceData } = newService;
                serviceData.creatorId = user?.id ? Number(user.id) : 0;
                // No enviar image si está vacío o null
                if (!newService.image) delete (serviceData as Partial<typeof newService>).image;
                responseData = await create(
                    serviceData,
                    file ? file : undefined,
                    token
                );
            } else if (mode === "edit") {
                // Solo enviar image si existe y no es null
                const { ...serviceData } = newService;
                if (!newService.image) delete (serviceData as Partial<typeof newService>).image;
                responseData = await update(
                    newService.id,
                    serviceData,
                    newService.file ? newService.file : undefined,
                    token
                );
            }
            if (!responseData) {
                setFormError("No se pudo procesar la solicitud. Intenta de nuevo.");
                return;
            }
            if (responseData.error) {
                setFormError(responseData.message || responseData.error || "Error al guardar el servicio");
                props.setErrorMessage?.(responseData.message || responseData.error || "Error al guardar el servicio");
                return;
            }
            setFormSuccess(responseData.message || "Servicio guardado correctamente");
            props.setSuccessMessage?.(responseData.message || "Servicio guardado correctamente");
            // --- NUEVO: Llama a onClose para recargar la tabla ---
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
            className="rounded-2xl shadow-2xl p-0 bg-white w-full max-w-4xl mx-auto border border-azul-cielo/20 backdrop-blur-sm"
        >
            <div className="bg-gradient-to-r from-primary to-azul-cielo p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">
                        {mode === "create" ? "✨ Crear Nuevo Servicio" : "✏️ Editar Servicio"}
                    </h2>
                    <button
                        onClick={closeDialog}
                        className="text-white hover:text-azul-cielo transition-colors p-2 rounded-lg hover:bg-white/20"
                        type="button"
                        aria-label="Cerrar"
                    >
                        <Image
                            src="/images/ico-close.svg"
                            alt="Cerrar"
                            width={24}
                            height={24}
                            className="filter invert brightness-0"
                        />
                    </button>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 lg:w-2/3">
                        <fieldset className="border-2 border-azul-cielo/30 rounded-xl p-4 bg-gradient-to-br from-white to-azul-cielo/5">
                            <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
                                <span className="mr-2">📝</span>
                                Información Principal
                            </legend>
                            <ServiceFormMainFields
                                newService={newService}
                                handleInputChange={handleInputChange}
                            />
                        </fieldset>
                    </div>
                    
                    <div className="lg:w-1/3">
                        <fieldset className="border-2 border-success/30 rounded-xl p-4 bg-gradient-to-br from-white to-success/5 h-fit">
                            <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
                                <span className="mr-2">🖼️</span>
                                Imagen del Servicio
                            </legend>
                            {previewImage && (
                                <div className="mb-4 flex justify-center">
                                    <div className="relative">
                                        <Image
                                            src={previewImage}
                                            alt={`${newService.name} imagen`}
                                            width={120}
                                            height={120}
                                            className="w-30 h-30 rounded-xl object-cover border-2 border-azul-cielo/30 shadow-md"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-success text-white rounded-full p-1">
                                            <span className="text-xs">✓</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="
                                    w-full border-2 border-azul-cielo/30 rounded-lg p-3 
                                    focus:ring-2 focus:ring-primary focus:border-primary 
                                    focus:outline-none transition-all duration-300
                                    hover:border-primary/50 bg-white
                                    file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
                                    file:bg-primary file:text-white file:font-medium
                                    file:hover:bg-azul-oscuro file:transition-colors file:cursor-pointer
                                "
                            />
                        </fieldset>
                    </div>
                </div>
                
                <fieldset className="border-2 border-warning/30 rounded-xl p-4 bg-gradient-to-br from-white to-warning/5">
                    <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
                        <span className="mr-2">⚙️</span>
                        Datos Administrativos
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ServiceFormAdminFields
                            newService={newService}
                            user={user}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                </fieldset>
                
                {formError && (
                    <div className="bg-danger/10 border border-danger/30 text-danger rounded-xl p-4 text-center font-medium flex items-center justify-center">
                        <span className="mr-2">❌</span>
                        {formError}
                    </div>
                )}
                {formSuccess && (
                    <div className="bg-success/10 border border-success/30 text-success rounded-xl p-4 text-center font-medium flex items-center justify-center">
                        <span className="mr-2">✅</span>
                        {formSuccess}
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-azul-cielo/20">
                    <button
                        type="button"
                        onClick={closeDialog}
                        className="
                            px-6 py-3 bg-neutral hover:bg-beige-claro text-azul-oscuro 
                            rounded-xl font-medium transition-all duration-300
                            hover:shadow-md border border-azul-cielo/30
                            order-2 sm:order-1
                        "
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="
                            px-6 py-3 bg-success hover:bg-verde-bosque text-white 
                            rounded-xl font-medium transition-all duration-300
                            hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                            border border-success/30 order-1 sm:order-2
                        "
                    >
                        <span>{mode === "create" ? "✨" : "💾"}</span>
                        <span>{mode === "create" ? "Crear Servicio" : "Actualizar Servicio"}</span>
                    </button>
                </div>
            </form>
        </dialog>
    );
}