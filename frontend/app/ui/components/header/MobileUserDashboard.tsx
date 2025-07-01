import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileUserDashboardProps } from '../../../types/components';


export const MobileUserDashboard: React.FC<MobileUserDashboardProps> = ({
  user,
  onClick
}) => {
  const userName = user?.firstName ? user.firstName.split(" ")[0] : "Usuario";
  const userImage = user?.image
    ? `${process.env.NEXT_PUBLIC_URL_FILE_STATIC || ""}/users/${user.image}`
    : "/images/logo-sena.png";

  return (
    <li>
      <Link
        href="/dashboard"
        onClick={onClick}
        className="
          block p-3 sm:p-4 rounded-xl
          bg-gradient-to-r from-success to-verde-bosque
          text-white border border-success/30
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-1
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <Image
              src={userImage}
              alt={`Perfil de ${userName}`}
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20"
              priority={false}
            />
            <span className="absolute -bottom-1 -right-1 text-sm sm:text-lg">📊</span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-semibold text-base sm:text-lg block truncate">Dashboard</span>
            {userName && (
              <p className="text-xs sm:text-sm text-white/80 mt-1 truncate">
                Bienvenido, {userName}
              </p>
            )}
            {user?.role && (
              <p className="text-xs text-white/60 capitalize truncate">
                {user.role}
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
