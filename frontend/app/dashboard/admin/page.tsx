"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { areaColors } from "../../lib/areaColors";
import { User } from "../../types/user";
import { Service } from "../../types/service";
import { formatDate } from "../../lib/formateDate"


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
                        onClick={() => router.push("/user")}
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
                        onClick={() => router.push("/request")}
                    >
                        Panel de solicitudes de remisión
                    </button>
                </div>
            </section>
            {/* <section className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Servicios Creados</h2>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 animate-pulse h-48 rounded-lg"
                            ></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md">
                        <p>{error}</p>
                        <button
                            onClick={() => {
                                setLoading(true);
                                setError(null);
                                setToken(token => token);
                            }}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Retry
                        </button>
                    </div>
                ) : user?.services?.length === 0 ? (
                    <p className="text-gray-600">No hay servicios creados por el usuario.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {user?.services?.map(service => (

                            <div
                                key={service.id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                            >
                                <Image
                                    src={
                                        service.image
                                            ? `/images/services/${service.id}/${service.image}`
                                            : "/images/logo-sena.png"
                                    }
                                    alt={`Imagen del servicio ${service.name}`}
                                    className="w-full h-48 object-cover"
                                    width={400}
                                    height={200}
                                    priority={true}
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                                    <p className="text-gray-600 line-clamp-2">
                                        {service.description}
                                    </p>
                                    <div
                                        className={`inline-block px-3 py-1 text-white rounded-full ${areaColors[service.area]
                                            }`}
                                    >
                                        {service.area}
                                    </div>
                                    <p className="text-gray-600">
                                        Publicado: {formatDate(service.createdAt)}
                                    </p>
                                    <p className="text-gray-600">
                                        Actualizado: {formatDate(service.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section> */}
        </>
    );
}
