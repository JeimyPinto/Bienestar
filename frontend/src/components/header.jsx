"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

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
        <ul className="flex gap-3 p-2">
          <li className="text-foreground">Integrantes</li>
          <li className="text-foreground">Servicios</li>
        </ul>
        {isLoginPage ? (
          <Link href="/register">
            <button className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white">
              Registrarse
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white">
              Ingresar
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
