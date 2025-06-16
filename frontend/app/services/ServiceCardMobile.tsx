import React from "react";
import Image from "next/image";
import { Service } from "../../types/service";
import { areaColors } from "../../styles/areaColors";

interface Props {
  services: Service[];
  loading: boolean;
  onCardClick: (service: Service) => void;
}

const ServiceCardMobile: React.FC<Props> = ({ services, loading, onCardClick }) => (
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
          onClick={() => onCardClick(service)}
          tabIndex={0}
          aria-label={`Editar servicio ${service.name}`}
        >
          <div className="flex items-center gap-3">
            {service.image ? (
              <Image
                src={
                  service?.image
                    ? `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/services/${service.image}`
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
  </div>
);

export default ServiceCardMobile;
