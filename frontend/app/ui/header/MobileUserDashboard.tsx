import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileUserDashboardProps } from '../../types/components';


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
          block p-4 rounded-xl
          bg-gradient-to-r from-success to-verde-bosque
          text-white border border-success/30
          transition-all duration-300
          hover:shadow-xl hover:scale-105 hover:translate-x-2
          backdrop-blur-sm animate-fade-in-up
          focus-visible-custom
        "
      >
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={userImage}
              alt={`Perfil de ${userName}`}
              width={48}
              height={48}
              className="rounded-full object-cover border-2 border-white/20"
              priority={false}
            />
            <span className="absolute -bottom-1 -right-1 text-lg">📊</span>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-lg">Dashboard</span>
            {userName && (
              <p className="text-sm text-white/80 mt-1">
                Bienvenido, {userName}
              </p>
            )}
            {user?.role && (
              <p className="text-xs text-white/60 capitalize">
                {user.role}
              </p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
