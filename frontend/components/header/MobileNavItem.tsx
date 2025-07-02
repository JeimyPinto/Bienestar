import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

interface MobileNavItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function MobileNavItem({
  href,
  icon,
  children,
  onClick,
}: MobileNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="
          flex items-center space-x-4 p-4 rounded-xl
          text-white/90 hover:text-white
          bg-white/5 hover:bg-white/15
          border border-white/10 hover:border-white/25
          transition-all duration-300
          hover:shadow-lg hover:translate-x-2
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{children}</span>
      </Link>
    </li>
  );
}
