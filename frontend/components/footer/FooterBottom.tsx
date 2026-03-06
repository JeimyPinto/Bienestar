import React from 'react';
import { Heart } from 'lucide-react';

interface FooterBottomProps {
  className?: string;
  children?: React.ReactNode;
}

export default function FooterBottom({ className = '', children }: FooterBottomProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-azul-cielo/80 hover:text-white transition-colors duration-200 flex items-center justify-center gap-1.5 font-sans">
        Sistema de Bienestar al Aprendiz • Desarrollado con{' '}
        <Heart size={12} className="text-success fill-success animate-pulse-soft" />{' '}
        para la comunidad SENA
      </p>
      {children}
    </div>
  );
}
