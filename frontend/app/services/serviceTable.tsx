import React, { useEffect, useState, useRef } from "react";
import { useColumnSorter } from "../lib/useColumnSorter";
import { Service } from "../types/service"
import ErrorMessage from "../ui/errorMessage";
import ServiceForm from "./serviceForm";
import { getAllActive } from "../services/services/service"

export default function ServicePage() {
  const [token, setToken] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedservice, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceEditFormRef = useRef<Service | null>(null);

  useEffect(() => {
    let tokenValue: string | null = null;
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
    if (tokenValue) setToken(tokenValue);
  }, []);


  useEffect(() => {
    if (!token) {
      setError("No authentication token found / No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError(null);
    const loadServices = async () => {
      try {
        const data = await getAllActive();
        if (!isMounted) return;
        if (data.error) {
          setError(typeof data.error === "string" ? data.error : data.error?.message || String(data.error));
        } else if (data.services) {
          setServices(data.services);
        }
      } catch {
        if (isMounted) setError("Error al cargar los servicios / Error loading services.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadServices();
    return () => { isMounted = false; };
  }, [token]);

  function handleRowClick(service: Service) {
    setSelectedService(service);
    setIsFormOpen(true);
    setTimeout(() => {
      serviceEditFormRef.current?.showModal();
    }, 0);
  }

  return (
    <section className="w-full max-w-8xl mx-auto px-2 py-6">
      <div className="flex flex-col gap-4">

        {error && (
          <ErrorMessage message={error} />
        )}
        <div className="max-w-8xl mx-auto bg-blanco border border-azul shadow-md rounded-lg text-center">
          {/* Header */}
          <div className="overflow-x-auto rounded-lg shadow-md border border-azul bg-blanco">
            <table className="min-w-full divide-y divide-cian">
              <thead className="bg-cian text-azul">
                <tr>
                  <th className="px-2 py-3 text-xs font-semibold"></th>
                  <th className="px-2 py-3 text-xs font-semibold">Imagen</th>
                  <th className="px-2 py-3 text-xs font-semibold">Nombre</th>
                  <th className="px-2 py-3 text-xs font-semibold">Descripción</th>
                  <th className="px-2 py-3 text-xs font-semibold">Creador</th>
                  <th className="px-2 py-3 text-xs font-semibold">Área</th>
                  <th className="px-2 py-3 text-xs font-semibold">Estado</th>
                  <th className="px-2 py-3 text-xs font-semibold">Fecha de Creación</th>
                  <th className="px-2 py-3 text-xs font-semibold">Fecha de Actualización</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cian">
                {loading ? (
                  <tr>
                    <td colSpan={12} className="py-8 text-center text-azul">
                      Cargando servicios...
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-azul">
                      No se encontraron servicios / No services found.
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-amarillo cursor-pointer"
                      onClick={() => handleRowClick(service)}
                    >
                      <td className="px-2 py-4 text-sm">{service.id}</td>
                      <td className="px-2 py-4">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={`${service.name} avatar`}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500">Sin imagen</span>
                        )}
                      </td>
                      <td className="px-2 py-4 truncate">{service.name}</td>
                      <td className="px-2 py-4 truncate">{service.description}</td>
                      <td className="px-2 py-4 truncate">
                        {service.creator
                          ? `${service.creator.firstName} ${service.creator.lastName ?? ""}`
                          : ""}
                      </td>
                      <td className="px-2 py-4 truncate">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm ${service.area ? "bg-cian" : "bg-gray-400"
                            }`}
                        >
                          {service.area || "Sin área"}
                        </span>
                      </td>
                      <td className="px-2 py-4 truncate">{service.status}</td>
                      <td className="px-2 py-4">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-4">
                        {new Date(service.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {isFormOpen && selectedservice && (
            <ServiceForm
              dialogRef={serviceEditFormRef}
              closeDialog={() => setIsFormOpen(false)}
              onClose={() => setIsFormOpen(false)}
              mode="edit"
              userToEdit={selectedservice}
            />
          )}
        </div>
      </div>
    </section>
  );
};

