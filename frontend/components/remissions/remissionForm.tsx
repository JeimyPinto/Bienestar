import React, { useEffect, useState } from "react";
import { Remission } from "../../interface/remission";
import { Request } from "../../interface/request";
import { ROLES } from "../../constants/roles";
import { useAuthContext } from "../../contexts/authContext";
import { useUsers } from "../../hooks/useUsers";
import { useRequests } from "../../hooks/useRequests";
import { useRemissions } from "../../hooks/useRemissions";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";
import RemissionRequestDetails from "./remissionRequestDetails";

interface RemissionFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: (msg?: string) => void;
  mode: "create" | "edit";
  remissionToEdit?: Remission;
  setSuccessMessages: (msgs: string[] | ((prev: string[]) => string[])) => void;
}

export default function RemissionForm({
  dialogRef,
  onClose,
  mode,
  remissionToEdit,
  setSuccessMessages,
}: RemissionFormProps) {
  const { token } = useAuthContext();
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(remissionToEdit?.requestId || null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [assignedUserId, setAssignedUserId] = useState<number | null>(remissionToEdit?.assignedUserId || null);
  const [endDate, setEndDate] = useState<string>(remissionToEdit?.endDate || "");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string>("");
  
  // Usar hook useUsers para cargar administradores
  const { users: admins } = useUsers({
    token,
    mode: 'byRole',
    role: ROLES.ADMIN,
    onError: (message) => {
      setFormError(message || "No hay usuarios administradores disponibles para asignar a la remisión.");
    }
  });

  // Usar hook useRequests para cargar requests activas
  const { requests } = useRequests({
    token,
    mode: 'allActive',
    onError: (message) => {
      setFormError(message || "Error al cargar las solicitudes activas.");
    }
  });

  // Usar hook useRequests para obtener request específica por ID
  const { requests: selectedRequestArray } = useRequests({
    token,
    mode: 'byId',
    requestId: selectedRequestId || undefined,
    onError: (message) => {
      setFormError(message || "Error al cargar los detalles de la solicitud.");
    }
  });

  // Usar hook useRemissions para operaciones CRUD
  const { createRemission, updateRemission } = useRemissions({
    token,
    onError: (message) => {
      setFormError(message || "Error en operaciones de remisión.");
    }
  });

  // startDate: para crear es hoy, para editar es el de la remisión
  const startDate = remissionToEdit?.startDate || new Date().toISOString().slice(0, 10);

  // Actualizar selectedRequest cuando cambie selectedRequestArray
  useEffect(() => {
    if (selectedRequestArray && selectedRequestArray.length > 0) {
      setSelectedRequest(selectedRequestArray[0]);
    }
  }, [selectedRequestArray]);

  // Handler para guardar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(""); // Limpiar errores previos
    
    // Validaciones básicas
    if (!selectedRequestId || !selectedRequest) {
      setFormError("Debes seleccionar una solicitud válida.");
      setLoading(false);
      return;
    }
    if (!assignedUserId) {
      setFormError("Debes asignar un administrador responsable.");
      setLoading(false);
      return;
    }
    if (!endDate || endDate < startDate) {
      setFormError("La fecha de finalización no puede ser menor que la de inicio.");
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
        result = await createRemission(remissionData);
      } else {
        result = await updateRemission(remissionToEdit!.id!.toString(), remissionData);
      }

      if (result.error) {
        setFormError(result.message || "Error al procesar la remisión");
      } else {
        setSuccessMessages((prev) => [...prev, result.message || (mode === "create" ? "Remisión creada con éxito" : "Remisión actualizada con éxito")]);
        onClose(result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? `Error inesperado al procesar la remisión: ${error.message}`
        : "Error inesperado al procesar la remisión";
      setFormError(errorMessage);
      console.error("Error procesando la remisión:", error);
    }

    setLoading(false);
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-2xl w-full mx-4 p-0 bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
        <FormModalHeader
          mode={mode}
          entityName="Remisión"
          createTitle="Crear Nueva Remisión"
          editTitle="Editar Remisión"
          createDescription="Complete la información para crear una nueva remisión de servicio"
          editDescription="Modifique los campos necesarios de la remisión"
          onClose={() => onClose()}
          icon={{
            create: "M12 4v16m8-8H4",
            edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          }}
        />
        
        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="remission-form" onSubmit={handleSubmit} className="space-y-6">
        
        <FormErrorDisplay error={formError} />
        
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
        
        {/* Detalles de la solicitud seleccionada */}
        <RemissionRequestDetails 
          selectedRequest={selectedRequest}
          loading={false}
        />
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
          />
        </div>
        
          </form>
        </div>
        
        {/* Botones fijos en la parte inferior */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end gap-4">
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
              form="remission-form"
              className="bg-cian text-white px-4 py-2 rounded hover:bg-azul"
              disabled={loading}
            >
              {mode === "create" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
