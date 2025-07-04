import { useState, useEffect } from "react";
import { DashboardStat, getDashboardStats } from "../constants/dashboardStats";
import { getAll as getAllRequests } from "../services/request";
import { getByUserId as getServicesByUserId } from "../services/service";
import { Request } from "../interface/request";
import { Service } from "../interface/service";

interface UseDashboardStatsParams {
  token?: string;
  userId?: number;
  userRole: string;
}

export const useDashboardStats = ({ token, userId, userRole }: UseDashboardStatsParams): DashboardStat[] => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userId) {
        setStats([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Obtener solicitudes y servicios en paralelo
        const [requestsResponse, servicesResponse] = await Promise.all([
          getAllRequests(token),
          getServicesByUserId(userId, token)
        ]);

        const requests: Request[] = requestsResponse?.error ? [] : (requestsResponse.requests || []);
        const services: Service[] = servicesResponse?.error ? [] : (servicesResponse.services || []);

        // Calcular estadísticas usando la función centralizada
        const dashboardStats = getDashboardStats({
          requests,
          services,
          userRole
        });

        setStats(dashboardStats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // En caso de error, mostrar estadísticas vacías
        setStats(getDashboardStats({
          requests: [],
          services: [],
          userRole
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId, userRole]);

  // Si está cargando, devolver estadísticas con valores 0
  if (loading) {
    return getDashboardStats({
      requests: [],
      services: [],
      userRole
    });
  }

  return stats;
};
