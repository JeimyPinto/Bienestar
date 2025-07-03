"use client";

import { useMemo } from "react";
import { useServices } from "./useServices";
import { useRequests } from "./useRequests";
import { ROLES } from "../constants/roles";
import { DashboardStat, STAT_COLORS, STAT_ICONS } from "../constants/dashboardStats";

interface UseDashboardStatsOptions {
  token: string | null;
  userId?: number;
  userRole: string;
}

export const useDashboardStats = ({ 
  token, 
  userId, 
  userRole 
}: UseDashboardStatsOptions): DashboardStat[] => {
  
  // Obtener servicios del usuario (solo para admins)
  const isAdmin = userRole === ROLES.ADMIN || userRole === ROLES.SUPERADMIN;
  const { services } = useServices({
    token,
    userId: isAdmin ? userId : undefined,
    mode: isAdmin ? 'userServices' : 'allActive',
    onError: () => {}
  });

  // Obtener solicitudes del usuario
  const { requests } = useRequests({
    token,
    userId,
    mode: 'byUserId',
    onError: () => {}
  });

  // Calcular estadísticas usando useMemo para optimización
  const stats = useMemo((): DashboardStat[] => {
    const pendingRequests = requests.filter(r => r.responseStatus === 'pendiente').length;
    const approvedRequests = requests.filter(r => r.responseStatus === 'aprobada').length;
    
    const baseStats: DashboardStat[] = [
      {
        title: "Solicitudes Pendientes",
        value: pendingRequests,
        icon: STAT_ICONS.PENDING,
        color: STAT_COLORS.WARNING,
        description: "Requieren atención",
        href: "/requests?filter=pendiente"
      },
      {
        title: "Solicitudes Aprobadas",
        value: approvedRequests,
        icon: STAT_ICONS.COMPLETED,
        color: STAT_COLORS.SUCCESS,
        description: "Finalizadas exitosamente",
        href: "/requests?filter=aprobada"
      }
    ];

    // Agregar estadística de servicios solo para admins
    if (isAdmin) {
      baseStats.unshift({
        title: "Mis Servicios",
        value: services.length,
        icon: STAT_ICONS.SERVICES,
        color: STAT_COLORS.PRIMARY,
        description: "Servicios creados",
        href: "/services"
      });
    }

    return baseStats;
  }, [requests, services, isAdmin]);

  return stats;
};
