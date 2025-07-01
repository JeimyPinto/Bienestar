import { useEffect, useState } from "react";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import { RequestHistoryProps } from "../types/request"
import RequestHistoryTable from "./requestHistoryTable";
import RequestHistoryCard from "./requestHistoryCard";

export default function RequestHistory({
  requests,
  loading,
  errorMessage,
  successMessage,
  onCreateRequest,
}: RequestHistoryProps) {
  const [showSuccess, setShowSuccess] = useState(!!successMessage);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si la vista es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al cargar
    checkIfMobile();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Mostrar mensaje de éxito si existe
  useEffect(() => {
    setShowSuccess(!!successMessage);
  }, [successMessage]);

  return (
    <section className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 overflow-x-auto sm:max-w-[1400px] sm:mx-auto">      
      {showSuccess && successMessage && (
        <div className="mb-4">
          <SuccessMessage 
            message={successMessage} 
            duration={5000} 
            onClose={() => setShowSuccess(false)} 
          />
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-4">
          <ErrorMessage message={errorMessage} />
        </div>
      )}

      {/* Mensaje informativo cuando no hay solicitudes */}
      {!loading && !errorMessage && requests.length === 0 && (
        <div className="bg-azul-cielo/10 border border-azul-cielo/30 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-6xl mb-4 opacity-60">📋</span>
            <h3 className="text-xl font-semibold text-azul-oscuro mb-2">
              No tienes solicitudes aún
            </h3>
            <p className="text-azul-marino/70 mb-6 max-w-md">
              Cuando crees tu primera solicitud de remisión, aparecerá aquí. 
              Puedes empezar haciendo clic en &quot;Nueva Solicitud&quot;.
            </p>
            <button
              onClick={onCreateRequest}
              className="
                bg-primary hover:bg-azul-cielo text-white 
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                hover:shadow-lg hover:scale-105 flex items-center space-x-2
              "
            >
              <span>🚀</span>
              <span>Crear mi primera solicitud</span>
            </button>
          </div>
        </div>
      )}

      {/* Mostrar tabla/cards solo si hay solicitudes o está cargando */}
      {(loading || requests.length > 0) && (
        <>
          {isMobile ? (
            <RequestHistoryCard requests={requests} loading={loading} />
          ) : (
            <RequestHistoryTable requests={requests} loading={loading} />
          )}
        </>
      )}
    </section>
  );
}