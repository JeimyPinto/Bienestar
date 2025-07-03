import {useAuthContext} from "../../contexts/AuthContext";
import { useServices } from "../../hooks/useServices";
import { useRequests } from "../../hooks/useRequests";
import { ROLES } from "../../constants/roles";
import { getDashboardStats } from "../../constants/dashboardStats";

export default function QuickStats() {
  const { user, token } = useAuthContext();
  
  const { services } = useServices({
    token,
    userId: user?.id,
    mode: 'userServices',
    onError: () => {}
  });

  const { requests } = useRequests({
    token,
    userId: user?.id,
    onError: () => {}
  });

  // Solo mostrar para usuarios con permisos
  if (!user || user.role === ROLES.USER) {
    return null;
  }

  // Obtener estadísticas usando la función centralizada
  const stats = getDashboardStats({
    requests,
    services,
    userRole: user.role
  });

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => window.location.href = stat.href}
            className="
              bg-gradient-card backdrop-blur-sm rounded-xl p-6 shadow-lg 
              border border-azul-cielo/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 
              cursor-pointer text-left w-full
              focus:outline-none focus:ring-4 focus:ring-azul-cielo/30
              group
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-azul-marino/80 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-azul-oscuro">{stat.value}</p>
                <p className="text-xs text-azul-marino/60 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} rounded-full p-3 text-2xl border transition-all duration-300 group-hover:scale-110`}>
                {stat.icon}
              </div>
            </div>
            
            {/* Indicador de navegación */}
            <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
              <span className="text-xs text-azul-marino/70 mr-1">Ver detalles</span>
              <svg className="w-4 h-4 text-azul-marino/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
