import React from 'react';
import Spinner from '../../ui/spinner';

export interface LoadingStateProps {
  message?: string;
  subtitle?: string;
  icon?: string;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
  spinnerColor?: "primary" | "secondary" | "success" | "warning" | "danger" | "azul-claro" | "azul-oscuro" | "verde-corporativo" | "coral" | "cian";
}

export default function LoadingState({
  message = "Cargando servicios...",
  subtitle = "Preparando la mejor experiencia para ti",
  icon = "🛠️",
  spinnerSize = "xl",
  spinnerColor = "primary"
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        {/* Spinner principal usando el componente reutilizable */}
        <Spinner size={spinnerSize} color={spinnerColor} />
        
        {/* Efecto de ping para más dinamismo */}
        <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/30"></div>
        
        {/* Icono en el centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse-soft">{icon}</span>
        </div>
      </div>
      
      <h3 className="text-azul-oscuro text-2xl font-bold mb-2">{message}</h3>
      <p className="text-azul-marino/60 text-lg">{subtitle}</p>
      
      {/* Indicadores de puntos animados */}
      <div className="mt-6 flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-success rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-warning rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}