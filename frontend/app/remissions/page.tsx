"use client"

import React, { useState, useRef } from "react";
import { Remission } from "../../interface/remission";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import RemissionTable from "../../components/remissions/remissionTable";
import RemissionForm from "../../components/remissions/remissionForm";
import SectionHeader from "../../ui/sectionHeader";
import { useAuth } from "../../hooks/useAuth";
import { useRemissions } from "../../hooks/useRemissions";
import { useMessages } from "../../hooks/useMessages";

export default function RemissiontPage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [remissionToEdit, setRemissionToEdit] = useState<Remission | undefined>(undefined);
    
    const { token } = useAuth();
    const { errorMessage, setErrorMessage } = useMessages();
    const { remissions, loading, refreshRemissions } = useRemissions({
        token,
        onError: (message) => setErrorMessage(message || "Error al cargar remisiones")
    });

    // Para manejar múltiples mensajes de éxito (como estaba antes)
    const [successMessages, setSuccessMessages] = useState<string[]>([]);

    const openCreateDialog = () => {
        setMode("create");
        setRemissionToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = () => {
        setIsFormOpen(false);
        dialogRef.current?.close();
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
        <>
            <SectionHeader
                title="Listado de Remisiones"
                buttonText="Añadir Nueva Remisión"
                onButtonClick={openCreateDialog}
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
        </>
    );
}
