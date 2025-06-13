import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Service } from "../types/service"
import ErrorMessage from "../ui/errorMessage";
import ServiceForm from "./serviceForm";
import { getAll } from "../services/services/service"
import { areaColors } from "../styles/areaColors";

export default function ServicePage() {
  const [token, setToken] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedservice, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceEditFormRef = useRef<HTMLDialogElement>(null);

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
        const data = await getAll(token);
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
    <section className="w-full max-w-8xl mx-auto px-2 sm:px-6 py-4 sm:py-10">
      <div className="flex flex-col gap-6">
        {error && <ErrorMessage message={error} />}

        {/* Tabla para pantallas sm y mayores */}
        <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden hidden sm:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cian">
              <thead className="bg-cian text-white sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">#</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Imagen</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Nombre</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Descripción</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Creador</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Área</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Estado</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Creado</th>
                  <th scope="col" className="px-3 py-3 text-xs font-semibold text-left">Actualizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cian bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-azul font-medium">
                      Cargando servicios...
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-azul font-medium">
                      No se encontraron servicios / No services found.
                    </td>
                  </tr>
                ) : (
                  services.map((service, idx) => (
                    <tr
                      key={service.id}
                      className="hover:bg-cian/10 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(service)}
                    >
                      <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                      <td className="px-3 py-4">
                        {service.image ? (
                          <Image
                            src={
                              service?.image
                                ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + service.image
                                : "/images/ico-profile.svg"
                            }
                            alt={`${service.name} avatar`}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover border border-cian shadow"
                          />
                        ) : (
                          <span className="text-gray-400 italic">Sin imagen</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm font-semibold text-azul truncate max-w-[10rem]">{service.name}</td>
                      <td className="px-3 py-4 text-sm text-gray-700 truncate max-w-[22rem]">{service.description}</td>
                      <td className="px-3 py-4 text-sm text-gray-700 truncate max-w-[16rem]">
                        {service.creator
                          ? `${service.creator.firstName} ${service.creator.lastName ?? ""}`
                          : <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${areaColors[service.area]}`}
                        >
                          {service.area || "Sin área"}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${service.status === "activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-xs text-gray-500">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-4 text-xs text-gray-500">
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
              serviceToEdit={selectedservice}
            />
          )}
        </div>

        {/* Cards para móvil */}
        <div className="sm:hidden flex flex-col gap-4">
          {loading ? (
            <div className="text-center text-azul font-medium py-10">Cargando servicios...</div>
          ) : services.length === 0 ? (
            <div className="text-center text-azul font-medium py-10">No se encontraron servicios / No services found.</div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-cian shadow-lg rounded-xl p-4 flex flex-col gap-2 cursor-pointer hover:bg-cian/10 transition-colors"
                onClick={() => handleRowClick(service)}
                tabIndex={0}
                aria-label={`Editar servicio ${service.name}`}
              >
                <div className="flex items-center gap-3">
                  {service.image ? (
                    <Image
                      src={
                        service?.image
                          ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + service.image
                          : "/images/ico-profile.svg"
                      }
                      alt={`${service.name} avatar`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover border border-cian shadow"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Sin imagen</span>
                  )}
                  <div>
                    <div className="font-bold text-azul">{service.name}</div>
                    <div className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${areaColors[service.area]}`}>
                      {service.area || "Sin área"}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 text-sm">{service.description}</div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>
                    <b>Estado:</b>{" "}
                    <span className={service.status === "activo" ? "text-green-700" : "text-red-700"}>
                      {service.status}
                    </span>
                  </span>
                  <span>
                    <b>Creado:</b> {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    <b>Actualizado:</b> {new Date(service.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <b>Creador:</b>{" "}
                  {service.creator
                    ? `${service.creator.firstName} ${service.creator.lastName ?? ""}`
                    : <span className="text-gray-400">-</span>}
                </div>
              </div>
            ))
          )}
          {isFormOpen && selectedservice && (
            <ServiceForm
              dialogRef={serviceEditFormRef}
              closeDialog={() => setIsFormOpen(false)}
              onClose={() => setIsFormOpen(false)}
              mode="edit"
              serviceToEdit={selectedservice}
            />
          )}
        </div>
      </div>
    </section>
  );
};

