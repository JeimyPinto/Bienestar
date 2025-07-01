import React from 'react';
import { LogoutButtonProps } from "../../../types/components";


export const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 bg-danger hover:bg-coral 
        text-white rounded-lg font-medium text-sm
        transition-all duration-300 
        hover:shadow-lg hover:scale-105
        border border-danger/30 hover:border-danger/50
        flex items-center space-x-2
        focus-visible-custom
      "
    >
      <span>🚪</span>
      <span>Cerrar Sesión</span>
    </button>
  );
};
