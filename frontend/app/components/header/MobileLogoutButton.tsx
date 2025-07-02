import React from 'react';
import { MobileLogoutButtonProps } from "../../../interface/components";


export const MobileLogoutButton: React.FC<MobileLogoutButtonProps> = ({ onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="
          w-full flex items-center space-x-3 p-3 sm:p-4 rounded-xl
          bg-gradient-to-r from-danger to-coral
          text-white border border-danger/30
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-1
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <span className="text-xl sm:text-2xl flex-shrink-0">🚪</span>
        <div className="flex-1 text-left min-w-0">
          <span className="font-semibold text-base sm:text-lg block truncate">Cerrar Sesión</span>
          <p className="text-xs sm:text-sm text-white/80 mt-1 truncate">
            Finalizar mi sesión actual
          </p>
        </div>
      </button>
    </li>
  );
};
