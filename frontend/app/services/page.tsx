"use client"

import React, { useState, useRef } from "react";
import { Service } from "../types/index";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import ServicesGallery from "./servicesGallery";
import ServiceTable from "./serviceTable";
import SectionHeader from "../ui/sectionHeader";
import ServiceForm from "./serviceForm";
import { useAuth } from "../hooks/useAuth";
import { useServices } from "../hooks/useServices";
import { useMessages } from "../hooks/useMessages";
import { ROLES } from "../lib/roles";

export default function ServicePage() {
    const { user, token } = useAuth();
    const { successMessage, errorMessage, setErrorMessage, setSuccessMessage } = useMessages();
    
    // Determinar el modo según el rol del usuario
    const servicesMode = (!user || user?.role === ROLES.USER || user?.role === ROLES.INSTRUCTOR) 
        ? 'allActive' 
        : 'all';
    
    const { services, loading, refreshServices } = useServices({
        token,
        mode: servicesMode,
        onError: (message: string) => setErrorMessage(message)
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Handler para éxito en ServiceForm
    const handleServiceFormSuccess = () => {
        refreshServices();
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
                        onServiceUpdate={refreshServices}
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
