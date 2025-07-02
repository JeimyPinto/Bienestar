import { useAuth } from "../../hooks/useAuth";
import { useServices } from "../../hooks/useServices";
import { useRequests } from "../../hooks/useRequests";
import { ROLES } from "../../constants/roles";

export default function QuickStats() {
  const { user, token } = useAuth();
  
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

  const isAdmin = user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN;
  const activeRequests = requests.filter(r => r.responseStatus === 'pendiente').length;
  const completedRequests = requests.filter(r => r.responseStatus === 'aprobada').length;

  const stats = [
    {
      title: "Solicitudes Pendientes",
      value: activeRequests,
      icon: "⏳",
      color: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
      description: "Requieren atención",
      href: "/requests?filter=pendiente"
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
  if (isAdmin) {
    stats.unshift({
      title: "Mis Servicios",
      value: services.length,
      icon: "🛠️",
      color: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
      description: "Servicios creados",
      href: "/services"
    });
  }

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <button
            key={index}
            onClick={() => window.location.href = stat.href}
            className="
              bg-gradient-card backdrop-blur-sm rounded-xl p-6 shadow-lg 
              border border-azul-cielo/20 hover:shadow-xl hover-lift 
              transition-all duration-300 cursor-pointer text-left w-full
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
