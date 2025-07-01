import React from 'react';

export const FooterDivider: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-azul-cielo/30 to-transparent"></div>
      <div className="mx-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group">
        <span className="text-azul-cielo group-hover:text-warning transition-colors duration-200">✨</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-azul-cielo/30 to-transparent"></div>
    </div>
  );
};
