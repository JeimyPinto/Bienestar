"use client"

import React, { useState, useRef } from "react";
import { Service } from "../types/index";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import ServicesGallery from "./servicesGallery";
import ServiceTable from "./serviceTable";
import SectionHeader from "../ui/sectionHeader";
import ServiceForm from "./serviceForm";
import Spinner from "../ui/spinner";
import { useAuth } from "../hooks/useAuth";
import { useServices } from "../hooks/useServices";
import { useMessages } from "../hooks/useMessages";
import { ROLES } from "../constants/roles";

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
        onError: (message) => setErrorMessage(message)
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
                <main className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/10 py-6">
                    <div className="container mx-auto px-4 max-w-7xl">
                        {/* Header de la página para usuarios */}
                        <div className="mb-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20 text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gradient-to-r from-primary to-azul-cielo p-3 rounded-full">
                                        <span className="text-3xl">🛠️</span>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-azul-oscuro mb-3">
                                    Servicios Disponibles
                                </h1>
                                <p className="text-azul-marino/70 max-w-4xl mx-auto leading-relaxed">
                                    Si no encuentras el servicio que buscas en este listado, puede ser porque actualmente no se está prestando. 
                                    Algunos servicios solo están disponibles por convocatoria (Ejemplo: Monitorias, subsidio de alimentación, apoyo socioeconómico), 
                                    mientras que otros están disponibles todo el tiempo.
                                </p>
                            </div>
                        </div>

                        {/* Contenido principal */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="bg-white rounded-2xl shadow-lg p-8 border border-azul-cielo/20">
                                    <Spinner size="lg" color="primary" />
                                    <p className="text-primary text-lg mt-4 font-medium">
                                        Cargando servicios disponibles...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <ServicesGallery services={services} />
                        )}
                    </div>
                </main>
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-6">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <SectionHeader
                            title="Listado de Servicios"
                            buttonText="Añadir Nuevo Servicio"
                            onButtonClick={openCreateDialog}
                        />
                        
                        {/* Mensajes */}
                        {errorMessage && (
                            <div className="mb-6">
                                <ErrorMessage message={errorMessage} />
                            </div>
                        )}
                        {successMessage && (
                            <div className="mb-6">
                                <SuccessMessage 
                                    message={successMessage} 
                                    onClose={() => setSuccessMessage("")} 
                                />
                            </div>
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
                    </div>
                </div>
            )}
        </>
    );
}
