import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileLoginButtonProps } from "../../../types/components";

export const MobileLoginButton: React.FC<MobileLoginButtonProps> = ({ onClick }) => {
  return (
    <li>
      <Link
        href="/auth"
        onClick={onClick}
        className="
          block p-4 rounded-xl
          bg-gradient-to-r from-warning to-amarillo
          text-azul-oscuro border border-warning/50
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-2
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-azul-oscuro/10 rounded-full">
            <Image
              src="/images/ico-login.svg"
              alt="Icono de login"
              width={24}
              height={24}
              className="opacity-80"
              priority={false}
            />
          </div>
          <div className="flex-1">
            <span className="font-bold text-lg">Iniciar Sesión</span>
            <p className="text-sm text-azul-oscuro/80 mt-1">
              Accede a tu cuenta
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
