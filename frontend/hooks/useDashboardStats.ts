"use client";

import { useMemo } from "react";
import { useServices } from "./useServices";
import { useRequests } from "./useRequests";
import { ROLES } from "../constants/roles";
import { DashboardStat, getDashboardStats } from "../constants/dashboardStats";

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
    mode: isAdmin ? 'userServices' : 'all',
    onError: () => {}
  });

  // Obtener solicitudes del usuario
  const { requests } = useRequests({
    token,
    userId,
    mode: 'byUserId',
    onError: () => {}
  });

  // Calcular estadísticas usando la función reutilizable
  const stats = useMemo((): DashboardStat[] => {
    return getDashboardStats({
      requests,
      services,
      userRole
    });
  }, [requests, services, userRole]);

  return stats;
};
