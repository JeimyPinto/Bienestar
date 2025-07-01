import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary to-azul-claro text-white hover:from-azul-claro hover:to-primary focus:ring-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary to-azul-marino text-white hover:from-azul-marino hover:to-secondary focus:ring-secondary border border-secondary/20",
    success: "bg-gradient-to-r from-success to-verde-bosque text-white hover:from-verde-bosque hover:to-success focus:ring-success border border-success/20",
    warning: "bg-gradient-to-r from-warning to-amarillo text-azul-oscuro hover:from-amarillo hover:to-warning focus:ring-warning border border-warning/20",
    danger: "bg-gradient-to-r from-danger to-coral text-white hover:from-coral hover:to-danger focus:ring-danger border border-danger/20",
    info: "bg-gradient-to-r from-info to-azul-cielo text-white hover:from-azul-cielo hover:to-info focus:ring-info border border-info/20",
    neutral: "bg-gradient-to-r from-neutral to-beige-claro text-azul-oscuro hover:from-beige-claro hover:to-neutral focus:ring-neutral border border-neutral/20"
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };
  
  const hoverEffects = "hover:shadow-lg hover:scale-105 active:scale-95";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverEffects} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
