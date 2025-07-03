import React from "react";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "azul-claro" | "azul-oscuro" | "azul-marino" | "verde-corporativo" | "coral" | "cian" | "magenta";
};

export default function Spinner({
  className = "",
  size = "md",
  color = "primary"
}: SpinnerProps) {

  // Mapeo de tamaños
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Mapeo de colores según configuración de Tailwind
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    info: "text-info",
    "azul-claro": "text-azul-claro",
    "azul-oscuro": "text-azul-oscuro",
    "azul-marino": "text-azul-marino",
    "verde-corporativo": "text-verde-corporativo",
    coral: "text-coral",
    cian: "text-cian",
    magenta: "text-magenta"
  };

  return (
    <div 
      className={`flex justify-center items-center ${className}`} 
      role="status" 
      aria-label="Cargando..."
    >
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} drop-shadow-sm`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="sr-only">Cargando contenido...</span>
    </div>
  );
}
