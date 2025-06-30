import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  onClick, 
  className = "" 
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        px-4 py-2 text-white/90 hover:text-white rounded-lg 
        transition-all duration-300 
        hover:bg-white/10 hover:shadow-lg hover:backdrop-blur-sm
        font-medium text-sm
        border border-transparent hover:border-white/20
        ${className}
      `}
    >
      {children}
    </Link>
  );
};
