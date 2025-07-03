import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function PageLayout({ 
  children, 
  className = "", 
  containerClassName = "" 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-6 ${className}`}>
      <div className={`container mx-auto px-4 max-w-8xl ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
}
