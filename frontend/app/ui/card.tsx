import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'bordered' | 'shadow';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  variant = 'default'
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white shadow-lg border border-azul-cielo/20",
    gradient: "bg-gradient-to-br from-white/98 to-beige-claro/95 shadow-lg border-2 border-azul-cielo/30",
    bordered: "bg-white border-2 border-azul-claro/40 shadow-md",
    shadow: "bg-white shadow-xl"
  };
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };
  
  const hoverClasses = hover 
    ? "hover:shadow-xl hover:scale-[1.02] hover:border-primary/50" 
    : "";
  
  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${paddingClasses[padding]} 
        ${hoverClasses} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
