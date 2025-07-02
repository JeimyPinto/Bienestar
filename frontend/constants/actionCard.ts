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
    description: "Gestionar usuarios del sistema",
    path: "/users",
    icon: "👥",
    bgColor: "bg-primary",
    hoverColor: "hover:bg-azul-cielo",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Servicios",
    description: "Administrar servicios disponibles",
    path: "/services",
    icon: "🛠️",
    bgColor: "bg-success",
    hoverColor: "hover:bg-verde-bosque",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Fichas",
    description: "Gestionar fichas de formación",
    path: "/groups",
    icon: "📚",
    bgColor: "bg-secondary",
    hoverColor: "hover:bg-azul-claro",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Remisiones",
    description: "Administrar remisiones",
    path: "/remissions",
    icon: "📋",
    bgColor: "bg-warning",
    hoverColor: "hover:bg-coral",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN]
  },
  {
    title: "Solicitudes",
    description: "Gestionar solicitudes de remisión",
    path: "/requests",
    icon: "📝",
    bgColor: "bg-info",
    hoverColor: "hover:bg-azul-claro",
    requiredRoles: [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR]
  },
  {
    title: "Auditorías",
    description: "Registro de actividades del sistema",
    path: "/audits",
    icon: "🔍",
    bgColor: "bg-danger",
    hoverColor: "hover:bg-coral",
    requiredRoles: [ROLES.SUPERADMIN]
  }
];