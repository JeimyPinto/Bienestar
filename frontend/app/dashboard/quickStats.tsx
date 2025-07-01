import { useAuth } from "../hooks/useAuth";
import { useServices } from "../hooks/useServices";
import { useRequests } from "../hooks/useRequests";
import { ROLES } from "../lib/roles";

export default function QuickStats() {
  const { user, token } = useAuth();
  
  const { services } = useServices({
    token,
    userId: user?.id,
    mode: 'userServices',
    onError: () => {} // Silent error handling for stats
  });

  const { requests } = useRequests({
    token,
    userId: user?.id,
    onError: () => {} // Silent error handling for stats
  });

  // Solo mostrar para usuarios con permisos
  if (!user || user.role === ROLES.USER) {
    return null;
  }

  const isAdmin = user.role === ROLES.ADMIN || user.role === ROLES.SUPERADMIN;
  const activeRequests = requests.filter(r => r.responseStatus === 'pendiente').length;
  const completedRequests = requests.filter(r => r.responseStatus === 'completada').length;

  const stats = [
    {
      title: "Solicitudes Pendientes",
      value: activeRequests,
      icon: "⏳",
      color: "bg-warning/10 text-warning border-warning/20",
      description: "Requieren atención"
    },
    {
      title: "Solicitudes Completadas",
      value: completedRequests,
      icon: "✅",
      color: "bg-success/10 text-success border-success/20",
      description: "Finalizadas exitosamente"
    }
  ];

  // Agregar estadística de servicios solo para admins
  if (isAdmin) {
    stats.unshift({
      title: "Mis Servicios",
      value: services.length,
      icon: "🛠️",
      color: "bg-primary/10 text-primary border-primary/20",
      description: "Servicios creados"
    });
  }

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-card backdrop-blur-sm rounded-xl p-6 shadow-lg border border-azul-cielo/20 hover:shadow-xl hover-lift transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-azul-marino/80 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-azul-oscuro">{stat.value}</p>
                <p className="text-xs text-azul-marino/60 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} rounded-full p-3 text-2xl border`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
