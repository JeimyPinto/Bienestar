import { useAuth } from "../../hooks/useAuth";
import { getCurrentTimeGreeting, getDayOfMonth, getAbbreviatedMonth } from "../../../helpers/timeHelpers";
import { getRoleDisplay } from "../../../helpers/roleHelpers";

export default function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) return null;

  const roleInfo = getRoleDisplay(user.role);
  const greeting = getCurrentTimeGreeting();
  const dayOfMonth = getDayOfMonth();
  const month = getAbbreviatedMonth();

  return (
    <div className={`bg-gradient-to-r ${roleInfo.gradient} rounded-2xl p-6 mb-6 text-white shadow-xl border border-white/20 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}>
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
            <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-soft"></span>
            Sistema activo y funcionando
          </div>
        </div>
        
        <div className="hidden sm:block">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300">
            <div className="text-2xl font-bold mb-1">
              {dayOfMonth}
            </div>
            <div className="text-sm opacity-90">
              {month}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
