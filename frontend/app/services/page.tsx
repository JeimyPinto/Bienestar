"use client"

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Service } from "../types/index";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import ServicesGallery from "./servicesGallery";
import ServiceTable from "./serviceTable";
import SectionHeader from "../ui/sectionHeader";
import { getAllActive, getAll } from "../services/services/service";
import ServiceForm from "./serviceForm";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../lib/roles";

export default function ServicePage() {
    const { user, token } = useAuth();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        let response;
        if (!user && (user?.role === ROLES.USER || user?.role === ROLES.INSTRUCTOR)) {
            response = await getAllActive();
        } else {
            // Solo ADMIN/SUPERADMIN
            response = await getAll(token ?? undefined);
        }
        if (!response.error && response.services) {
            setServices(response.services);
            setErrorMessage("");
        } else {
            setServices([]);
            setErrorMessage(response.message);
        }
        setLoading(false);
    }, [user, token]);

    useEffect(() => {
        if (user !== undefined) fetchServices();
    }, [user, fetchServices]);

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
            {(!user || user?.role === ROLES.USER) ? (
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
