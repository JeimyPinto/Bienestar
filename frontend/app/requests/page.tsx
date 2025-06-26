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
    const fetchRequests = React.useCallback(async () => {
        setLoading(true)
        const res = await getAll(token ?? undefined);
        if (res.error) {
            setErrorMessage(res.message);
            setRequests(res.requests || []);
        } else {
            setSuccessMessage(res.message);
            setRequests(res.requests || []);
        }
        setLoading(false);
    }, [token]);

    React.useEffect(() => {
        if(token) {
            fetchRequests();
        }
    }, [token, fetchRequests]);

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
