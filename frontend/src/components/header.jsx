"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 bg-azul w-full h-30 text-xl text-white">
      <Image
        src="/images/Icono.png"
        alt="Logo"
        width={300}
        height={20}
        className="p-3"
      />
      <nav className="flex justify-center items-center">
        <ul className="flex gap-5 p-2">
          <li className="text-foreground">Integrantes</li>
          <li className="text-foreground px-2">Servicios</li>
        </ul>
        <Link href="/login">
          <button
            className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian 
            hover:border-2 hover:border-white hover:shadow-md hover:shadow-white"
          >
            Ingresar
          </button>
        </Link>
      </nav>
    </header>
  );
}
