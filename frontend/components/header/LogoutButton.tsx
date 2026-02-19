import React from 'react';

interface LogoutButtonProps {
  onClick: () => void;
}

export default function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 bg-white/5 hover:bg-danger/10 
        text-white/70 hover:text-danger rounded-xl font-display font-semibold text-sm
        transition-all duration-300 
        hover:scale-[1.05] active:scale-95
        border border-white/10 hover:border-danger/30
        flex items-center space-x-2
        focus-visible-custom
      "
    >
      <span>🚪</span>
      <span>Cerrar Sesión</span>
    </button>
  );
}
