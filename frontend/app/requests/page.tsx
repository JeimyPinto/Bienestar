"use client"

import React, { useState, useRef } from "react";
import { Request } from "../types/request";
import RequestForm from "./requestForm";
import RequestHistory from "./requestHistory";
import SuccessMessage from "../ui/successMessage";
import { useAuth } from "../hooks/useAuth";
import { useRequests } from "../hooks/useRequests";
import { useMessages } from "../hooks/useMessages";

export default function RequestPage() {
    const { user, token } = useAuth();
    const { successMessage, errorMessage, clearSuccess, setErrorMessage, showSuccess } = useMessages();
    const { requests, loading, refreshRequests } = useRequests({
        token,
        userId: user?.id,
        onError: (message) => setErrorMessage(message)
    });

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [requestToEdit, setRequestToEdit] = useState<Request | undefined>(undefined);

    const openCreateDialog = () => {
        setMode("create");
        setRequestToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = (createdRequest?: unknown) => {
        setIsFormOpen(false);
        dialogRef.current?.close();
        
        if (createdRequest) {
            refreshRequests();
            showSuccess("Solicitud procesada exitosamente");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-6">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header de la página */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-azul-oscuro mb-2 flex items-center">
                                    <span className="mr-3">📋</span>
                                    Historial de Solicitudes
                                </h1>
                                <p className="text-azul-marino/70">
                                    Gestiona y revisa todas tus solicitudes de remisión
                                </p>
                            </div>
                            <button
                                onClick={openCreateDialog}
                                className="
                                    bg-success hover:bg-verde-bosque text-white 
                                    px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center space-x-2
                                    border border-success/30
                                "
                            >
                                <span>➕</span>
                                <span>Nueva Solicitud</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mensajes */}
                {successMessage && (
                    <div className="mb-6">
                        <SuccessMessage
                            message={successMessage}
                            onClose={() => clearSuccess()}
                        />
                    </div>
                )}

                {/* Componente de historial */}
                <RequestHistory
                    requests={requests}
                    loading={loading}
                    errorMessage={errorMessage}
                    onCreateRequest={openCreateDialog}
                />

                {/* Modal de formulario */}
                {isFormOpen && (
                    <RequestForm
                        dialogRef={dialogRef}
                        onClose={closeDialog}
                        mode={mode}
                        requestToEdit={requestToEdit}
                        setErrorMessage={setErrorMessage}
                    />
                )}
            </div>
        </div>
    );
}
