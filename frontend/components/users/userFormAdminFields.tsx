import React from "react";
import { ROLES } from "../../constants/roles"
import { User } from "../../interface/user";
import { Group } from "../../interface/group";
import { Settings, User as UserIcon, Crown, UserCog, Users, RefreshCw, CheckCircle2, XCircle, Loader2, Minus, GraduationCap, Lock, Lightbulb } from "lucide-react";

export interface UserFormAdminFieldsProps {
  newUser: User;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  groups: Array<Group>;
  groupsLoading: boolean;
  mode: "create" | "edit";
  onResetPassword?: () => void;
  isResettingPassword?: boolean;
}
export default function UserFormAdminFields({
  newUser,
  handleInputChange,
  groups,
  groupsLoading,
  mode,
  onResetPassword,
  isResettingPassword
}: UserFormAdminFieldsProps) {
  return (
    <fieldset className="border-2 border-warning/30 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-white to-warning/5">
      <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
        <Settings className="mr-2 text-warning" size={18} />
        Datos Administrativos
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <UserIcon className="mr-2 text-primary" size={16} />
            Rol del Usuario
          </label>
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-azul-cielo/50
              bg-white text-azul-oscuro cursor-pointer appearance-none
            "
            required
          >
            {Object.entries(ROLES).map(([key, value]) => (
              <option key={value} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <RefreshCw className="mr-2 text-primary" size={16} />
            Estado
          </label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-azul-cielo/50
              bg-white text-azul-oscuro cursor-pointer appearance-none
            "
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <Users className="mr-2 text-primary" size={16} />
            Grupo/Ficha
          </label>
          <select
            name="groupId"
            value={newUser.groupId ?? ""}
            onChange={handleInputChange}
            className="
              w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              transition-all duration-300 hover:border-azul-cielo/50
              bg-white text-azul-oscuro cursor-pointer appearance-none
            "
          >
            {groupsLoading ? (
              <option value="">Cargando grupos...</option>
            ) : groups.length === 0 ? (
              <option value="">Sin grupos disponibles</option>
            ) : (
              <option value="">Sin grupo / No asignado</option>
            )}
            {groups.map((group) => (
              <option key={group.id} value={Number(group.id)}>
                {group.fichaNumber} - {group.programName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
            <Lock className="mr-2 text-primary" size={16} />
            Contraseña
          </label>
          {mode === "create" ? (
            <>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Ingresa una contraseña segura..."
                className="
                  w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
                  transition-all duration-300 hover:border-azul-cielo/50
                  bg-white text-azul-oscuro placeholder-azul-marino/50
                "
              />
              <p className="text-xs text-azul-marino/60 mt-1 flex items-center gap-1">
                <Lightbulb size={12} className="text-warning" />
                Por defecto será el número de documento si se deja vacío.
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onResetPassword}
                disabled={isResettingPassword}
                className="
                  flex items-center justify-center gap-2 px-4 py-3 
                  bg-gradient-to-r from-warning/80 to-warning text-azul-oscuro 
                  font-bold rounded-lg border border-warning/30 
                  hover:shadow-md transition-all duration-300 
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isResettingPassword ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <RefreshCw size={18} />
                )}
                <span>Reestablecer Contraseña</span>
              </button>
              <p className="text-xs text-azul-marino/60">
                La nueva contraseña será el número de documento del usuario. Se le notificará por correo.
              </p>
            </div>
          )}
        </div>
      </div>
    </fieldset>
  );
}
