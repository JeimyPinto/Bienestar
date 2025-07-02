import React from "react";
import { SpinnerProps } from "../types/components";


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

  // Mapeo de colores
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-azul-oscuro",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    "azul-claro": "text-azul-claro",
    "azul-oscuro": "text-azul-oscuro",
    "verde-corporativo": "text-verde-corporativo",
    coral: "text-coral",
    cian: "text-cian"
  };

  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Cargando...">
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
