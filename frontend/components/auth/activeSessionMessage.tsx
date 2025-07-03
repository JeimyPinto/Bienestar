import { useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/AuthContext";

type ActiveSessionMessageProps = {
  onLogout: () => void;
};

export default function ActiveSessionMessage({ onLogout }: ActiveSessionMessageProps) {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-success/30 mt-4 animate-fade-in-up">
      <div className="flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
        <span className="text-3xl">✅</span>
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-azul-oscuro drop-shadow-lg">
        ¡Sesión Activa!
      </h1>
      
      {user && (
        <p className="text-lg font-medium text-azul-marino text-center mb-2">
          Bienvenido, <span className="text-primary font-bold">{user.firstName} {user.lastName}</span>
        </p>
      )}
      
      <p className="text-sm sm:text-base text-azul-marino/70 text-center mb-6 leading-relaxed">
        Tu sesión está activa. Puedes acceder al dashboard o cerrar sesión si deseas cambiar de cuenta.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          className="px-6 py-3 bg-gradient-to-r from-primary to-azul-cielo text-white rounded-lg font-semibold hover:from-azul-cielo hover:to-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          onClick={handleGoToDashboard}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>🏠</span>
            <span>Ir al Dashboard</span>
          </div>
        </button>
        
        <button
          className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-semibold hover:from-gray-200 hover:to-gray-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
          onClick={onLogout}
        >
          <div className="flex items-center justify-center space-x-2">
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </div>
        </button>
      </div>
      
      {/* Información adicional */}
      <div className="mt-4 p-3 bg-azul-cielo/10 rounded-lg border border-azul-cielo/30 w-full">
        <p className="text-xs text-azul-marino/70 text-center flex items-center justify-center gap-2">
          <span className="text-sm">💡</span>
          <span>Tip: Si necesitas cambiar de cuenta, cierra sesión primero</span>
        </p>
      </div>
    </div>
  );
}
