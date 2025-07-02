import React from "react";
import { UserFormAdminFieldsProps } from "../../interface/index";
import { ROLES } from "../constants/roles";

export default function UserFormAdminFields({ newUser, handleInputChange, groups, groupsLoading }: UserFormAdminFieldsProps) {
  return (
    <fieldset className="border-2 border-warning/30 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-white to-warning/5">
      <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
        <span className="mr-2">⚙️</span>
        Datos Administrativos
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <span className="mr-2">👤</span>
            Rol del Usuario
          </label>
          <select 
            name="role" 
            value={newUser.role} 
            onChange={handleInputChange} 
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-primary/50
              bg-white text-azul-oscuro cursor-pointer
            "
            required
          >
            {Object.entries(ROLES).map(([key, value]) => (
              <option key={value} value={value}>
                {key === 'ADMIN' ? '👑' : key === 'INSTRUCTOR' ? '👨‍🏫' : '👥'} {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <span className="mr-2">🔄</span>
            Estado
          </label>
          <select 
            name="status" 
            value={newUser.status} 
            onChange={handleInputChange} 
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-primary/50
              bg-white text-azul-oscuro cursor-pointer
            "
            required
          >
            <option value="activo">✅ Activo</option>
            <option value="inactivo">❌ Inactivo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <span className="mr-2">👥</span>
            Grupo/Ficha
          </label>
          <select 
            name="groupId" 
            value={newUser.groupId ?? ""} 
            onChange={handleInputChange} 
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-primary/50
              bg-white text-azul-oscuro cursor-pointer
            "
          >
            {groupsLoading ? (
              <option value="">⏳ Cargando grupos...</option>
            ) : groups.length === 0 ? (
              <option value="">❌ Sin grupos disponibles</option>
            ) : (
              <option value="">➖ Sin grupo / No asignado</option>
            )}
            {groups.map((group) => (
              <option key={group.id} value={Number(group.id)}>
                🎓 {group.fichaNumber} - {group.programName}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <span className="mr-2">🔒</span>
            Contraseña
          </label>
          <input 
            type="password" 
            name="password" 
            value={newUser.password} 
            onChange={handleInputChange} 
            placeholder="Ingresa una contraseña segura..."
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-primary/50
              bg-white text-azul-oscuro placeholder-azul-marino/50
            "
          />
          <p className="text-xs text-azul-marino/60 mt-1">
            💡 Deja vacío para mantener la contraseña actual (solo en edición)
          </p>
        </div>
      </div>
    </fieldset>
  );
}