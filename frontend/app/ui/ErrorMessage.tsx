import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // Función opcional para reintentar la acción
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-md" role="alert">
      <strong className="font-bold">¡Error!</strong>
      <span className="block sm:inline ml-2">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 sm:mt-0 sm:ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;