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
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        Historial de Solicitudes de Remisión
      </h2>
      <button
        onClick={onCreateRequest}
        className="bg-cian text-white px-4 py-2 rounded-md hover:bg-azul transition-all duration-200 font-semibold"
      >
        Nueva Solicitud
      </button>
      </div>
      {showSuccess && successMessage && (
      <div className="mb-4">
        <SuccessMessage message={successMessage} duration={5000} onClose={() => setShowSuccess(false)} />
      </div>
      )}
      {errorMessage && (
      <div className="mb-4">
        <ErrorMessage message={errorMessage} />
      </div>
      )}
      {isMobile ? (
        <RequestHistoryCard requests={requests} loading={loading} />
      ) : (
        <RequestHistoryTable requests={requests} loading={loading} />
      )}
    </section>
  );
}