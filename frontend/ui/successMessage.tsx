import React, { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface SuccessMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Esperar a que pase la animación de salida
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`
        fixed top-20 right-6 z-[2000] max-w-md w-full sm:w-auto
        transform transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}
      `}
    >
      <div className="bg-white border-l-4 border-success rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 overflow-hidden relative group">
        {/* Fondo decorativo */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-125 duration-500" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
            <CheckCircle2 size={24} />
          </div>

          <div className="flex-grow">
            <h4 className="text-sm font-black text-azul-oscuro uppercase tracking-widest mb-1">¡Proceso Exitoso!</h4>
            <p className="text-sm text-azul-marino/70 font-medium">{message}</p>
          </div>

          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(), 300);
              }}
              className="p-2 hover:bg-azul-cielo/10 rounded-xl text-azul-marino/30 hover:text-azul-oscuro transition-all duration-300"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-1 bg-success/20 w-full">
          <div
            className="h-full bg-success transition-all linear"
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default SuccessMessage;
