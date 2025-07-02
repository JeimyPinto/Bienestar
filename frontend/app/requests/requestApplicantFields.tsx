import React, { useEffect, useState } from "react";
import { RequestApplicantFieldsProps } from "../../interface/request";
import Spinner from "../../ui/spinner";
import { ROLES } from "../constants/roles";
import { getAllActive as getAllServices } from "../../services/service";
import { getAllByRole as getAllUsers } from "../../services/user";
import { ROLES as ROLES_CONST } from "../constants/roles";
import { User, Service } from "../../interface";

const RequestApplicantFields: React.FC<RequestApplicantFieldsProps> = ({
  user,
  token,
  newRequest,
  setNewRequest,
  mode,
  editApplicant,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    if (!token) return;
    if (user && [ROLES_CONST.SUPERADMIN, ROLES_CONST.ADMIN, ROLES_CONST.INSTRUCTOR].includes(user.role)) {
      setLoadingUsers(true);
      getAllUsers(ROLES_CONST.USER, token)
        .then(data => setUsers(data.users || []))
        .finally(() => setLoadingUsers(false));
    }
    setLoadingServices(true);
    getAllServices()
      .then(data => setServices(data.services || []))
      .finally(() => setLoadingServices(false));
  }, [token, user]);

  // Determinar si el campo usuario debe ser solo lectura
  const isReadOnlyUser = mode === "edit";
  return (
    <>
      {/* Usuario solicitante */}
      {[ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user?.role || "") ? (
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
                const u = users.find(u => u.id === newRequest.userId);
                return u ? `${u.firstName} ${u.lastName}` : "";
              })()}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
              data-userid={newRequest.userId}
            />
          ) : (
            <select
              name="userId"
              value={newRequest.userId}
              onChange={e => setNewRequest({ ...newRequest, userId: Number(e.target.value) })}
              className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
              required
            >
              <option value="">Seleccione un usuario</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </select>
          )}
        </div>
      ) : (
        <div className="col-span-1">
          <label className="block text-sm font-medium text-azul">Usuario</label>
          <input
            type="text"
            name="userId"
            value={(() => {
              if (editApplicant) {
                return `${editApplicant.firstName} ${editApplicant.lastName}`;
              }
              const u = users.find(u => u.id === newRequest.userId) || user;
              return u ? `${u.firstName} ${u.lastName}` : "";
            })()}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
            data-userid={newRequest.userId || user?.id}
          />
        </div>
      )}
      {/* Servicio */}
      <div className="col-span-1">
        <label className="block text-sm font-medium text-azul">Servicio</label>
        {loadingServices ? (
          <Spinner className="my-2" />
        ) : (
          <select
            name="serviceId"
            value={newRequest.serviceId || ""}
            onChange={e => setNewRequest({ ...newRequest, serviceId: Number(e.target.value) })}
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
            required
          >
            <option value="">Seleccione un servicio</option>
            {services.map(s => (
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
          <label className="block text-sm font-medium text-azul">Creador de la Solicitud</label>
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
};

export default RequestApplicantFields;
