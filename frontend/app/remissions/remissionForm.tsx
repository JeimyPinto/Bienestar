import React, { useEffect, useState } from "react";
import { Remission } from "../types/remission";
import { Request } from "../types/request";
import { User } from "../types/user";
import { getAllActive, getById as getRequestById } from "../services/services/request";
import { getAllByRole } from "../services/services/user";
import { create, update } from "../services/services/remission";
import { ROLES } from "../lib/roles";
import {RemissionFormProps} from "../types/remission";
import { useAuth } from "../hooks/useAuth";


export default function RemissionForm({
  dialogRef,
  onClose,
  mode,
  remissionToEdit,
  setErrorMessage,
  setSuccessMessages,
}: RemissionFormProps) {
  const { token } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(remissionToEdit?.requestId || null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [admins, setAdmins] = useState<User[]>([]);
  const [assignedUserId, setAssignedUserId] = useState<number | null>(remissionToEdit?.assignedUserId || null);
  const [endDate, setEndDate] = useState<string>(remissionToEdit?.endDate || "");
  const [loading, setLoading] = useState(false);

  // startDate: para crear es hoy, para editar es el de la remisión
  const startDate = remissionToEdit?.startDate || new Date().toISOString().slice(0, 10);

  // Cargar requests activas
  useEffect(() => {
    if (token) {
      getAllActive(token).then(res => {
        if (res.requests) setRequests(res.requests);
      });
    }
  }, [token]);

  // Cargar admins
  useEffect(() => {
    if (token) {
      getAllByRole(ROLES.ADMIN, token).then(res => {
        if (res.users) setAdmins(res.users);
      });
    }
  }, [token]);

  // Cuando selecciona una request, obtener sus datos
  useEffect(() => {
    if (selectedRequestId && token) {
      getRequestById(selectedRequestId, token).then(res => {
        if (res.request) setSelectedRequest(res.request);
      });
    }
  }, [selectedRequestId, token]);

  // Handler para guardar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Validaciones básicas
    if (!selectedRequestId || !selectedRequest) {
      setErrorMessage("Debes seleccionar una solicitud válida.");
      setLoading(false);
      return;
    }
    if (!assignedUserId) {
      setErrorMessage("Debes asignar un administrador responsable.");
      setLoading(false);
      return;
    }
    if (!endDate || endDate < startDate) {
      setErrorMessage("La fecha de finalización no puede ser menor que la de inicio.");
      setLoading(false);
      return;
    }

    try {
      const remissionData: Remission = {
        id: remissionToEdit?.id,
        requestId: selectedRequestId!,
        referredUserId: selectedRequest.userId,
        serviceId: selectedRequest.serviceId,
        assignedUserId: assignedUserId!,
        startDate: startDate,
        endDate: endDate
      };

      let result;
      if (mode === "create") {
        result = await create(remissionData, token || undefined);
      } else {
        result = await update(remissionToEdit!.id!.toString(), remissionData, token || undefined);
      }

      if (result.error) {
        setErrorMessage(result.message || "Error al procesar la remisión");
      } else {
        setSuccessMessages((prev) => [...prev, result.message || (mode === "create" ? "Remisión creada con éxito" : "Remisión actualizada con éxito")]);
        onClose(result.message);
      }
    } catch (error) {
      setErrorMessage( "Error inesperado al procesar la remisión");
      console.error("Error procesando la remisión:", error);
    }

    setLoading(false);
  };

  return (
    <dialog ref={dialogRef} className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{mode === "create" ? "Crear Remisión" : "Editar Remisión"}</h2>
        {/* Selección de solicitud */}
        <div>
          <label className="block font-semibold mb-1">Solicitud</label>
          <select
            value={selectedRequestId ?? ""}
            onChange={e => setSelectedRequestId(Number(e.target.value))}
            disabled={mode === "edit"}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Selecciona una solicitud</option>
            {requests.map(req => (
              <option key={req.id} value={req.id}>
                #{req.id} - {req.applicant?.firstName} {req.applicant?.lastName} - {req.service?.name}
              </option>
            ))}
          </select>
        </div>
        {/* Usuario referido (solo lectura) */}
        <div>
          <label className="block font-semibold mb-1">Usuario referido</label>
          <input
            type="text"
            value={selectedRequest?.applicant ? `${selectedRequest.applicant.firstName} ${selectedRequest.applicant.lastName}` : ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        {/* Servicio (solo lectura) */}
        <div>
          <label className="block font-semibold mb-1">Servicio</label>
          <input
            type="text"
            value={selectedRequest?.service?.name || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        {/* Asignar responsable */}
        <div>
          <label className="block font-semibold mb-1">Responsable (ADMIN)</label>
          <select
            value={assignedUserId ?? ""}
            onChange={e => setAssignedUserId(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Selecciona un responsable</option>
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>
                {admin.firstName} {admin.lastName}
              </option>
            ))}
          </select>
        </div>
        {/* Fecha de inicio (solo lectura) */}
        <div>
          <label className="block font-semibold mb-1">Fecha de inicio</label>
          <input
            type="date"
            value={startDate}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        {/* Fecha de finalización */}
        <div>
          <label className="block font-semibold mb-1">Fecha de finalización</label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => onClose()}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-cian text-white px-4 py-2 rounded hover:bg-azul"
            disabled={loading}
          >
            {mode === "create" ? "Crear" : "Actualizar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
