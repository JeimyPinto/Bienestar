import React from 'react';
import Link from 'next/link';
import { MobileNavItemProps } from  "../../../types/components"


export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  href,
  icon,
  children,
  onClick
}) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="
          flex items-center space-x-3 p-3 sm:p-4 rounded-xl
          text-white/90 hover:text-white
          bg-white/5 hover:bg-white/15
          border border-white/10 hover:border-white/25
          transition-all duration-300
          hover:shadow-lg hover:translate-x-1
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
          text-sm sm:text-base
        "
      >
        <span className="text-xl sm:text-2xl flex-shrink-0">{icon}</span>
        <span className="font-medium truncate">{children}</span>
      </Link>
    </li>
  );
};
