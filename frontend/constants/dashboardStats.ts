import { Request } from "../interface/request";
import { Service } from "../interface/service";
import { ROLES } from "./roles";

export interface DashboardStat {
  title: string;
  value: number;
  icon: string;
  color: string;
  description: string;
  href: string;
}

export interface StatParams {
  requests: Request[];
  services: Service[];
  userRole: string;
}

export const getDashboardStats = ({ requests, services, userRole }: StatParams): DashboardStat[] => {
  const activeRequests = requests.filter((r: Request) => r.status === true).length;
  const completedRequests = requests.filter((r: Request) => r.status === false).length;
  
  const baseStats: DashboardStat[] = [
    {
      title: "Solicitudes Pendientes",
      value: activeRequests,
      icon: "⏳",
      color: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
      description: "Requieren atención",
      href: "/requests"
    },
    {
      title: "Solicitudes Aprobadas",
      value: completedRequests,
      icon: "✅",
      color: "bg-success/10 text-success border-success/20 hover:bg-success/20",
      description: "Finalizadas exitosamente",
      href: "/requests?filter=completada"
    }
  ];

  // Agregar estadística de servicios solo para admins
  const isAdmin = userRole === ROLES.ADMIN || userRole === ROLES.SUPERADMIN;
  
  if (isAdmin) {
    baseStats.unshift({
      title: "Mis Servicios",
      value: services.length,
      icon: "🛠️",
      color: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
      description: "Servicios creados",
      href: "/services"
    });
  }

  return baseStats;
};

// Constantes para colores de estadísticas
export const STAT_COLORS = {
  PRIMARY: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
  SUCCESS: "bg-success/10 text-success border-success/20 hover:bg-success/20",
  WARNING: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
  DANGER: "bg-danger/10 text-danger border-danger/20 hover:bg-danger/20",
  INFO: "bg-info/10 text-info border-info/20 hover:bg-info/20"
} as const;

// Iconos comunes para estadísticas
export const STAT_ICONS = {
  PENDING: "⏳",
  COMPLETED: "✅",
  SERVICES: "🛠️",
  USERS: "👥",
  GROUPS: "📋",
  REQUESTS: "📄",
  NOTIFICATIONS: "🔔",
  REPORTS: "📊"
} as const;
