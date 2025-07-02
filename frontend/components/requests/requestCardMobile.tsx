import React from "react";
import { RequestCardMobileProps } from "../../interface/index";
import Spinner from "../../ui/spinner";
import { areaColors } from "../../styles/areaColors";

export default function RequestCardMobile({
  requests,
  loading,
  handleRowClick,
}: RequestCardMobileProps) {
  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <Spinner className="w-8 h-8 mx-auto" />
          <span>Cargando solicitudes...</span>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center text-azul font-medium py-8">
          No hay solicitudes
        </div>
      ) : (
        requests.map((request, idx) => (
          <div
            key={request.id}
            className="border border-cian rounded-lg shadow-md p-4 bg-white hover:bg-cian/10 cursor-pointer transition-all"
            onClick={() => handleRowClick(request)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-cian">#{idx + 1}</span>
              <span className={`px-2 py-1 rounded-md text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {request.status ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="text-sm text-gray-700 font-semibold">
              {request.applicant?.firstName} {request.applicant?.lastName}
            </div>
            <div className="text-sm text-gray-700">{request.service?.name}</div>
            <div className="my-1">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${areaColors[request.service?.area ?? "default"]}`}>{request.service?.area || "Sin área"}</span>
            </div>
            <div className="text-xs text-gray-600 mb-1">
              <span className="font-semibold">Respuesta:</span> {request.responseStatus}
            </div>
            {request.responseMessage && (
              <div className="text-xs text-gray-600 mb-1">
                <span className="font-semibold">Mensaje:</span> {request.responseMessage}
              </div>
            )}
            <div className="text-xs text-gray-600 mb-1">
              <span className="font-semibold">Creador de la Solicitud</span> {request.creator?.firstName && request.creator?.lastName ? `${request.creator.firstName} ${request.creator.lastName}` : "-"}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Creado: {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "-"}</span>
              <span>Actualizado: {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString() : "-"}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
