"use client"

import React, { useEffect, useState } from "react";
import { Service } from "../types/service";
import ServicesGallery from "./servicesGallery";
import ErrorMessage from "../ui/errorMessage";
import { getAllActive } from "../services/services/service";
import Header from "../ui/header";
import Footer from "../ui/footer";

export default function ServicePage() {
    const [services, setServices] = useState<Service[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchServices() {
            setLoading(true);
            const { services, message } = await getAllActive();
            if (services) setServices(services);
            setMessage(message);
            setLoading(false);
        }
        fetchServices();
    }, []);

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16 shadow-xl mx-auto w-full max-w-full transition-all">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-azul">Servicios Disponibles</h1>
                <p className="mb-6 text-center text-gray-700 max-w-5xl">
                    Si no encuentras el servicio que buscas en este listado, puede ser porque actualmente no se está prestando. Algunos servicios, solo están disponibles por convocatoria ( Ejemplo: Monitorias, subsidio de alimentación, apoyo socieconómico), mientras que otros están disponibles todo el tiempo.
                </p>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cian border-opacity-50 mb-4"></div>
                        <span className="text-cian text-lg">Cargando servicios...</span>
                    </div>
                ) : services.length > 0 ? (
                    <ServicesGallery services={services} />
                ) : (
                    <ErrorMessage message={message || "No se encontraron servicios activos."} />
                )}
            </main>
            <Footer />
        </>
    );
}

