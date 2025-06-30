import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../lib/roles";

export default function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) return null;

  const getCurrentTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case ROLES.SUPERADMIN:
        return { title: "Superadministrador", emoji: "👑", gradient: "from-magenta to-coral" };
      case ROLES.ADMIN:
        return { title: "Administrador", emoji: "⚡", gradient: "from-primary to-azul-cielo" };
      case ROLES.INSTRUCTOR:
        return { title: "Instructor", emoji: "🎓", gradient: "from-success to-verde-bosque" };
      default:
        return { title: "Usuario", emoji: "👤", gradient: "from-neutral to-azul-marino" };
    }
  };

  const roleInfo = getRoleDisplay(user.role);
  const greeting = getCurrentTimeGreeting();

  return (
    <div className={`bg-gradient-to-r ${roleInfo.gradient} rounded-2xl p-6 mb-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{roleInfo.emoji}</span>
            <h1 className="text-2xl font-bold">
              {greeting}, {user.firstName}!
            </h1>
          </div>
          <p className="text-white/90 mb-1">
            Bienvenido al panel de {roleInfo.title.toLowerCase()}
          </p>
          <div className="flex items-center text-sm text-white/80">
            <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
            Sistema activo y funcionando
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">
              {new Date().toLocaleDateString('es-ES', { day: '2-digit' })}
            </div>
            <div className="text-sm opacity-90">
              {new Date().toLocaleDateString('es-ES', { month: 'short' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
