"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../ui/header";
import ProfileCard from "../../user/profileCard";
import Image from "next/image";
import formatDate from "../../lib/formatDate";
import { areaColors } from "../../lib/areaColors";
import { Service } from "../../lib/types";
import { fetchUserServices } from "./endponits";
const DashboardPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Obtiene el token de autorización del localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError(
        "Authorization token not found / No se ha encontrado el token de autorización"
      );
      setLoading(false);
    } else {
      setToken(storedToken);
    }
  }, []);

  // Función reutilizable para cargar servicios
  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("Token no disponible");
      }
      const { services, message } = await fetchUserServices(token);
      setServices(services);
      setError(null);
    } catch (error) {
      setError(
        "Server issues, services not available / Problemas con el servidor, servicios no disponibles"
      );
    } finally {
      setLoading(false);
    }
  };

  // Llama a loadServices cuando haya token
  useEffect(() => {
    if (token) {
      loadServices();
    }
  }, [token]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <ProfileCard />
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Solicitudes de Remisión Pendientes
          </h2>
          <button
            className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
            onClick={() => router.push("/request")}
          >
            Crear una solicitud
          </button>
          <div>
            <p>No hay solicitudes pendientes.</p>
          </div>
        </section>
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
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
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
                onClick={loadServices}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              >
                Retry
              </button>
            </div>
          ) : services.length === 0 ? (
            <p>No hay servicios creados.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service) => (
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
                    <h2 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                    <div
                      className={`inline-block px-3 py-1 text-white rounded-full ${
                        areaColors[service.area]
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
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
