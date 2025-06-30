import React from 'react';

interface MobileLogoutButtonProps {
  onClick: () => void;
}

export const MobileLogoutButton: React.FC<MobileLogoutButtonProps> = ({ onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className="
          w-full flex items-center space-x-4 p-4 rounded-xl
          bg-gradient-to-r from-danger to-coral
          text-white border border-danger/30
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-2
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <span className="text-2xl">🚪</span>
        <div className="flex-1 text-left">
          <span className="font-semibold text-lg">Cerrar Sesión</span>
          <p className="text-sm text-white/80 mt-1">
            Finalizar mi sesión actual
          </p>
        </div>
      </button>
    </li>
  );
};
