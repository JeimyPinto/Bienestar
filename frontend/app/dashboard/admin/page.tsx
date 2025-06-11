"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServicesGallery from "../../services/servicesGallery";
import { User } from "../../types/user";
import { Service } from "../../types/service";


export default function DashboardAdmin() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        let tokenValue: string | null = null;

        // Obtener el token dependiendo del entorno
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

        setToken(tokenValue);

        if (tokenValue) {
            try {
                const parsedUser: User = JSON.parse(atob(tokenValue.split(".")[1]));
                setUser(parsedUser);
                setServices(parsedUser.services || []);
            } catch {
                setUser(null);
                setServices([]);
            }
        } else {
            setUser(null);
            setServices([]);
        }
    }, []);


    return (
        <>
            <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Opciones de Administrador</h2>
                <div className="flex flex-col gap-4">
                    <button
                        className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
                        onClick={() => router.push("/users")}
                    >
                        Panel de usuarios
                    </button>
                    <button
                        className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
                        onClick={() => router.push("/services")}
                    >
                        Panel de servicios
                    </button>
                    <button
                        className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
                        onClick={() => router.push("/requests")}
                    >
                        Panel de solicitudes de remisión
                    </button>
                </div>
            </section>
            <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Servicios Creados</h2>
                <ServicesGallery
                    services={user?.services}
                    message="No tienes servicios disponibles."
                />
            </section>
        </>
    );
}
