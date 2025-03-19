"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import formatDate from "../lib/formatDate";
import { areaColors } from "../lib/areaColors";
import { Service } from "../lib/types";
import { fetchServices } from "./endpoints";

export default function ServiciosGallery() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices(setServices, setLoading, setError);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Estos son nuestros servicios</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md">
          <p>{error}</p>
          <button onClick={() => fetchServices(setServices, setLoading, setError)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <Image
                src={service.image ? `/images/services/${service.id}/${service.image}` : "/images/logo-sena.png"}
                alt={`Imagen del servicio ${service.name}`}
                className="w-full h-48 object-cover"
                width={400}
                height={200}
                priority={true}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-gray-600 line-clamp-2">{service.description}</p>
                <div className={`inline-block px-3 py-1 text-white rounded-full ${areaColors[service.area]}`}>
                  {service.area}
                </div>
                <p className="text-gray-600">Publicado: {formatDate(service.createdAt)}</p>
                <p className="text-gray-600">Actualizado: {formatDate(service.updatedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}