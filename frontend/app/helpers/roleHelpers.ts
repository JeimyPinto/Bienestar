import { ROLES } from "../lib/roles";
import { RoleDisplayConfig } from "../types/components"


/**
 * Obtiene la configuración visual para un rol específico
 * @param role - Rol del usuario
 * @returns RoleDisplayConfig - Configuración visual del rol
 */
export const getRoleDisplay = (role: string): RoleDisplayConfig => {
    switch (role) {
        case ROLES.SUPERADMIN:
            return {
                title: "Superadministrador",
                emoji: "👑",
                gradient: "from-magenta to-coral",
                color: "text-magenta",
                description: "Control total del sistema"
            };
        case ROLES.ADMIN:
            return {
                title: "Administrador",
                emoji: "⚡",
                gradient: "from-primary to-azul-cielo",
                color: "text-primary",
                description: "Gestión completa de la plataforma"
            };
        case ROLES.INSTRUCTOR:
            return {
                title: "Instructor",
                emoji: "🎓",
                gradient: "from-success to-verde-bosque",
                color: "text-success",
                description: "Educador y guía de aprendices"
            };
        default:
            return {
                title: "Usuario",
                emoji: "👤",
                gradient: "from-secondary to-azul-marino",
                color: "text-secondary",
                description: "Aprendiz del sistema"
            };
    }
};

/**
 * Verifica si un rol tiene permisos administrativos
 * @param role - Rol a verificar
 * @returns boolean - True si es admin o superadmin
 */
export const hasAdminPermissions = (role: string): boolean => {
    return role === ROLES.ADMIN || role === ROLES.SUPERADMIN;
};

/**
 * Verifica si un rol tiene permisos de instructor o superior
 * @param role - Rol a verificar
 * @returns boolean - True si es instructor, admin o superadmin
 */
export const hasInstructorPermissions = (role: string): boolean => {
    return role === ROLES.INSTRUCTOR || hasAdminPermissions(role);
};

/**
 * Obtiene todos los roles disponibles con su configuración
 * @returns Array<{role: string, config: RoleDisplayConfig}> - Lista de roles con configuración
 */
export const getAllRolesWithConfig = () => {
    return [
        { role: ROLES.SUPERADMIN, config: getRoleDisplay(ROLES.SUPERADMIN) },
        { role: ROLES.ADMIN, config: getRoleDisplay(ROLES.ADMIN) },
        { role: ROLES.INSTRUCTOR, config: getRoleDisplay(ROLES.INSTRUCTOR) },
        { role: ROLES.USER, config: getRoleDisplay(ROLES.USER) }
    ];
};
