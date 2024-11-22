"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fallo al cerrar sesión");
      }

      localStorage.removeItem("token");
      setIsAuthenticated(false);
      router.push("/login");
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 bg-azul w-full h-30 text-xl text-white">
      <Link href="/">
        <Image
          src="/images/Icono.png"
          alt="Logo"
          width={300}
          height={20}
          className="p-3"
        />
      </Link>
      <nav className="flex justify-center items-center">
        <ul className="flex gap-5 p-2">
          <li className="text-foreground">Integrantes</li>
          <li className="text-foreground px-2">
            <Link href="/servicios">Servicios</Link>
          </li>
        </ul>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian 
            hover:border-2 hover:border-white hover:shadow-md hover:shadow-white"
          >
            Cerrar sesión
          </button>
        ) : (
          <Link href="/login">
            <button
              className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian 
              hover:border-2 hover:border-white hover:shadow-md hover:shadow-white"
            >
              Ingresar
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
