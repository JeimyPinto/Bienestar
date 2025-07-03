import { useEffect, useState } from "react"
import Image from "next/image"
import { Service, Area } from "../../interface/service"
import ServiceFormMainFields from "./serviceFormMainFields";
import ServiceFormAdminFields from "./serviceFormAdminFields";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";
import { useAuthContext } from "../../contexts/AuthContext";
import { useServices } from "../../hooks/useServices";

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

interface ServiceFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  serviceToEdit?: Service;
  successMessage?: string;
  setSuccessMessage?: (msg: string) => void;
  setErrorMessage?: (msg: string) => void;
  errorMessage?: string;
}

export default function ServiceForm(props: ServiceFormProps) {
    const { dialogRef, closeDialog, onClose, mode, serviceToEdit } = props;
    const { token, user, isAuthenticated } = useAuthContext();
    const [newService, setNewService] = useState<Service>(emptyService);
    const [previewImage, setPreviewImage] = useState<string>("");
    const [formError, setFormError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Usar hook useServices para operaciones CRUD
    const { createService, updateService } = useServices({
        token,
        onError: (message) => {
            setFormError(message || "Error en operaciones de servicio.");
        }
    });

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
        
        if (isSubmitting) return;
        
        setFormError("");
        if (!newService.name.trim() || !newService.description.trim()) {
            setFormError("Todos los campos obligatorios deben estar completos.");
            return;
        }
        if (!token || !isAuthenticated) {
            setFormError("No hay sesión activa. Por favor, inicia sesión.");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            let result;
            if (mode === "create") {
                const { file, ...serviceData } = newService;
                serviceData.creatorId = user?.id ? Number(user.id) : 0;
                // No enviar image si está vacío o null
                if (!newService.image) delete (serviceData as Partial<typeof newService>).image;
                result = await createService(
                    serviceData,
                    file ? file : undefined
                );
            } else if (mode === "edit") {
                // Solo enviar image si existe y no es null
                const { ...serviceData } = newService;
                if (!newService.image) delete (serviceData as Partial<typeof newService>).image;
                result = await updateService(
                    newService.id,
                    serviceData,
                    newService.file ? newService.file : undefined
                );
            }
            
            if (!result) {
                setFormError("No se pudo procesar la solicitud. Intenta de nuevo.");
                return;
            }
            
            if (result.error) {
                setFormError(result.message || "Error al guardar el servicio");
                props.setErrorMessage?.(result.message || "Error al guardar el servicio");
                return;
            }
            
            props.setSuccessMessage?.(result.message || "Servicio guardado correctamente");
            setTimeout(() => {
                onClose?.();
                closeDialog();
            }, 100);
        } catch (error) {
            setFormError("Error inesperado al guardar el servicio. " + error);
            props.setErrorMessage?.("Error inesperado al guardar el servicio. " + error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-xl shadow-2xl bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 border border-azul-claro/20 w-full max-w-5xl mx-auto backdrop-blur-sm"
        >
            {/* Header con gradiente */}
            <FormModalHeader
                mode={mode}
                entityName="Servicio"
                onClose={() => {
                    onClose?.();
                    closeDialog();
                }}
            />
            
            {/* Contenido del formulario */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={isSubmitting} className="space-y-6">
                        {/* Layout responsivo para campos principales e imagen */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1 lg:w-2/3">
                                <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                                    <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                        <span className="text-xl">📝</span>
                                        Información Principal
                                    </h3>
                                    <ServiceFormMainFields
                                        newService={newService}
                                        handleInputChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="lg:w-1/3">
                                <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm h-fit">
                                    <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                        <span className="text-xl">🖼️</span>
                                        Imagen del Servicio
                                    </h3>
                                    
                                    {previewImage && (
                                        <div className="mb-4 flex justify-center">
                                            <div className="relative">
                                                <Image
                                                    src={previewImage}
                                                    alt={`${newService.name} imagen`}
                                                    width={120}
                                                    height={120}
                                                    className="w-32 h-32 rounded-xl object-cover border-2 border-azul-cielo/30 shadow-lg"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-azul-claro text-white rounded-full p-2 shadow-md">
                                                    <span className="text-sm">✓</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <input
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full border border-azul-cielo/30 rounded-lg p-3 focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-azul-claro file:text-white file:font-medium file:hover:bg-azul-oscuro file:transition-colors file:cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Campos administrativos */}
                        <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                            <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                <span className="text-xl">⚙️</span>
                                Datos Administrativos
                            </h3>
                            <ServiceFormAdminFields
                                newService={newService}
                                user={user}
                                handleInputChange={handleInputChange}
                            />
                        </div>
                    </fieldset>
                    
                    {/* Mensaje de error */}
                    <FormErrorDisplay error={formError} />
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => {
                                onClose?.();
                                closeDialog();
                            }}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg border border-gray-300 hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-azul-claro to-azul-oscuro text-white font-medium rounded-lg hover:from-azul-oscuro hover:to-azul-marino focus:outline-none focus:ring-2 focus:ring-azul-claro focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            {isSubmitting 
                                ? (mode === "create" ? "Guardando..." : "Actualizando...")
                                : (mode === "create" ? "Guardar Servicio" : "Actualizar Servicio")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}