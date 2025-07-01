import React from "react";
import { RequestStatusFieldsProps } from "../types/request";

const RequestStatusFields: React.FC<RequestStatusFieldsProps> = ({
  mode,
  newRequest,
  setNewRequest,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "border-warning text-warning bg-warning/5";
      case "aprobada":
        return "border-success text-success bg-success/5";
      case "rechazada":
        return "border-danger text-danger bg-danger/5";
      default:
        return "border-azul-cielo text-azul-oscuro bg-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Estado de la solicitud */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-azul-oscuro">
          <span className="flex items-center">
            <span className="mr-2">🔄</span>
            Estado de la Solicitud
          </span>
        </label>
        
        {mode === "create" ? (
          <div className="relative">
            <input
              type="text"
              value="Activa"
              readOnly
              className="
                w-full px-4 py-3 border-2 border-success/30 rounded-xl
                bg-success/5 text-success font-medium
                cursor-not-allowed
              "
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-success">✅</span>
            </div>
          </div>
        ) : (
          <select
            name="status"
            value={newRequest.status ? "activo" : "inactivo"}
            onChange={e => setNewRequest({ ...newRequest, status: e.target.value === "activo" })}
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-xl
              focus:border-primary focus:ring-4 focus:ring-primary/20
              transition-all duration-300 text-azul-oscuro bg-white/50
            "
          >
            <option value="activo">✅ Activa</option>
            <option value="inactivo">❌ Inactiva</option>
          </select>
        )}
      </div>

      {/* Estado de respuesta */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-azul-oscuro">
          <span className="flex items-center">
            <span className="mr-2">📋</span>
            Estado de Respuesta
          </span>
        </label>
        
        {mode === "create" ? (
          <div className="relative">
            <input
              type="text"
              value="Pendiente de Revisión"
              readOnly
              className="
                w-full px-4 py-3 border-2 border-warning/30 rounded-xl
                bg-warning/5 text-warning font-medium
                cursor-not-allowed
              "
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-warning">⏳</span>
            </div>
          </div>
        ) : (
          <select
            name="responseStatus"
            value={newRequest.responseStatus}
            onChange={e => setNewRequest({ ...newRequest, responseStatus: e.target.value as "pendiente" | "aprobada" | "rechazada" })}
            className={`
              w-full px-4 py-3 border-2 rounded-xl
              focus:ring-4 transition-all duration-300
              ${getStatusColor(newRequest.responseStatus)}
            `}
            required
          >
            <option value="pendiente">⏳ Pendiente de Revisión</option>
            <option value="aprobada">✅ Aprobada</option>
            <option value="rechazada">❌ Rechazada</option>
          </select>
        )}
      </div>

      {/* Campo de motivo de rechazo */}
      {newRequest.responseStatus === "rechazada" && (
        <div className="space-y-3 p-4 bg-danger/5 border border-danger/20 rounded-xl">
          <label className="block text-sm font-semibold text-danger">
            <span className="flex items-center">
              <span className="mr-2">📝</span>
              Motivo del Rechazo
            </span>
          </label>
          
          <textarea
            name="responseMessage"
            value={newRequest.responseMessage || ""}
            onChange={e => setNewRequest({ ...newRequest, responseMessage: e.target.value })}
            className="
              w-full px-4 py-3 border-2 border-danger/30 rounded-xl
              focus:border-danger focus:ring-4 focus:ring-danger/20
              transition-all duration-300 resize-y min-h-[100px]
              placeholder:text-danger/40 text-danger bg-white/50
            "
            required={newRequest.responseStatus === "rechazada"}
            rows={4}
            placeholder="Explica detalladamente el motivo del rechazo de la solicitud..."
          />
          
          <div className="text-xs text-danger/70">
            <span className="flex items-center">
              <span className="mr-1">⚠️</span>
              Este motivo será visible para el solicitante
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestStatusFields;
