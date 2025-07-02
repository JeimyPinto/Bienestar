import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LoginButtonProps } from "../../../interface/components";

export const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <Link
      href="/auth"
      onClick={onClick}
      className="
        px-4 py-2 bg-warning hover:bg-amarillo 
        text-azul-oscuro rounded-lg font-bold text-sm
        transition-all duration-300 
        hover:shadow-lg hover:scale-105
        border border-warning/50 hover:border-warning/80
        flex items-center space-x-2
        focus-visible-custom
      "
    >
      <Image
        src="/images/ico-login.svg"
        alt="Icono de login"
        width={16}
        height={16}
        className="opacity-80"
        priority={false}
      />
      <span>Iniciar Sesión</span>
    </Link>
  );
};
