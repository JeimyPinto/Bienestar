type ActiveSessionMessageProps = {
  onLogout: () => void;
};

export default function ActiveSessionMessage({ onLogout }: ActiveSessionMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-warning/30 mt-4 animate-fade-in-up">
      <div className="flex items-center justify-center w-16 h-16 bg-warning/20 rounded-full mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 text-center text-azul-oscuro drop-shadow-lg">
        Ya tienes una sesión iniciada
      </h1>
      
      <p className="text-base sm:text-lg text-azul-marino text-center mb-6 leading-relaxed">
        Debes cerrar sesión antes de iniciar con otra cuenta.
      </p>
      
      <button
        className="mt-2 px-6 py-3 bg-gradient-to-r from-danger to-coral text-white rounded-lg font-semibold hover:from-coral hover:to-danger focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        onClick={onLogout}
      >
        <div className="flex items-center justify-center space-x-2">
          <span>🚪</span>
          <span>Cerrar sesión</span>
        </div>
      </button>
    </div>
  );
}
