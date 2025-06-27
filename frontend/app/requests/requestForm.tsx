import { useEffect, useState } from "react";
import {RequestsFormProps, Request } from "../types/index";
import { create, update } from "../services/services/request";
import { useAuth } from "../hooks/useAuth";
import RequestApplicantFields from "./requestApplicantFields";
import RequestDescriptionFields from "./requestDescriptionFields";
import RequestStatusFields from "./requestStatusFields";
import RequestFormActions from "./requestFormActions";

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
                className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
            >
                <div className="flex flex-col items-center justify-center py-12">
                    <span className="text-azul text-lg font-semibold mb-4">Cargando datos de la solicitud...</span>
                    <div className="w-10 h-10 border-4 border-cian border-t-transparent rounded-full animate-spin"></div>
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
            className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-azul">
                    {mode === "create" ? "Crear Solicitud de Remisión" : "Editar Solicitud de Remisión"}
                </h2>
                <button
                    onClick={() => onClose?.()}
                    aria-label="Cerrar formulario"
                    className="text-cian hover:text-azul transition-colors"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sección: Solicitante y Servicio */}
                <div className="bg-cian/5 border border-cian/20 rounded-lg p-4 mb-2">
                    <h3 className="text-lg font-semibold text-cian mb-3">
                        {user.role === "user" ? "Seleccionar Servicio" : "Datos del Solicitante y Servicio"}
                    </h3>
                    <div className={`grid gap-4 ${user.role === "user" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
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
                <div className="bg-azul/5 border border-azul/20 rounded-lg p-4 mb-2">
                    <h3 className="text-lg font-semibold text-azul mb-3">Descripción de la Solicitud</h3>
                    <RequestDescriptionFields
                        newRequest={newRequest}
                        setNewRequest={setNewRequest}
                    />
                </div>
                {/* Sección: Estado - Solo visible para administradores */}
                {user.role !== "user" && (
                    <div className="bg-verde/5 border border-verde/20 rounded-lg p-4 mb-2">
                        <h3 className="text-lg font-semibold text-verde mb-3">Estado y Respuesta</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </dialog>
    );
}