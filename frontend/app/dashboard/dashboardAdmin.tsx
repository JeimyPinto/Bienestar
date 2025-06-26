"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ServicesGallery from "../services/servicesGallery"
import { Service } from "../types/service"
import { useAuth } from "../hooks/useAuth"
import { ROLES } from "../lib/roles"
import { getByUserId } from "../services/services/service"
import ErrorMessage from "../ui/errorMessage"
import SuccessMessage from "../ui/successMessage"

export default function DashboardAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchServices = async () => {
            if (!user || !token) return;
            const res = await getByUserId(user.id, token || undefined);
            if (res.error) {
                setErrorMessage(res.error);
            } else {
                setServices(res.services);
                setSuccessMessage("Servicios obtenidos con éxito.");
            }
        };

        if (user?.id && token) {
            fetchServices();
        }
    }, [user, token]);


    return (
        <>
            <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Opciones de Administrador</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    {(user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN)) && (
                        <>
                            <button
                                aria-label="Ir al panel de usuarios"
                                className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                                onClick={() => router.push("/users")}
                            >
                                Panel de usuarios
                            </button>
                            <button
                                aria-label="Ir al panel de servicios"
                                className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                                onClick={() => router.push("/services")}
                            >
                                Panel de servicios
                            </button>
                            <button
                                aria-label="Ir al panel de fichas"
                                className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                                onClick={() => router.push("/groups")}
                            >
                                Panel de fichas
                            </button>
                            <button
                                aria-label="Ir al panel de remisiones"
                                className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                                onClick={() => router.push("/remissions")}
                            >
                                Panel de remisiones
                            </button>
                            {user.role === ROLES.SUPERADMIN && (
                                <button
                                    aria-label="Ir al panel de auditorías"
                                    className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                                    onClick={() => router.push("/audits")}
                                >
                                    Panel de auditorías
                                </button>
                            )}
                        </>
                    )}
                    {(user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN || user.role === ROLES.INSTRUCTOR)) && (
                        <button
                            aria-label="Ir al panel de solicitudes"
                            className="flex-1 min-w-[150px] bg-azul text-white py-2 px-4 rounded-lg hover:bg-cian transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cian"
                            onClick={() => router.push("/requests")}
                        >
                            Solicitudes de remisión
                        </button>
                    )}
                </div>
            </section>
            {(user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN)) && (
                <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-2xl font-bold mb-4">Servicios Creados</h2>
                    {errorMessage && (
                        <ErrorMessage message={errorMessage} />
                    )}
                    {successMessage && (
                        <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
                    )}
                    <ServicesGallery
                        services={services}
                        message="No tienes servicios creados."
                    />
                </section>
            )}
        </>
    );
}
