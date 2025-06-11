"use client"

import React, { useEffect, useState, useRef } from "react";
import { Service } from "../types/service";
import { User } from "../types/user";
import Header from "../ui/header";
import ErrorMessage from "../ui/errorMessage";
import RequestTable from "./requestTable";
import SectionHeader from "../ui/sectionHeader";
import RequestForm from "./requestForm";
import { getAllActive } from "../services/services/request"

export default function ServicePage() {
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

    useEffect(() => {
        let tokenValue: string | null = null;
        if (
            process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
            process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
        ) {
            tokenValue = localStorage.getItem("token");
        } else {
            const cookie = document.cookie;
            tokenValue =
                cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null;
        }
        if (tokenValue) {
            try {
                setUser(JSON.parse(atob(tokenValue.split(".")[1])));
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        async function fetchServices() {
            setLoading(true);
            const { requests, message, error } = await getAllActive();

            if (requests) {
                setRequests(requests);
                setMessage(typeof message === "string" ? message : "");
                setErrorMessage(""); // Limpia error si hay servicios
            } else {
                setRequests([]);
                setMessage(""); // Limpia mensaje si hay error
                setErrorMessage(
                    typeof error === "string"
                        ? error
                        : error?.message || error?.toString?.() || "Ocurrió un error"
                );
            }
            setLoading(false);
        }
        fetchServices();
    }, []);

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
