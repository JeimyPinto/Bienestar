import { useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";

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
    <div className="flex flex-col items-center justify-center w-full max-w-xl glass-card rounded-2xl p-6 sm:p-10 border-success/30 mt-6 animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-success/20 rounded-full blur-xl animate-pulse-soft"></div>
        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full border border-success/30 shadow-inner">
          <span className="text-4xl">✨</span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 text-center text-azul-oscuro leading-tight">
        ¡Sesión Activa!
      </h1>

      {user && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-azul-oscuro/5 rounded-full mb-6">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
          <p className="text-base font-medium text-azul-marino">
            Conectado como <span className="text-primary font-bold">{user.firstName} {user.lastName}</span>
          </p>
        </div>
      )}

      <p className="text-base sm:text-lg text-azul-marino/60 text-center mb-10 leading-relaxed max-w-sm">
        Ya te encuentras autenticado en el sistema. ¿Qué deseas hacer a continuación?
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          className="btn-primary flex items-center justify-center gap-3 group"
          onClick={handleGoToDashboard}
        >
          <span className="text-xl group-hover:scale-125 transition-transform">🏠</span>
          <span>Ir al Dashboard</span>
        </button>

        <button
          className="px-8 py-3 bg-white/50 hover:bg-white text-azul-marino/70 hover:text-danger rounded-2xl font-semibold border border-azul-marino/10 hover:border-danger/30 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-center gap-3 group"
          onClick={onLogout}
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Información adicional */}
      <div className="mt-10 p-4 bg-primary/5 rounded-2xl border border-primary/10 w-full group overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-primary/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
        <p className="text-sm text-azul-marino/60 text-center flex items-center justify-center gap-3 relative">
          <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm text-xs">💡</span>
          <span>Si necesitas cambiar de cuenta, recuerda cerrar tu sesión actual.</span>
        </p>
      </div>
    </div>
  );
}
