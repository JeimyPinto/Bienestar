"use client"

import React, { useState, useRef } from "react";
import { Remission } from "../types/remission";
import ErrorMessage from "../ui/errorMessage";
import { SuccessMessageStack } from "../ui/successMessage";
import RemissionTable from "./remissionTable";
import RemissionForm from "./remissionForm";
import SectionHeader from "../ui/sectionHeader";
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
        console.log("Fetching remissions with token:", token);
        const res = await getAll(token ?? undefined);
        console.log("Remissions fetched:", res);
        if (res.error) {
            setErrorMessage(res.message);
            setRemissions(res.requests || []);
        } else {
            setSuccessMessages((prev) => [...prev, res.message]);
            setRemissions(res.requests || []);
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
            <SuccessMessageStack messages={successMessages} onClose={handleCloseSuccess} />
            <RemissionTable
                remissions={remissions}
                setRemissions={setRemissions}
                setErrorMessage={setErrorMessage}
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
                    setErrorMessage={setErrorMessage}
                    setSuccessMessages={setSuccessMessages}
                />
            )}
        </>
    );
}
