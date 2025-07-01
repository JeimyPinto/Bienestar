import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variantClasses = {
    success: "bg-success/20 text-success border border-success/30",
    warning: "bg-warning/20 text-azul-oscuro border border-warning/30",
    danger: "bg-danger/20 text-danger border border-danger/30",
    info: "bg-info/20 text-info border border-info/30",
    primary: "bg-primary/20 text-primary border border-primary/30",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    neutral: "bg-neutral/20 text-azul-oscuro border border-neutral/30"
  };
  
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };
  
  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
