import React from "react";

interface SpinnerProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Spinner({ 
  className = "", 
  color = "text-cian", 
  size = "md" 
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const spinnerSize = sizeClasses[size];

  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Cargando...">
      <svg 
        className={`animate-spin ${spinnerSize} ${color}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
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
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
