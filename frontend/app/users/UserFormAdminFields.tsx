import React from "react";
import { UserFormAdminFieldsProps } from "../types/index";
import { ROLES } from "../lib/roles";

const UserFormAdminFields = ({ newUser, handleInputChange, groups, groupsLoading }: UserFormAdminFieldsProps) => (
  <fieldset className="border border-cian rounded-lg p-4">
    <legend className="px-2 text-cian font-semibold">Datos Administrativos</legend>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-azul">Rol</label>
        <select name="role" value={newUser.role} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required>
          {Object.entries(ROLES).map(([key, value]) => (
            <option key={value} value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-azul">Estado</label>
        <select name="status" value={newUser.status} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-azul">Grupo</label>
        <select name="groupId" value={newUser.groupId ?? ""} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none">
          {groupsLoading ? (
            <option value="">Cargando grupos...</option>
          ) : groups.length === 0 ? (
            <option value="">Sin grupos disponibles</option>
          ) : (
            <option value="">Sin grupo / No asignado</option>
          )}
          {groups.map((group) => (
            <option key={group.id} value={group.id}>{group.fichaNumber} - {group.programName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-azul">Contraseña</label>
        <input type="password" name="password" value={newUser.password} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" />
      </div>
    </div>
  </fieldset>
);

export default UserFormAdminFields;
