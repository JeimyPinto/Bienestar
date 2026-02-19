import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from '../../interface/user';

interface UserDashboardLinkProps {
  user?: User | null;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function UserDashboardLink({
  user,
  onClick
}: UserDashboardLinkProps) {
  const userName = user?.firstName ? user.firstName.split(" ")[0] : "Usuario";
  const userImage = user?.image
    ? `${process.env.NEXT_PUBLIC_URL_FILE_STATIC || ""}/users/${user.image}`
    : "/images/logo-sena.png";

  return (
    <Link
      href="/dashboard"
      onClick={onClick}
      className="
        px-4 py-2 bg-white/5 hover:bg-white/10
        text-white rounded-xl font-display font-semibold text-sm
        transition-all duration-300 
        shadow-sm hover:shadow-lg hover:scale-[1.05] active:scale-95
        border border-white/10
        flex items-center space-x-2
        focus-visible-custom
      "
    >
      <Image
        src={userImage}
        alt={`Perfil de ${userName}`}
        width={24}
        height={24}
        className="rounded-full object-cover"
        priority={false}
      />
      <span className="hidden lg:inline">Dashboard</span>
      <span className="lg:hidden">📊</span>
      {userName && (
        <span className="hidden xl:inline text-xs opacity-75">
          ({userName})
        </span>
      )}
    </Link>
  );
}
