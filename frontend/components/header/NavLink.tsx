import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function NavLink({
  href,
  children,
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
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
