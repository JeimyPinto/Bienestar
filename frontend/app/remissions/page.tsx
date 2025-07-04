"use client"

import React, { useState } from "react";
import { Remission } from "../../interface/remission";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import RemissionTable from "../../components/remissions/remissionTable";
import RemissionForm from "../../components/remissions/remissionForm";
import SectionHeader from "../../ui/sectionHeader";
import PageLayout from "../../components/layout/pageLayout";
import { useAuthContext } from "../../contexts/authContext";
import { useRemissions } from "../../hooks/useRemissions";
import { useMessages } from "../../hooks/useMessages";
import { useModal } from "../../hooks/useModal";

export default function RemissiontPage() {
    // Hook para manejo del modal de remisiones
    const { 
        dialogRef, 
        isFormOpen, 
        mode, 
        itemToEdit: remissionToEdit, 
        openCreateDialog, 
        closeDialog 
    } = useModal<Remission>();
    
    const { token } = useAuthContext();
    const { errorMessage, setErrorMessage } = useMessages();
    const { remissions, loading, refreshRemissions } = useRemissions({
        token,
        onError: (message) => setErrorMessage(message || "Error al cargar remisiones")
    });

    // Para manejar múltiples mensajes de éxito (como estaba antes)
    const [successMessages, setSuccessMessages] = useState<string[]>([]);

    // Función para limpiar mensajes
    const clearMessages = () => {
        setErrorMessage("");
        setSuccessMessages([]);
    };

    // Handler para éxito en RemissionForm
    const handleRemissionFormSuccess = (msg?: string) => {
        if (msg) setSuccessMessages((prev) => [...prev, msg]);
        refreshRemissions();
        closeDialog();
    };

    // Handler para cerrar notificación de éxito
    const handleCloseSuccess = (idx: number) => {
        setSuccessMessages((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <PageLayout>
            <SectionHeader
                title="Listado de Remisiones"
                buttonText="Añadir Nueva Remisión"
                onButtonClick={() => openCreateDialog(clearMessages)}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessages.map((msg, idx) => (
                <SuccessMessage 
                    key={idx} 
                    message={msg} 
                    onClose={() => handleCloseSuccess(idx)} 
                />
            ))}
            <RemissionTable
                remissions={remissions}
                setSuccessMessages={setSuccessMessages}
                loading={loading}
                onRemissionUpdate={refreshRemissions}
            />
            {isFormOpen && (
                <RemissionForm
                    dialogRef={dialogRef}
                    onClose={handleRemissionFormSuccess}
                    mode={mode}
                    remissionToEdit={remissionToEdit}
                    setSuccessMessages={setSuccessMessages}
                />
            )}
        </PageLayout>
    );
}
