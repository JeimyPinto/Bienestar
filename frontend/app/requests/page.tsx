"use client"

import React, { useState, useRef } from "react";
import { Request } from "../../interface/request";
import { useAuthContext } from "../../contexts/authContext";
import { useRequests } from "../../hooks/useRequests";
import { useMessages } from "../../hooks/useMessages";
import RequestForm from "../../components/requests/requestForm"
import RequestHistory from "../../components/requests/requestHistory";
import RequestTable from "../../components/requests/requestTable";
import SuccessMessage from "../../ui/successMessage";
import SectionHeader from "../../ui/sectionHeader";
import PageLayout from "../../components/layout/pageLayout";
import { ROLES } from "../../constants/roles";

export default function RequestPage() {
    const { user, token } = useAuthContext();
    const { successMessage, errorMessage, clearSuccess, setErrorMessage, showSuccess } = useMessages();
    
    // Determinar modo y userId según el rol del usuario
    const requestMode = user?.role === ROLES.USER ? 'byUserId' : 'all';
    const requestUserId = user?.role === ROLES.USER ? user?.id : undefined;
    
    const { requests, loading, refreshRequests } = useRequests({
        token,
        userId: requestUserId,
        mode: requestMode,
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

    // Determinar el título según el rol del usuario
    const pageTitle = user?.role === ROLES.USER 
        ? "Mis Solicitudes" 
        : "Historial de Solicitudes";

    return (
        <PageLayout className="py-4 md:py-6">
            {/* Header de la página */}
            <SectionHeader 
                title={pageTitle}
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

            {/* Componente de solicitudes - según rol del usuario */}
            {user?.role === ROLES.USER ? (
                <RequestHistory
                    requests={requests}
                    loading={loading}
                    errorMessage={errorMessage}
                    onCreateRequest={openCreateDialog}
                />
            ) : (
                <RequestTable
                    requests={requests}
                    loading={loading}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={showSuccess}
                    onRequestUpdate={refreshRequests}
                />
            )}

            {/* Modal de formulario */}
            {isFormOpen && (
                <RequestForm
                    dialogRef={dialogRef}
                    onClose={closeDialog}
                    mode={mode}
                    requestToEdit={requestToEdit}
                />
            )}
        </PageLayout>
    );
}
