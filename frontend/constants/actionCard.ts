import { ROLES } from "./roles";

export interface ActionCard {
  title: string;
  description: string;
  path: string;
  icon: string;
  bgColor: string;
  hoverColor: string;
  requiredRoles: string[];
}

/**
 * Configuración de las tarjetas de acción del dashboard administrativo
 * Cada tarjeta define una funcionalidad específica del sistema con sus permisos correspondientes
 */
export const ACTION_CARDS: ActionCard[] = [
  {
    title: "Usuarios",
    description: "Gestionar usuarios y roles",
    path: "/users",
    icon: "Users",
    bgColor: "bg-primary",
    hoverColor: "hover:bg-azul-cielo",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Servicios",
    description: "Administrar servicios disponibles",
    path: "/services",
    icon: "Wrench",
    bgColor: "bg-success",
    hoverColor: "hover:bg-verde-bosque",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Fichas",
    description: "Gestionar fichas de formación",
    path: "/groups",
    icon: "Library",
    bgColor: "bg-secondary",
    hoverColor: "hover:bg-azul-claro",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Solicitudes",
    description: "Pendientes por validar y aprobar",
    path: "/requests",
    icon: "ClipboardList",
    bgColor: "bg-info",
    hoverColor: "hover:bg-azul-claro",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR]
  },
  {
    title: "Remisiones",
    description: "Servicios autorizados y activos",
    path: "/remissions",
    icon: "Hospital",
    bgColor: "bg-warning",
    hoverColor: "hover:bg-coral",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR]
  },
  {
    title: "Auditorías",
    description: "Historial de cambios del sistema",
    path: "/audits",
    icon: "Search",
    bgColor: "bg-danger",
    hoverColor: "hover:bg-coral",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  }
];