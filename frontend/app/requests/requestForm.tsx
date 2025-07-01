import { useEffect, useState } from "react";
import {RequestsFormProps, Request } from "../types/index";
import { create, update } from "../services/services/request";
import { useAuth } from "../hooks/useAuth";
import RequestApplicantFields from "./requestApplicantFields";
import RequestDescriptionFields from "./requestDescriptionFields";
import RequestStatusFields from "./requestStatusFields";
import RequestFormActions from "./requestFormActions";
import Spinner from "../ui/spinner";

const emptyRequest: Request = {
    id: 0,
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

export default function RequestsForm(props: RequestsFormProps) {
    const {
        dialogRef,
        onClose,
        mode,
        requestToEdit,
    } = props;
    const{ token, user } = useAuth()
    const [newRequest, setNewRequest] = useState<Request>(emptyRequest);
    const [formError, setFormError] = useState<string>("");

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && requestToEdit) {
            setNewRequest(requestToEdit);
        } else if (mode === "create") {
            setNewRequest(emptyRequest);
        }
    }, [mode, requestToEdit]);

    // Mostrar loader si no hay token o user
    if (!token || !user) {
        return (
            <dialog
                ref={dialogRef}
                aria-modal="true"
                aria-label="Cargando..."
                className="
                    rounded-2xl shadow-2xl p-8 bg-white border border-azul-cielo/20
                    w-full max-w-md mx-auto backdrop-blur-sm
                "
            >
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-azul-cielo rounded-full flex items-center justify-center">
                            <Spinner className="w-8 h-8" />
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
        if (!token) return;
        setFormError("");
        const  requestData = { ...newRequest };
        if (typeof requestData.status === "string") {
            requestData.status = requestData.status === "activo";
        }
        if (user && user.role === "user") {
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
                response = await create(requestData, token);
            } else if (mode === "edit" && requestToEdit) {
                response = await update(requestToEdit.id as number, requestData, token);
            }
            if (response?.error) {
                setFormError(response.message || "Error desconocido");
                return;
            }
            setNewRequest(emptyRequest);
            onClose?.(response?.request || undefined); // Pasar la solicitud creada/editada al callback
        } catch (error) {
            setFormError(String(error));
            return;
        }
    }
    return (
        <dialog
            ref={dialogRef}
            aria-modal="true"
            aria-label={mode === "create" ? "Crear Solicitud de Remisión" : "Editar Solicitud de Remisión"}
            className="
                rounded-xl sm:rounded-2xl shadow-2xl bg-white border border-azul-cielo/20
                w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 
                mx-auto backdrop-blur-sm
                max-h-[95vh] sm:max-h-[90vh] overflow-y-auto
                m-2 sm:m-4
            "
        >
            <div className="sticky top-0 bg-gradient-corporate text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl border-b border-azul-cielo/20">
                <div className="flex justify-between items-start sm:items-center gap-3">
                    <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-lg sm:text-2xl">📝</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg sm:text-xl font-bold leading-tight">
                                {mode === "create" ? "Nueva Solicitud de Remisión" : "Editar Solicitud de Remisión"}
                            </h2>
                            <p className="text-azul-cielo/80 text-xs sm:text-sm mt-1 hidden sm:block">
                                {mode === "create" ? "Completa la información para crear una nueva solicitud" : "Modifica los datos de la solicitud"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => onClose?.()}
                        aria-label="Cerrar formulario"
                        className="
                            w-8 sm:w-10 h-8 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full
                            flex items-center justify-center transition-all duration-300
                            hover:scale-105 focus-visible-custom flex-shrink-0
                        "
                    >
                        <span className="text-lg sm:text-xl">✕</span>
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Sección: Solicitante y Servicio */}
                <div className="bg-gradient-card backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-primary/20 shadow-lg">
                    <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-primary font-bold text-sm sm:text-base">👤</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-azul-oscuro">
                            {user.role === "user" ? "Seleccionar Servicio" : "Datos del Solicitante y Servicio"}
                        </h3>
                    </div>
                    <div className={`grid gap-3 sm:gap-4 ${user.role === "user" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                        <RequestApplicantFields
                            user={user}
                            token={token}
                            newRequest={newRequest}
                            setNewRequest={setNewRequest}
                            mode={mode}
                            editApplicant={mode === "edit" && requestToEdit?.applicant ? requestToEdit.applicant : undefined}
                        />
                    </div>
                </div>
                
                {/* Sección: Descripción */}
                <div className="bg-gradient-card backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-info/20 shadow-lg">
                    <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-info/20 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                            <span className="text-info font-bold text-sm sm:text-base">📝</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-azul-oscuro">Descripción de la Solicitud</h3>
                    </div>
                    <RequestDescriptionFields
                        newRequest={newRequest}
                        setNewRequest={setNewRequest}
                    />
                </div>
                
                {/* Sección: Estado - Solo visible para administradores */}
                {user.role !== "user" && (
                    <div className="bg-gradient-card backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-success/20 shadow-lg">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <div className="w-6 sm:w-8 h-6 sm:h-8 bg-success/20 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                <span className="text-success font-bold text-sm sm:text-base">⚙️</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-azul-oscuro">Estado y Respuesta</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                            <RequestStatusFields
                                mode={mode}
                                newRequest={newRequest}
                                setNewRequest={setNewRequest}
                            />
                        </div>
                    </div>
                )}
                
                <RequestFormActions
                    formError={formError}
                    onClose={onClose}
                />
            </form>
            </div>
        </dialog>
    );
}