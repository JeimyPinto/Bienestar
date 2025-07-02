import React from "react"
import Image from "next/image"
import { ServiceTableDesktopProps } from "../../types/service"
import { areaColors } from "../styles/areaColors";

const ServiceTableDesktop: React.FC<ServiceTableDesktopProps> = ({ services, loading, onRowClick }) => (
  <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden hidden sm:block">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-cian">
        <thead className="bg-cian text-white sticky top-0 z-10">
          <tr>
            <th className="px-3 py-3 text-xs font-semibold text-left">#</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Imagen</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Nombre</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Descripción</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Creador</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Área</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Estado</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Creado</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Actualizado</th>
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
                onClick={() => onRowClick(service)}
              >
                <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-3 py-4">
                  {service.image ? (
                    <Image
                      src={
                        service?.image
                          ? `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/services/${service.image}`
                          : "/images/logo-sena.png"
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
  </div>
);

export default ServiceTableDesktop;
