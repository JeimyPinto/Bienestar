"use client"

import React from "react";
import { Service } from "../../interface/service";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import ServicesGallery from "../../components/services/servicesGallery";
import ServiceTable from "../../components/services/serviceTable";
import SectionHeader from "../../ui/sectionHeader";
import ServiceForm from "../../components/services/serviceForm";
import Spinner from "../../ui/spinner";
import PageLayout from "../../components/layout/pageLayout";
import { useAuthContext } from "../../contexts/authContext";
import { useServices } from "../../hooks/useServices";
import { useMessages } from "../../hooks/useMessages";
import { useModal } from "../../hooks/useModal";
import { ROLES } from "../../constants/roles";

export default function ServicePage() {
    const { user, token } = useAuthContext();
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

    // Hook para manejo del modal
    const { 
        dialogRef, 
        isFormOpen, 
        mode, 
        itemToEdit: serviceToEdit, 
        openCreateDialog, 
        openEditDialog, 
        closeDialog 
    } = useModal<Service>();

    // Función para limpiar mensajes
    const clearMessages = () => {
        setErrorMessage("");
        setSuccessMessage("");
    };

    // Handler para éxito en ServiceForm
    const handleServiceFormSuccess = () => {
        refreshServices();
        closeDialog();
    };
    return (
        <>
            {(!user || user?.role === ROLES.USER) ? (
                <main className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/10 py-6">
                    <div className="container mx-auto px-4 max-w-7xl">
                        {/* Header de la página para usuarios */}
                        <SectionHeader
                            title="Servicios Disponibles"
                            description="Si no encuentras el servicio que buscas en este listado, puede ser porque actualmente no se está prestando. Algunos servicios solo están disponibles por convocatoria (Ejemplo: Monitorias, subsidio de alimentación, apoyo socioeconómico), mientras que otros están disponibles todo el tiempo."
                            icon="🛠️"
                            showBackButton={false}
                            centerContent={true}
                            size="lg"
                        />

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
                            <ServicesGallery/>
                        )}
                    </div>
                </main>
            ) : (
                <PageLayout>
                    <SectionHeader
                        title="Listado de Servicios"
                        description="Gestiona todos los servicios del sistema de bienestar"
                        icon="🛠️"
                        buttonText="Añadir Nuevo Servicio"
                        buttonShortText="Añadir"
                        onButtonClick={() => openCreateDialog(clearMessages)}
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
                        onEditService={(service) => openEditDialog(service, clearMessages)}
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
                </PageLayout>
            )}
        </>
    );
}
