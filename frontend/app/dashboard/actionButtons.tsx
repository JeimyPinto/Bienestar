import { useRouter } from "next/navigation";
import { ROLES } from "../lib/roles";
import { ActionButtonsProps,ActionCard } from "../types/components";

export default function ActionButtons({ user }: ActionButtonsProps) {
  const router = useRouter();

  if (!user) return null;

  const actionCards: ActionCard[] = [
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

  const availableCards = actionCards.filter(card =>
    card.requiredRoles.includes(user.role)
  );

  return (
    <section className="bg-gradient-card backdrop-blur-sm shadow-xl rounded-2xl p-6 mt-6 border border-azul-cielo/20 hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-azul-oscuro mb-2">Panel de Administración</h2>
        <p className="text-azul-marino/80">Accede a las herramientas de gestión disponibles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {availableCards.map((card) => (
          <div
            key={card.path}
            onClick={() => router.push(card.path)}
            className={`
              ${card.bgColor} ${card.hoverColor}
              text-white rounded-xl p-6 cursor-pointer
              transform transition-all duration-300
              hover:scale-105 hover:shadow-xl hover-lift
              focus:outline-none focus:ring-4 focus:ring-primary/50
              group relative overflow-hidden
              border border-white/20 backdrop-blur-sm
            `}
            role="button"
            tabIndex={0}
            aria-label={`Ir a ${card.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push(card.path);
              }
            }}
          >
            {/* Efecto de brillo sutil */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>

            <div className="relative z-10">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">{card.description}</p>
            </div>

            {/* Indicador de flecha */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Información de rol */}
      <div className="mt-6 pt-4 border-t border-azul-cielo/30">
        <div className="flex items-center text-sm text-azul-marino/80">
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
          <span>Conectado como: <span className="font-medium text-azul-oscuro">{user.role}</span></span>
        </div>
      </div>
    </section>
  );
}
