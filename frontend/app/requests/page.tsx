"use client"

import React, { useState, useRef } from "react";
import { Request } from "../types/request";
import Header from "../ui/header";
import ErrorMessage from "../ui/errorMessage";
import RequestTable from "./requestTable";
import SectionHeader from "../ui/sectionHeader";
import RequestForm from "./requestForm";

export default function RequestPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [requestToEdit, setRequestToEdit] = useState<Request | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openCreateDialog = () => {
        setMode("create");
        setRequestToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = () => {
        setIsFormOpen(false);
        dialogRef.current?.close();
    };
    return (
        <>
            <Header />
            <SectionHeader
                title="Listado de Solicitudes"
                buttonText="Añadir Nueva Solicitud"
                onButtonClick={openCreateDialog}
            />
            {errorMessage && (
                <ErrorMessage message={errorMessage} />
            )}
            <RequestTable />
            {isFormOpen && (
                <RequestForm
                    dialogRef={dialogRef}
                    closeDialog={closeDialog}
                    onClose={closeDialog}
                    mode={mode}
                    requestToEdit={requestToEdit}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </>
    );
}
