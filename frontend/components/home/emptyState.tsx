import React from 'react';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
  showTip?: boolean;
}

export default function EmptyState({ 
  title = "No hay servicios disponibles",
  message = "Actualmente no hay servicios activos para mostrar. Vuelve más tarde para descubrir nuevas opciones.",
  icon = "📭",
  showTip = true
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-azul-cielo text-8xl mb-6 animate-pulse-soft">{icon}</div>
      <h3 className="text-azul-oscuro text-3xl font-bold mb-4">{title}</h3>
      <p className="text-azul-marino/80 text-lg text-center max-w-md leading-relaxed">
        {message}
      </p>
      {showTip && (
        <div className="mt-8 bg-info/10 border border-info/20 rounded-xl p-6">
          <p className="text-info text-sm flex items-center">
            <span className="mr-2">💡</span>
            Mientras tanto, puedes contactarnos directamente para obtener información
          </p>
        </div>
      )}
    </div>
  );
}
