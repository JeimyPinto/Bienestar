import React from "react";
import Spinner from "../../ui/spinner";
import { ROLES } from "../../constants/roles";
import { User } from "../../interface/user";
import { Service } from "../../interface/service";
import { Request } from "../../interface/request";
import { useServices } from "../../hooks/useServices";
import { useUsers } from "../../hooks/useUsers";

interface RequestApplicantFieldsProps {
  user: User | null;
  token: string | null;
  newRequest: Request;
  setNewRequest: React.Dispatch<React.SetStateAction<Request>>;
  mode: "create" | "edit";
  editApplicant?: User | null;
}

export default function RequestApplicantFields({
  user,
  token,
  newRequest,
  setNewRequest,
  mode,
  editApplicant,
}: RequestApplicantFieldsProps) {
  // Usar hook para servicios activos
  const { services, loading: loadingServices } = useServices({
    mode: "allActive",
  });

  // Usar hook para usuarios por rol (solo si el usuario actual tiene permisos)
  const { users, loading: loadingUsers } = useUsers({
    token:
      user &&
      [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.INSTRUCTOR].includes(user.role)
        ? token
        : null,
    mode: "byRole",
    role: ROLES.USER,
    onError: (error) => console.error("Error al cargar usuarios:", error),
  });

  // Determinar si el campo usuario debe ser solo lectura
  const isReadOnlyUser = mode === "edit";
  
  // Determinar si el usuario actual puede seleccionar otros usuarios
  const canSelectOtherUsers = user && [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role);
  
  return (
    <>
      {/* Usuario solicitante - Solo mostrar si puede seleccionar otros usuarios */}
      {canSelectOtherUsers ? (
        <div className="col-span-1">
          <label className="block text-sm font-medium text-azul">Usuario</label>
          {loadingUsers ? (
            <Spinner className="my-2" />
          ) : isReadOnlyUser ? (
            <input
              type="text"
              name="userId"
              value={(() => {
                if (editApplicant) {
                  return `${editApplicant.firstName} ${editApplicant.lastName}`;
                }
                const u = users.find((u) => u.id === newRequest.userId);
                return u ? `${u.firstName} ${u.lastName}` : "";
              })()}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
              data-userid={newRequest.userId}
            />
          ) : (
            <select
              name="userId"
              value={newRequest.userId || ""}
              onChange={(e) =>
                setNewRequest({ ...newRequest, userId: Number(e.target.value) })
              }
              className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
              required
            >
              <option value="">Seleccione un usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : user?.role === ROLES.USER ? (
        // Para usuarios normales, mostrar su información de forma automática (campo oculto)
        <div className="col-span-1">
          <label className="block text-sm font-medium text-azul">Solicitante</label>
          <input
            type="text"
            value={`${user.firstName} ${user.lastName}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
          />
          {/* Campo oculto para enviar el userId */}
          <input
            type="hidden"
            name="userId"
            value={user.id}
          />
        </div>
      ) : null}
      {/* Servicio */}
      <div className="col-span-1">
      <label className="block text-sm font-medium text-azul">Servicio</label>
      {loadingServices ? (
        <Spinner className="my-2" />
      ) : (
        <select
        name="serviceId"
        value={newRequest.serviceId || ""}
        onChange={(e) =>
          setNewRequest({
          ...newRequest,
          serviceId: Number(e.target.value),
          })
        }
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
        required
        >
        <option value="">Seleccione un servicio</option>
        {services.map((s: Service) => (
          <option key={s.id} value={s.id}>
          {s.name}
          </option>
        ))}
        </select>
      )}
      </div>
      {/* Creador de la solicitud (usuario logueado) - Solo visible para administradores */}
      {user && user.role !== "user" && (
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-azul">
        Creador de la Solicitud
        </label>
        <input
        type="text"
        value={`${user.firstName} ${user.lastName}`}
        readOnly
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
        />
      </div>
      )}
    </>
  );
}
