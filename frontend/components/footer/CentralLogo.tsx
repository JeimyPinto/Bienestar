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
    <div className={`flex flex-col items-center justify-center space-y-8 ${className}`}>
      <div className="flex items-center justify-center p-6 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          priority={false}
          className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 brightness-0 invert opacity-40 group-hover:opacity-100"
          style={{ height: "auto" }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 group cursor-default">
        <div className="h-[1px] w-12 bg-white/20 mb-2 group-hover:w-24 transition-all duration-500"></div>
        <div className="flex items-center gap-3">
          <p className="text-sm font-display font-medium text-white/40 group-hover:text-white/80 transition-colors duration-300">
            © {new Date().getFullYear()} — <span className="text-azul-cielo">SENA</span>
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors duration-300">
          Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
