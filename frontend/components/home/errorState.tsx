import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-danger text-8xl mb-6 animate-pulse-soft">⚠️</div>
      <h3 className="text-danger text-3xl font-bold mb-4">¡Oops! Algo salió mal</h3>
      <p className="text-danger/80 text-lg mb-8 text-center max-w-md leading-relaxed">{message}</p>
      <button
        onClick={onRetry}
        className="
          px-8 py-4 bg-gradient-to-r from-primary to-azul-cielo 
          hover:from-azul-cielo hover:to-primary
          text-white rounded-xl font-bold text-lg
          transition-all duration-300 
          hover:scale-105 hover:shadow-xl
          border border-primary/30 hover:border-azul-cielo/50
          flex items-center space-x-3
          focus-visible-custom
        "
      >
        <span className="text-xl">🔄</span>
        <span>Reintentar</span>
      </button>
    </div>
  );
}
