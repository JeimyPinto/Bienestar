import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { useRequests } from "../../hooks/useRequests";
import { Request } from "../../interface/request";
import { ROLES } from "../../constants/roles";
import RequestApplicantFields from "./requestApplicantFields";
import RequestDescriptionFields from "./requestDescriptionFields";
import RequestStatusFields from "./requestStatusFields";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";
import  Spinner  from "../../ui/spinner";

const emptyRequest: Request = {
    userId: 0,
    serviceId: 0,
    description: "",
    status: true,
    responseStatus: "pendiente",
    responseMessage: null,
    createdBy: 0,
    createdAt: "",
    updatedAt: "",
    applicant: null,
    service: null,
    creator: null,
};
interface RequestsFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose?: (updatedRequest?: Request) => void;
  mode: "create" | "edit";
  requestToEdit?: Request;
  successMessage?: string;
  setSuccessMessage?: (msg: string) => void;
  setErrorMessage?: (msg: string) => void;
  errorMessage?: string;
}
export default function RequestsForm(props: RequestsFormProps) {
    const {
        dialogRef,
        onClose,
        mode,
        requestToEdit,
    } = props;
    const { token, user } = useAuthContext();
    const [newRequest, setNewRequest] = useState<Request>(emptyRequest);
    const [formError, setFormError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Hook para métodos CRUD de requests
    const { createRequest, updateRequest } = useRequests({
        token,
        onError: (error) => setFormError(error || "Error desconocido")
    });

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && requestToEdit) {
            setNewRequest(requestToEdit);
        } else if (mode === "create") {
            const initialRequest = { ...emptyRequest };
            // Si es un usuario normal, establecer automáticamente su userId
            if (user && user.role === ROLES.USER) {
                initialRequest.userId = user.id;
                initialRequest.createdBy = user.id;
            }
            setNewRequest(initialRequest);
        }
    }, [mode, requestToEdit, user]);

    // Mostrar loader si no hay token o user
    if (!token || !user) {
        return (
            <dialog
                ref={dialogRef}
                aria-modal="true"
                aria-label="Cargando..."
                className="rounded-xl shadow-2xl bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 border border-azul-claro/20 w-full max-w-md mx-auto backdrop-blur-sm"
            >
                <div className="flex flex-col items-center justify-center py-12 px-6">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-azul-claro to-azul-oscuro rounded-full flex items-center justify-center">
                            <Spinner className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <span className="text-azul-oscuro text-lg font-semibold mb-2">Cargando datos...</span>
                    <p className="text-azul-marino/70 text-sm text-center">
                        Preparando el formulario de solicitud
                    </p>
                </div>
            </dialog>
        );
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        
        if (isSubmitting) return;
        if (!token) return;
        
        setIsSubmitting(true);
        setFormError("");
        
        const requestData = { ...newRequest };
        if (typeof requestData.status === "string") {
            requestData.status = requestData.status === "activo";
        }
        if (user && user.role === ROLES.USER) {
            requestData.userId = Number(user.id);
        }
        // Siempre asignar el creador de la solicitud
        if (user && user.id) {
            requestData.createdBy = user.id;
        }
        // Si responseMessage es null o vacío y no es rechazada, eliminar el campo para evitar error de validación
        if (requestData.responseMessage == null || requestData.responseMessage === "") {
            delete requestData.responseMessage;
        }
        
        try {
            let response;
            if (mode === "create") {
                response = await createRequest(requestData);
            } else if (mode === "edit" && requestToEdit) {
                response = await updateRequest(requestToEdit.id as number, requestData);
            }
            
            if (response?.error) {
                setFormError(response.message || "Error desconocido");
                return;
            }
            
            setNewRequest(emptyRequest);
            setTimeout(() => {
                onClose?.(undefined); // El hook ya refrescará la lista automáticamente
            }, 100);
        } catch (error) {
            setFormError(String(error));
            return;
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-xl shadow-2xl bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 border border-azul-claro/20 w-full max-w-5xl mx-auto backdrop-blur-sm max-h-[95vh] overflow-y-auto"
        >
            {/* Header con gradiente */}
            <FormModalHeader
                mode={mode}
                entityName="Solicitud de Remisión"
                onClose={() => onClose?.()}
            />

            {/* Contenido del formulario */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={isSubmitting} className="space-y-6">
                        {/* Sección: Solicitante y Servicio */}
                        <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                            <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                <span className="text-xl">👤</span>
                                {user.role === ROLES.USER ? "Seleccionar Servicio" : "Datos del Solicitante y Servicio"}
                            </h3>
                            <RequestApplicantFields
                                user={user}
                                token={token}
                                newRequest={newRequest}
                                setNewRequest={setNewRequest}
                                mode={mode}
                                editApplicant={mode === "edit" && requestToEdit?.applicant ? requestToEdit.applicant : undefined}
                            />
                        </div>

                        {/* Sección: Descripción */}
                        <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                            <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                <span className="text-xl">📝</span>
                                Descripción de la Solicitud
                            </h3>
                            <RequestDescriptionFields
                                newRequest={newRequest}
                                setNewRequest={setNewRequest}
                            />
                        </div>

                        {/* Sección: Estado - Solo visible para administradores */}
                        {user.role !== ROLES.USER && (
                            <div className="bg-white/70 border border-azul-cielo/30 rounded-xl p-6 backdrop-blur-sm shadow-sm">
                                <h3 className="text-lg font-semibold text-azul-oscuro mb-4 flex items-center gap-2">
                                    <span className="text-xl">⚙️</span>
                                    Estado y Respuesta
                                </h3>
                                <RequestStatusFields
                                    mode={mode}
                                    newRequest={newRequest}
                                    setNewRequest={setNewRequest}
                                />
                            </div>
                        )}
                    </fieldset>

                    {/* Mensaje de error */}
                    <FormErrorDisplay error={formError} />

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => onClose?.()}
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
                                : (mode === "create" ? "Guardar Solicitud" : "Actualizar Solicitud")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}