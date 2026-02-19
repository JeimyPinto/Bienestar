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

interface UseDashboardStatsReturn {
  stats: DashboardStat[];
  loading: boolean;
  refresh: () => void;
}

export const useDashboardStats = ({ token, userId, userRole }: UseDashboardStatsParams): UseDashboardStatsReturn => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => setRefreshTrigger(prev => prev + 1);

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
  }, [token, userId, userRole, refreshTrigger]);

  return {
    stats: stats.length > 0 || !loading ? stats : getDashboardStats({ requests: [], services: [], userRole }),
    loading,
    refresh
  };
};
