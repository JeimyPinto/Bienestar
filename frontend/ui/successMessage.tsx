import React, { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, duration = 5000, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;
  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-[100]" role="alert">
      <strong className="font-bold">¡Éxito!</strong>{" "}
      <span className="block sm:inline ml-2">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300"
        >
          Cerrar
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
