import React from "react";
import { RequestStatusFieldsProps } from "../../interface/request";

const RequestStatusFields: React.FC<RequestStatusFieldsProps> = ({
  mode,
  newRequest,
  setNewRequest,
}) => {
  return (
    <>
      <div className="col-span-1">
        <label className="block text-sm font-medium text-azul">Estado</label>
        {mode === "create" ? (
          <input
            type="text"
            name="status"
            value="Activo"
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
          />
        ) : (
          <select
            name="status"
            value={newRequest.status ? "activo" : "inactivo"}
            onChange={e => setNewRequest({ ...newRequest, status: e.target.value === "activo" })}
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        )}
      </div>
      <div className="col-span-1">
        <label className="block text-sm font-medium text-azul">Estado de Respuesta</label>
        {mode === "create" ? (
          <input
            type="text"
            name="responseStatus"
            value="Pendiente"
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-amarillo text-amarillo rounded-md shadow-sm bg-gray-100"
          />
        ) : (
          <select
            name="responseStatus"
            value={newRequest.responseStatus}
            onChange={e => setNewRequest({ ...newRequest, responseStatus: e.target.value })}
            className={
              `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul ` +
              (newRequest.responseStatus === "pendiente" ? "border-amarillo text-amarillo" :
                newRequest.responseStatus === "aprobada" ? "border-verde text-verde" :
                  newRequest.responseStatus === "rechazada" ? "border-magenta text-magenta" : "")
            }
            required
          >
            <option value="pendiente">🟡 Pendiente</option>
            <option value="aprobada">🟢 Aprobada</option>
            <option value="rechazada">🔴 Rechazada</option>
          </select>
        )}
      </div>
      {/* Campo responseMessage solo si rechazada */}
      {newRequest.responseStatus === "rechazada" && (
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-azul">Motivo del Rechazo</label>
          <textarea
            name="responseMessage"
            value={newRequest.responseMessage || ""}
            onChange={e => setNewRequest({ ...newRequest, responseMessage: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-magenta rounded-md shadow-sm focus:outline-none focus:ring-magenta focus:border-magenta resize-y min-h-[80px]"
            required={newRequest.responseStatus === "rechazada"}
            rows={4}
            placeholder="Explica el motivo del rechazo..."
          />
        </div>
      )}
    </>
  );
};

export default RequestStatusFields;
