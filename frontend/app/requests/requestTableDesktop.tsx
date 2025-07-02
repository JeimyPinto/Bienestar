import React from "react";
import { RequestTableDesktopProps } from "../../interface/index";
import Spinner from "../../ui/spinner";
import { areaColors } from "../../styles/areaColors";

export default function RequestTableDesktop({
  requests,
  loading,
  handleRowClick,
}: RequestTableDesktopProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-cian bg-blanco">
      <table className="min-w-full divide-y divide-cian">
        <thead className="bg-cian text-white">
          <tr>
            <th className="px-3 py-3 text-xs font-semibold text-left">#</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Solicitante</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Servicio</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Área del servicio</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Descripción</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Estado</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Estado de Respuesta</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Mensaje de Respuesta</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Creador de la Solicitud</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Fecha de creación</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Fecha de actualización</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cian bg-white">
          {loading ? (
            <tr>
              <td colSpan={11} className="py-10 text-center text-azul font-medium">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Spinner className="w-8 h-8 mx-auto" />
                  <span>Cargando solicitudes / Loading requests...</span>
                </div>
              </td>
            </tr>
          ) : requests.length === 0 ? (
            <tr>
              <td colSpan={11} className="py-10 text-center text-azul font-medium">
                No hay solicitudes / No requests found.
              </td>
            </tr>
          ) : (
            requests.map((request, idx) => (
              <tr
                key={request.id}
                className="hover:bg-cian/20 hover:scale-[1.01] transition-all duration-150 cursor-pointer"
                onClick={() => handleRowClick(request)}
              >
                <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.applicant?.firstName} {request.applicant?.lastName}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.service?.name}
                </td>
                <td>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${areaColors[request.service?.area ?? "default"]}`}
                  >
                    {request.service?.area || "Sin área"}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.description || "Sin descripción / No description"}
                </td>
                <td className="px-3 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {request.status ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.responseStatus}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.responseMessage || "-"}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.creator?.firstName && request.creator?.lastName
                    ? `${request.creator.firstName} ${request.creator.lastName}`
                    : "-"}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">
                  {request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
