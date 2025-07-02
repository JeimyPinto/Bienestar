"use client"

import React, { useState, useRef } from "react";
import { Remission } from "../../types/remission";
import { ErrorMessage, SuccessMessage } from "../../ui";
import RemissionTable from "./remissionTable";
import RemissionForm from "./remissionForm";
import SectionHeader from "../components/sectionHeader";
import { getAll } from "../services/services/remission"
import { useAuth } from "../hooks/useAuth";

export default function RemissiontPage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [remissionToEdit, setRemissionToEdit] = useState<Remission | undefined>(undefined);
    const [successMessages, setSuccessMessages] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [remissions, setRemissions] = useState<Remission[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { token } = useAuth();

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

    // Cargar remisiones
    const fetchRemissions = React.useCallback(async () => {
        setLoading(true);
        const res = await getAll(token ?? undefined);
        if (res.error) {
            setErrorMessage(res.message);
            setRemissions(res.remissions || []);
        } else {
            setErrorMessage(""); // Limpiar errores si todo va bien
            setRemissions(res.remissions || []);
        }
        setLoading(false);
    }, [token]);

    React.useEffect(() => {
        if (token) {
            fetchRemissions();
        }
    }, [token, fetchRemissions]);

    // Handler para éxito en RemissionForm
    const handleRemissionFormSuccess = (msg?: string) => {
        if (msg) setSuccessMessages((prev) => [...prev, msg]);
        fetchRemissions();
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
                onRemissionUpdate={fetchRemissions}
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
