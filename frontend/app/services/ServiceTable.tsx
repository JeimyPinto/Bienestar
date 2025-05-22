import React, { useState } from "react";
import { ServiceTableProps } from "../types/Service"
// import { areaColors } from "../lib/areaColors";
// import ServiceForm from "./ServiceForm";

const ServiceTable: React.FC<ServiceTableProps> = () => {
  const [filter, setFilter] = useState("");

  return (
    <div className="overflow-x-auto px-4">
      {/* Filtro por descripción */}
      <div className="mb-4 max-w-8xl mx-auto">
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      <div className="max-w-8xl mx-auto bg-blanco border border-azul shadow-md rounded-lg text-center">
        {/* Header */}
        <div className="grid grid-cols-9 bg-cian text-azul font-semibold px-6 py-4 text-lg">
          <div className="min-w-[160px]">ID</div>
          <div className="min-w-[160px]">Imagen</div>
          <div className="min-w-[160px]">Nombre</div>
          <div className="min-w-[160px]">Descripción</div>
          <div className="min-w-[160px]">Creador</div>
          <div className="min-w-[160px]">Área</div>
          <div className="min-w-[160px]">Estado</div>
          <div className="min-w-[160px]">Fecha de Creación</div>
          <div className="min-w-[160px]">Fecha de Actualización</div>
        </div>

        {/* Rows */}
        {/* {filteredServices.map((service) => (
          <>
            <div
              key={service.id}
              className="grid grid-cols-9 items-center px-6 py-4 border-b hover:bg-amarillo cursor-pointer text-base"
              onClick={() => handleRowClick(service)}
              style={{ minHeight: "64px" }}
            >
              <div className="min-w-[160px] truncate">{service.id}</div>
              <div className="min-w-[160px] flex justify-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={`${service.description} avatar`}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Sin imagen</span>
                )}
              </div>
              <div className="min-w-[160px] truncate">{service.name}</div>
              <div className="min-w-[160px] truncate">
                {service.description}
              </div>
              <div className="min-w-[160px] truncate">
                {service.creator
                  ? `${service.creator.firstName} ${
                      service.creator.lastName ?? ""
                    }`
                  : ""}
              </div>
              <div className="min-w-[160px] truncate">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    areaColors[service.area] || "bg-gray-400"
                  }`}
                >
                  {service.area}
                </span>
              </div>{" "}
              <div className="min-w-[160px] truncate">{service.status}</div>
              <div className="min-w-[160px]">
                {new Date(service.createdAt).toLocaleDateString()}
              </div>
              <div className="min-w-[160px]">
                {new Date(service.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </>
        ))} */}
      </div>
    </div>
  );
};

export default ServiceTable;
