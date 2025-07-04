import React from "react";
import IcoBack from "./icoBack";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: string;
  backHref?: string;
  buttonText?: string;
  buttonShortText?: string; // Texto corto para pantallas pequeñas
  buttonIcon?: string; // Icono del botón personalizable
  onButtonClick?: () => void;
  className?: string;
  // Nuevas props para más flexibilidad
  showBackButton?: boolean;
  buttonVariant?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  centerContent?: boolean; // Para centrar todo el contenido como en servicios públicos
}

export default function SectionHeader({ 
  title, 
  description, 
  icon,
  backHref = "/dashboard",
  buttonText, 
  buttonShortText,
  buttonIcon = "➕",
  onButtonClick,
  className = "",
  showBackButton = true,
  buttonVariant = 'success',
  size = 'md',
  centerContent = false
}: SectionHeaderProps) {
  
  // Estilos del botón según la variante
  const getButtonStyles = () => {
    const baseStyles = "px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 border flex-shrink-0 text-sm sm:text-base w-full sm:w-auto";
    
    switch (buttonVariant) {
      case 'primary':
        return `${baseStyles} bg-primary hover:bg-azul-cielo text-white border-primary/30`;
      case 'success':
        return `${baseStyles} bg-success hover:bg-verde-bosque text-white border-success/30`;
      case 'warning':
        return `${baseStyles} bg-warning hover:bg-orange-600 text-white border-warning/30`;
      case 'danger':
        return `${baseStyles} bg-danger hover:bg-red-600 text-white border-danger/30`;
      default:
        return `${baseStyles} bg-success hover:bg-verde-bosque text-white border-success/30`;
    }
  };

  // Estilos del tamaño
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: "p-3 sm:p-4",
          title: "text-lg sm:text-xl",
          description: "text-xs sm:text-sm",
          spacing: "space-x-2 sm:space-x-3",
          icon: "mr-1 sm:mr-2"
        };
      case 'lg':
        return {
          container: "p-6 sm:p-8",
          title: "text-3xl sm:text-4xl",
          description: "text-base sm:text-lg",
          spacing: "space-x-4 sm:space-x-6",
          icon: "mr-3 sm:mr-4"
        };
      default: // md
        return {
          container: "p-4 sm:p-6",
          title: "text-2xl sm:text-3xl",
          description: "text-sm sm:text-base",
          spacing: "space-x-3 sm:space-x-4",
          icon: "mr-2 sm:mr-3"
        };
    }
  };

  const sizeStyles = getSizeStyles();

  if (centerContent) {
    return (
      <div className={`mb-8 ${className}`}>
        <div className={`bg-white rounded-2xl shadow-lg ${sizeStyles.container} border border-azul-cielo/20 text-center`}>
          {icon && (
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-primary to-azul-cielo p-3 rounded-full">
                <span className="text-3xl">{icon}</span>
              </div>
            </div>
          )}
          <h1 className={`${sizeStyles.title} font-bold text-azul-oscuro mb-3`}>
            {title}
          </h1>
          {description && (
            <p className={`${sizeStyles.description} text-azul-marino/70 max-w-4xl mx-auto leading-relaxed`}>
              {description}
            </p>
          )}
          {buttonText && onButtonClick && (
            <div className="mt-6">
              <button
                onClick={onButtonClick}
                className={getButtonStyles()}
              >
                <span>{buttonIcon}</span>
                <span>{buttonText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-8 ${className}`}>
      <div className={`bg-white rounded-2xl shadow-lg ${sizeStyles.container} border border-azul-cielo/20`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className={`flex items-center ${sizeStyles.spacing}`}>
            {showBackButton && (
              <IcoBack href={backHref} className="flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <h1 className={`${sizeStyles.title} font-bold text-azul-oscuro mb-1 sm:mb-2 flex items-center`}>
                {icon && (
                  <span className={sizeStyles.icon}>{icon}</span>
                )}
                <span className="truncate">{title}</span>
              </h1>
              {description && (
                <p className={`${sizeStyles.description} text-azul-marino/70`}>
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className={getButtonStyles()}
            >
              <span>{buttonIcon}</span>
              {buttonShortText ? (
                <>
                  <span className="hidden xs:inline sm:hidden">{buttonShortText}</span>
                  <span className="xs:hidden sm:inline">{buttonText}</span>
                </>
              ) : (
                <span>{buttonText}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}