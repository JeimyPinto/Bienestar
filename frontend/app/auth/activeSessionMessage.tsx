interface ActiveSessionMessageProps {
  onLogout: () => void;
}

export default function ActiveSessionMessage({ onLogout }: ActiveSessionMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white/90 rounded-lg p-4 sm:p-6 shadow-md mt-4">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
        Ya tienes una sesión iniciada
      </h1>
      <p className="text-base sm:text-lg text-gray-700 text-center mb-4">
        Debes cerrar sesión antes de iniciar con otra cuenta.
      </p>
      <button
        className="mt-2 px-6 py-3 bg-magenta text-white rounded-lg font-semibold hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition w-full sm:w-auto"
        onClick={onLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
