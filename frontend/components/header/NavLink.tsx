import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  icon?: LucideIcon | string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function NavLink({
  href,
  children,
  icon: Icon,
  onClick,
  className = "",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        px-4 py-2 text-white/70 hover:text-white rounded-xl 
        transition-all duration-300 
        hover:bg-white/10 font-display font-medium text-sm
        border border-transparent hover:border-white/10
        focus-visible-custom
        flex items-center gap-2
        ${className}
      `}
    >
      {Icon && (
        <span className="flex items-center justify-center">
          {typeof Icon === 'function' || typeof Icon === 'object' ? React.createElement(Icon as any, { size: 16 }) : Icon}
        </span>
      )}
      {children}
    </Link>
  );
}
