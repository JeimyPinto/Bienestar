import React from 'react';

interface FooterBottomProps {
  className?: string;
  children?: React.ReactNode;
}

export default function FooterBottom({ className = '', children }: FooterBottomProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-azul-cielo/60 hover:text-azul-cielo/80 transition-colors duration-200">
        Sistema de Bienestar al Aprendiz • Desarrollado con{' '}
        <span className="text-success animate-pulse-soft">💚</span>{' '}
        para la comunidad SENA
      </p>
      {children}
    </div>
  );
}
