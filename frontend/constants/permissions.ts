import { ROLES } from "./roles";

// Lista de permisos granulares
export type Permission = 
  | 'create_request'           // Aprendices e Instructores
  | 'view_own_requests'        // Todos (ver solo lo que creé)
  | 'view_all_requests'       // Admins (ver todo)
  | 'delete_request'           // Admins (los instructores no pueden borrar ni sus propias solicitudes)
  | 'approve_request'          // Admins (Aprobar/Rechazar solicitudes de remisión)
  | 'view_remissions'          // Instructores y Admins (ver el resultado de la solicitud)
  | 'manage_remissions'        // Admins (Crear/Editar remisiones aceptadas)
  | 'view_stats'               // Admins y Superadmins
  | 'manage_users'             // Admins (gestión de su área)
  | 'manage_services'          // Admins (gestión del catálogo)
  | 'manage_audits'            // SOLO Superadmin
  | 'all_access';

export const PERMISSIONS: Record<string, Permission[]> = {
  [ROLES.USER]: [
    'create_request', 
    'view_own_requests'
  ],
  
  [ROLES.INSTRUCTOR]: [
    'create_request', 
    'view_own_requests', // Solo seguimiento a lo que ellos crearon
    'view_remissions'    // Para ver si su solicitud fue procesada
  ],

  [ROLES.ADMIN]: [
    'create_request',
    'view_own_requests',
    'view_all_requests',
    'delete_request',    // Pueden limpiar/gestionar solicitudes
    'approve_request',
    'manage_remissions',
    'view_remissions',
    'manage_users', 
    'manage_services', 
    'view_stats'
    // IMPORTANTE: view_audits NO está aquí por petición del usuario
  ],

  [ROLES.SUPERADMIN]: [
    'all_access',
    'manage_audits' // Crud completo de auditorías
  ],
};

/**
 * Helper para verificar si un rol tiene un permiso específico
 */
export const hasPermission = (userRole: string, permission: Permission): boolean => {
  // Superadmin siempre tiene permiso total
  if (userRole === ROLES.SUPERADMIN) return true;
  
  const userPermissions = PERMISSIONS[userRole] || [];
  return userPermissions.includes(permission);
};
