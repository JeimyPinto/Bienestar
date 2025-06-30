"use client";

import Link from "next/link";
import Image from "next/image";
import { IcoBackProps } from "../types/components";

const IcoBack: React.FC<IcoBackProps> = ({ href = "/dashboard", className = "" }) => {
  return (
    <div className={`bg-azul p-2 rounded-lg hover:bg-cian hover:scale-105 transition-all duration-300 ${className}`}>
      <Link href={href} className="flex items-center justify-center">
        <Image
          src="/images/ico-back.svg"
          priority={false}
          loading="eager"
          alt="Volver"
          width={24}
          height={24}
          className="hover:filter hover:brightness-0 hover:invert"
        />
      </Link>
    </div>
  );
};

export default IcoBack;
