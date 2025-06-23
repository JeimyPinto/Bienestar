"use client"

import React, { useEffect, useState, useRef } from "react";
import { Service, User } from "../types/index";
import Header from "../ui/header";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import ServicesGallery from "./servicesGallery";
import ServiceTable from "./serviceTable";
import SectionHeader from "../ui/sectionHeader";
import { getAllActive, getAll } from "../services/services/service";
import ServiceForm from "./serviceForm";
import isTokenExpired from "../lib/isTokenExpired"
import getUserToken from "../lib/getUserToken"
import getToken from "../lib/getToken"

export default function ServicePage() {
    const [user, setUser] = useState<User | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // Solo hace fetch de usuario al montar
        const fetchData = async () => {
            const tokenValue = getToken();
            let userValue = null;
            if (tokenValue) {
                try {
                    userValue = getUserToken(tokenValue);
                } catch (e) {
                    userValue = null;
                }
                if (isTokenExpired(tokenValue)) {
                    localStorage.removeItem("token");
                    setUser(null);
                } else {
                    setUser(userValue as User);
                }
            } else {
                setUser(null);
            }
        };
        fetchData();
    }, []);

    // Extraer fetchServices fuera del useEffect para poder llamarlo manualmente
    const fetchServices = async () => {
        setLoading(true);
        let response;
        if (!user || user?.role === "user") {
            response = await getAllActive();
        } else {
            // Solo ADMIN/SUPERADMIN
            const tokenValue = getToken();
            response = await getAll(tokenValue ?? undefined);
        }
        if (!response.error && response.services) {
            setServices(response.services);
            setMessage(response.message);
            setErrorMessage("");
        } else {
            setServices([]);
            setMessage(response.message);
            setErrorMessage(response.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Solo ejecuta si user ya está definido (no undefined)
        if (user !== undefined) fetchServices();
    }, [user]);

    // Handler para éxito en ServiceForm
    const handleServiceFormSuccess = () => {
        fetchServices();
        closeDialog();
    };

    const openCreateDialog = () => {
        setMode("create");
        setServiceToEdit(undefined);
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
            {(!user || user?.role === "user") ? (
                <main className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16 shadow-xl mx-auto w-full max-w-full transition-all">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-azul">Servicios Disponibles</h1>
                    <p className="mb-6 text-center text-gray-700 max-w-5xl">
                        Si no encuentras el servicio que buscas en este listado, puede ser porque actualmente no se está prestando. Algunos servicios, solo están disponibles por convocatoria (Ejemplo: Monitorias, subsidio de alimentación, apoyo socieconómico), mientras que otros están disponibles todo el tiempo.
                    </p>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cian border-opacity-50 mb-4"></div>
                            <span className="text-cian text-lg">Cargando servicios...</span>
                        </div>
                    ) : <ServicesGallery services={services} />}
                </main>
            ) : (
                <>
                    <SectionHeader
                        title="Listado de Servicios"
                        buttonText="Añadir Nuevo Servicio"
                        onButtonClick={openCreateDialog}
                    />
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    {successMessage && (
                        <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
                    )}
                    <ServiceTable
                        services={services}
                        loading={loading}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                        setServices={setServices}
                        onEditService={(service) => {
                            setMode("edit");
                            setServiceToEdit(service);
                            setIsFormOpen(true);
                            setTimeout(() => dialogRef.current?.showModal(), 0);
                        }}
                    />
                    {isFormOpen && (
                        <ServiceForm
                            dialogRef={dialogRef}
                            closeDialog={closeDialog}
                            onClose={handleServiceFormSuccess}
                            mode={mode}
                            serviceToEdit={serviceToEdit}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                        />
                    )}
                </>
            )}
        </>
    );
}
