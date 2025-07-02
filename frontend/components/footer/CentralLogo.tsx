import React from 'react';
import Image from 'next/image';

export interface CentralLogoProps {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export default function CentralLogo({
  className = '',
  logoSrc = '/images/logo-sena.png',
  logoAlt = 'Logo SENA',
  logoWidth = 80,
  logoHeight = 78.4,
}: CentralLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <div className="flex items-center justify-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          priority={false}
          className="transition-transform duration-300 group-hover:scale-105"
          style={{ height: "auto" }}
        />
      </div>
      
      <div className="flex items-center gap-3 text-azul-cielo/80 group">
        <div className="p-1.5 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-200">
          <Image
            src="/images/ico-copyright.svg"
            alt="Copyright"
            width={16}
            height={16}
            priority={false}
          />
        </div>
        <p className="text-sm font-medium group-hover:text-white transition-colors duration-200">
          {new Date().getFullYear()} - Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
