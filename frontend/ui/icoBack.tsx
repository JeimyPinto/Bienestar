"use client";

import Link from "next/link";
import Image from "next/image";
import { IcoBackProps } from "../../interface/components";

const IcoBack: React.FC<IcoBackProps> = ({ href = "/dashboard", className = "" }) => {
  return (
    <div className={`bg-azul p-2 sm:p-3 rounded-lg hover:bg-cian hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg ${className}`}>
      <Link href={href} className="flex items-center justify-center">
        <Image
          src="/images/ico-back.svg"
          priority={false}
          loading="eager"
          alt="Volver"
          width={24}
          height={24}
          className="w-5 h-5 sm:w-6 sm:h-6 hover:filter hover:brightness-0 hover:invert transition-all duration-300"
        />
      </Link>
    </div>
  );
};

export default IcoBack;
