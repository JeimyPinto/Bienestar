"use client";

import Link from "next/link";
import Image from "next/image";

interface IcoBackProps {
  role: string;
}

const IcoBack: React.FC<IcoBackProps> = ({ role }) => {
  const href = role === "user" ? "/dashboard/user" : "/dashboard/admin";

  return (
    <div className="fixed top-28 left-5 bg-azul p-2 rounded-lg hover:bg-cian hover:scale-125 transition-transform duration-300">
      <Link href={href} className="flex items-center justify-center">
        <Image
          src="/images/ico-back.svg"
          priority={true}
          loading="eager"
          alt="Icono de regreso"
          width={42}
          height={42}
          className="hover:filter hover:brightness-0 hover:invert"
        />
      </Link>
    </div>
  );
};

export default IcoBack;