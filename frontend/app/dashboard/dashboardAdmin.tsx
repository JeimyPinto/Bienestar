"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServicesGallery from "../services/servicesGallery";
import { Service } from "../types/service";
import isTokenExpired from "../lib/isTokenExpired";
import getToken from "../lib/getToken";
import getUserToken from "../lib/getUserToken";
import { ROLES } from "../lib/roles";
import { getByUserId } from "../services/services/service";

export default function DashboardAdmin({ role }: { role: string }) {
    const [services, setServices] = useState<Service[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const tokenValue = getToken();
            let userValue = null;
            if (tokenValue) {
                try {
                    userValue = getUserToken(tokenValue);
                } catch (e) {
                    userValue = null;
                }
            }
            if (tokenValue && userValue?.id) {
                if (isTokenExpired(tokenValue)) {
                    localStorage.removeItem("token");
                    setServices([]);
                } else {
                    // Obtener servicios creados por el usuario desde la API
                    try {
                        const data = await getByUserId(userValue.id, tokenValue);
                        if (data && data.services) {
                            setServices(data.services);
                        } else {
                            setServices([]);
                        }
                    } catch {
                        setServices([]);
                    }
                }
            } else {
                setServices([]);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Opciones de Administrador</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    {(role === ROLES.ADMIN || role === ROLES.SUPERADMIN) && (
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
                                onClick={() => router.push("/group")}
                            >
                                Panel de fichas
                            </button>
                        </>
                    )}
                    {(role === ROLES.ADMIN || role === ROLES.SUPERADMIN || role === ROLES.INSTRUCTOR) && (
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
            {(role === ROLES.ADMIN || role === ROLES.SUPERADMIN) && (
                <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-2xl font-bold mb-4">Servicios Creados</h2>
                    <ServicesGallery
                        services={services}
                        message="No tienes servicios creados."
                    />
                </section>
            )}
        </>
    );
}
