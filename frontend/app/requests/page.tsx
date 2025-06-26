"use client"

import React, { useState, useRef } from "react";
import { Request } from "../types/request";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import RequestTable from "./requestTable";
import RequestForm from "./requestForm";
import SectionHeader from "../ui/sectionHeader";
import { getAll } from "../services/services/request"
import { useAuth } from "../hooks/useAuth";

export default function RequestPage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [requestToEdit, setRequestToEdit] = useState<Request | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {token} = useAuth();

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
    // Cargar solicitudes
    const fetchRequests = async () => {
        setLoading(true);
        if (!token) {
            setErrorMessage("No se pudo obtener el token de autenticación.");
            setLoading(false);
            return;
        }
        const res = await getAll(token);
        if (res.error) {
            setErrorMessage(res.message);
            setRequests(res.requests || []);
        } else {
            setSuccessMessage(res.message);
            setRequests(res.requests || []);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        fetchRequests();
    }, []);

    //Handler para éxito en RequestForm
    const handleRequestFormSuccess = () => {
        fetchRequests();
        closeDialog();
    };


    return (
        <>
            <SectionHeader
                title="Listado de Solicitudes"
                buttonText="Añadir Nueva Solicitud"
                onButtonClick={openCreateDialog}
            />
            {errorMessage && (
                <ErrorMessage message={errorMessage} />
            )}
            {successMessage && (
                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
            )}
            <RequestTable 
                requests={requests}
                setRequests={setRequests}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                loading={loading}
                onRequestUpdate={handleRequestFormSuccess} // Ahora solo notifica y hace fetch
            />
            {isFormOpen && (
                <RequestForm
                    dialogRef={dialogRef}
                    onClose={handleRequestFormSuccess} // Ahora pasa la solicitud creada/editada
                    mode={mode}
                    requestToEdit={requestToEdit}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                />
            )}
        </>
    );
}
