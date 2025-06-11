"use client"

import React, { useEffect, useState, useRef } from "react";
import { Service } from "../types/service";
import { User } from "../types/user";
import { Request } from "../types/request";
import Header from "../ui/header";
import ErrorMessage from "../ui/errorMessage";
import RequestTable from "./requestTable";
import SectionHeader from "../ui/sectionHeader";
import RequestForm from "./requestForm";
import { getAllActive } from "../services/services/request"

export default function ServicePage() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [requests, setRequests] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [requestToEdit, setRequestToEdit] = useState<Request | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Obtener token y usuario autenticado
    useEffect(() => {
        let tokenValue: string | null = null;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        // Extraer el token del localStorage o de las cookies
        const extractUserFromToken = (token: string) => {
            try {
                return JSON.parse(atob(token.split(".")[1]));
            } catch {
                return null;
            }
        };

        if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
            tokenValue = localStorage.getItem("token");
        } else {
            // Buscar token en cookies
            const cookie = document.cookie;
            tokenValue = cookie.split("; ").find((row) =>
                row.startsWith("token="))?.split("=")[1] || null;
        }

        setToken(tokenValue);

        if (tokenValue) {
            setUser(extractUserFromToken(tokenValue));
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        async function fetchServices() {
            setLoading(true);
            const { requests, message, error } = await getAllActive(token || undefined);
            if (error) {
                setErrorMessage(error);
                setRequests([]);
            } else if (message) {
                setSuccessMessage(message);
                if (requests) {
                    setRequests(requests);
                }
            }
            setLoading(false);
        }
        fetchServices();
    }, [token]);

    const openCreateDialog = () => {
        setMode("create");
        setRequestToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const openEditDialog = (request: Request) => {
        setMode("edit");
        setRequestToEdit(request);
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
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </>
    );
}
