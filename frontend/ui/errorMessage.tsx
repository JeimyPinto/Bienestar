import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-2"
      role="alert"
      aria-live="assertive"
    >
      <strong className="font-bold">¡Error!</strong>{""}
      <span className="block sm:inline ml-2">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 sm:mt-0 sm:ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition duration-300 font-semibold"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}