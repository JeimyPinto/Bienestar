import React, { useEffect, useState } from "react";
import { Service } from "../types/service";
import ServicesGallery from "./servicesGallery";
import ErrorMessage from "../ui/errorMessage";
import { getAll } from "../services/services/service";

export default function ServicePage() {
    const [services, setServices] = useState<Service[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        async function fetchServices() {
            const { services, message } = await getAll();
            if (services) setServices(services);
            setMessage(message);
        }
        fetchServices();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cian via-white to-azul px-2 py-10 sm:px-4 sm:py-16 rounded-xl shadow-xl mx-auto w-full max-w-5xl">
            {services.length > 0
                ? <ServicesGallery services={services} />
                : <ErrorMessage message={message} />
            }
        </main>
    );
}