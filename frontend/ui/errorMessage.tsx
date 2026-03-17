import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className="bg-white border-l-4 border-danger rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.1)] p-5 relative overflow-hidden animate-in fade-in slide-in-from-top-4"
      role="alert"
      aria-live="assertive"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-danger/5 rounded-full -mr-12 -mt-12" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
        <div className="flex-shrink-0 w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center text-danger">
          <AlertCircle size={24} />
        </div>

        <div className="flex-grow">
          <h4 className="text-sm font-black text-azul-oscuro uppercase tracking-widest mb-1">Ha ocurrido un error</h4>
          <p className="text-sm text-azul-marino/70 font-medium">{message}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 bg-danger text-white text-xs font-bold rounded-xl hover:bg-danger-oscuro hover:shadow-lg hover:scale-105 transition-all duration-300 uppercase tracking-widest"
          >
            <RotateCcw size={14} />
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}