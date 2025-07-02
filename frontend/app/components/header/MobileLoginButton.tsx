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
          block p-3 sm:p-4 rounded-xl
          bg-gradient-to-r from-warning to-amarillo
          text-azul-oscuro border border-warning/50
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-1
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-azul-oscuro/10 rounded-full flex-shrink-0">
            <Image
              src="/images/ico-login.svg"
              alt="Icono de login"
              width={20}
              height={20}
              className="w-5 h-5 sm:w-6 sm:h-6 opacity-80"
              priority={false}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-bold text-base sm:text-lg block truncate">Iniciar Sesión</span>
            <p className="text-xs sm:text-sm text-azul-oscuro/80 mt-1 truncate">
              Accede a tu cuenta
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
