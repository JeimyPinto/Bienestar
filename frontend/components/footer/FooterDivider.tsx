import React from 'react';

interface FooterDividerProps {
  className?: string;
  icon?: React.ReactNode;
}

export default function FooterDivider({
  className = '',
  icon = '✨',
}: FooterDividerProps) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-azul-cielo/30 to-transparent"></div>
      <div className="mx-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group">
        <span className="text-azul-cielo group-hover:text-warning transition-colors duration-200">
          {icon}
        </span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-azul-cielo/30 to-transparent"></div>
    </div>
  );
}
