import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LoginButtonProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <Link
      href="/auth"
      onClick={onClick}
      className="
        px-5 py-2.5 bg-warning hover:bg-amarillo 
        text-azul-oscuro rounded-xl font-display font-bold text-sm
        transition-all duration-300 
        shadow-lg hover:shadow-warning/20 hover:scale-[1.05] active:scale-95
        border border-white/20
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
}
