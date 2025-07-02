import { useAuth } from "../../hooks/useAuth";
import { getCurrentTimeGreeting, getDayOfMonth, getAbbreviatedMonth } from "../../helpers/timeHelpers";
import { getRoleDisplay } from "../../helpers/roleHelpers";

export default function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) return null;

  const roleInfo = getRoleDisplay(user.role);
  const greeting = getCurrentTimeGreeting();
  const dayOfMonth = getDayOfMonth();
  const month = getAbbreviatedMonth();

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-azul-cielo/5 to-primary/10 border border-azul-cielo/20">
      {/* Fondo decorativo con el gradiente del rol */}
      <div className={`absolute inset-0 bg-gradient-to-r ${roleInfo.gradient} opacity-5`}></div>
      
      {/* Patrón decorativo sutil */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-success/10 to-transparent rounded-full blur-xl"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            {/* Badge del rol con mejor contraste */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-4 ${roleInfo.color} bg-gradient-to-r ${roleInfo.gradient} bg-opacity-10 border border-current border-opacity-20`}>
              <span className="text-lg mr-2">{roleInfo.emoji}</span>
              <span className="text-xs font-semibold">{roleInfo.title}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-azul-oscuro mb-2">
            {greeting}, {user.firstName}!
          </h1>
          
          <p className="text-azul-marino/80 text-lg mb-3 font-medium">
            {roleInfo.description}
          </p>
          
          <div className="flex items-center text-sm text-azul-marino/70">
            <div className="flex items-center bg-success/10 px-3 py-1 rounded-full border border-success/20">
              <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-soft"></span>
              <span className="text-success font-medium">Sistema activo y funcionando</span>
            </div>
          </div>
        </div>
        
        {/* Tarjeta de fecha mejorada */}
        <div className="hidden sm:block ml-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-azul-cielo/30 hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="text-3xl font-bold text-azul-oscuro mb-1">
              {dayOfMonth}
            </div>
            <div className="text-sm text-azul-marino/70 font-medium uppercase tracking-wider">
              {month}
            </div>
            <div className="mt-2 w-8 h-0.5 bg-gradient-to-r from-primary to-azul-cielo mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
