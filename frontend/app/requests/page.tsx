"use client"

import React, { useState, useRef } from "react";
import { Request } from "../../interface/request";
import { useAuth } from "../../hooks/useAuth";
import { useRequests } from "../../hooks/useRequests";
import { useMessages } from "../../hooks/useMessages";
import RequestForm from "../../components/requests/requestForm"
import RequestHistory from "../../components/requests/requestHistory";
import SuccessMessage from "../../ui/successMessage";
import SectionHeader from "../../ui/sectionHeader";

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
        <div className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-4 md:py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header de la página */}
                <SectionHeader 
                    title="Historial de Solicitudes"
                    buttonText="Nueva Solicitud"
                    onButtonClick={openCreateDialog}
                />

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
                    />
                )}
            </div>
        </div>
    );
}
