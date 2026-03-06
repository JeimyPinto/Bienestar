import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface MobileNavItemProps {
  href: string;
  icon: LucideIcon | string | ReactNode;
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
          flex items-center space-x-4 p-5 rounded-2xl
          text-white hover:text-azul-cielo
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-azul-cielo/30
          transition-all duration-300
          hover:translate-x-2
          font-display font-semibold
          focus-visible-custom
        "
      >
        <span className="text-2xl flex items-center justify-center">
          {typeof icon === 'function' || (typeof icon === 'object' && icon !== null) ? (
            React.createElement(icon as any, { size: 24 })
          ) : (
            icon
          )}
        </span>
        <span className="font-medium">{children}</span>
      </Link>
    </li>
  );
}
