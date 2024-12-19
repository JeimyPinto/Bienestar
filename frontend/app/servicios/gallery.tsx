"use client";

import { useEffect, useState } from "react";
import formatDate from "../lib/formatDate";

interface Servicio {
  id: number;
  nombre: string;
  imagen: string;
  Integrante: {
    area: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ServiciosGallery() {
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/servicios`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setServicios(data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          Estos son nuestros servicios
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={
                  servicio.imagen
                    ? `/images/${servicio.id}/${servicio.imagen}`
                    : "/images/logo-sena.png"
                }
                alt={servicio.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {servicio.nombre}
                </h2>
                <p className="text-gray-600">
                  Área: {servicio.Integrante.area}
                </p>
                <p className="text-gray-600">
                  Publicado: {formatDate(servicio.createdAt)}
                </p>
                <p className="text-gray-600">
                  Actualizado: {formatDate(servicio.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
