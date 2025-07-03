import { getCurrentTimeGreeting, getDayOfMonth, getAbbreviatedMonth } from "../../helpers/timeHelpers";
import { getRoleDisplay } from "../../helpers/roleHelpers";
import { useAuthContext } from "../../contexts/AuthContext";

export default function WelcomeBanner() {
  const { user } = useAuthContext();

  if (!user) return null;

  const roleInfo = getRoleDisplay(user.role);
  const greeting = getCurrentTimeGreeting();
  const dayOfMonth = getDayOfMonth();
  const month = getAbbreviatedMonth();

  return (
    <div className={`group relative overflow-hidden rounded-2xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r ${roleInfo.gradient}`}>
      {/* Overlay glassmorphism para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xs"></div>
      
      {/* Overlay adicional para texto */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            {/* Badge del rol con glassmorphism */}
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mr-4 bg-white/25 backdrop-blur-sm border border-white/30 text-white shadow-lg hover:bg-white/35 transition-all duration-300">
              <span className="text-lg mr-2">{roleInfo.emoji}</span>
              <span className="text-sm font-bold">{roleInfo.title}</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {greeting}, {user.firstName}!
          </h1>
          
          <p className="text-white/90 text-lg mb-3 font-medium drop-shadow-md">
            {roleInfo.description}
          </p>
          
          <div className="flex items-center text-sm">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shadow-lg">
              <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-soft shadow-lg"></span>
              <span className="text-white font-medium">Sistema activo y funcionando</span>
            </div>
          </div>
        </div>
        
        {/* Tarjeta de fecha con glassmorphism */}
        <div className="hidden sm:block ml-6">
          <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:bg-white/35 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
              {dayOfMonth}
            </div>
            <div className="text-sm text-white/90 font-medium uppercase tracking-wider drop-shadow-md">
              {month}
            </div>
            <div className="mt-3 w-8 h-0.5 bg-white/60 mx-auto rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Efecto de brillo sutil en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-0 hover:opacity-100"></div>
    </div>
  );
}
