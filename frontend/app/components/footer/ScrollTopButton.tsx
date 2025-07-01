import React from 'react';
import Image from 'next/image';
import {ScrollTopButtonProps} from "../../../types/components"


export const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({ show, onClick }) => {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 md:bottom-8 md:right-8
        bg-gradient-to-r from-primary to-azul-cielo
        hover:from-azul-cielo hover:to-primary
        text-white rounded-xl p-3 md:p-4
        shadow-2xl hover:shadow-azul-cielo/25
        transition-all duration-300
        hover:scale-110 active:scale-95
        z-50 group
        border border-white/20
        backdrop-blur-sm
        animate-fade-in-up
        focus-visible-custom
      "
      aria-label="Volver arriba"
    >
      <div className="relative">
        <Image
          src="/images/ico-arrow-up.svg"
          alt="Volver arriba"
          width={24}
          height={24}
          priority={false}
          className="transition-transform duration-300 group-hover:-translate-y-1"
          style={{ height: "auto" }}
        />
        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-soft"></div>
      </div>
    </button>
  );
};
