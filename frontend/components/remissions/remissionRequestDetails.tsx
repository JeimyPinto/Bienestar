import React from "react";
import { Request } from "../../interface/request";

interface RemissionRequestDetailsProps {
  selectedRequest: Request | null;
  loading?: boolean;
}

export default function RemissionRequestDetails({ 
  selectedRequest, 
  loading = false 
}: RemissionRequestDetailsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!selectedRequest) {
    return (
      <div className="space-y-4">
        {/* Usuario referido (vacío) */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Usuario referido</label>
          <input
            type="text"
            value=""
            placeholder="Selecciona una solicitud para ver los detalles"
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
          />
        </div>
        {/* Servicio (vacío) */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Servicio</label>
          <input
            type="text"
            value=""
            placeholder="Selecciona una solicitud para ver el servicio"
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Usuario referido (con datos) */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700">Usuario referido</label>
        <div className="relative">
          <input
            type="text"
            value={selectedRequest.applicant 
              ? `${selectedRequest.applicant.firstName} ${selectedRequest.applicant.lastName}` 
              : "Usuario no disponible"
            }
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-800 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        {selectedRequest.applicant?.email && (
          <p className="text-sm text-gray-500 mt-1">
            📧 {selectedRequest.applicant.email}
          </p>
        )}
      </div>

      {/* Servicio (con datos) */}
      <div>
        <label className="block font-semibold mb-1 text-gray-700">Servicio</label>
        <div className="relative">
          <input
            type="text"
            value={selectedRequest.service?.name || "Servicio no disponible"}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-800 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H5m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h2m0 0V7a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2z" />
            </svg>
          </div>
        </div>
        {selectedRequest.service?.description && (
          <p className="text-sm text-gray-500 mt-1">
            📝 {selectedRequest.service.description}
          </p>
        )}
      </div>

      {/* Información adicional de la solicitud */}
      {selectedRequest.responseStatus && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Estado de la solicitud:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              selectedRequest.responseStatus === 'aprobada' 
                ? 'bg-green-100 text-green-800' 
                : selectedRequest.responseStatus === 'pendiente'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedRequest.responseStatus === 'aprobada' ? 'Aprobada' : 
               selectedRequest.responseStatus === 'pendiente' ? 'Pendiente' : 
               selectedRequest.responseStatus === 'rechazada' ? 'Rechazada' :
               selectedRequest.responseStatus}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
