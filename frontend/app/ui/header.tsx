"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User } from "../types/user"
import isTokenExpired from "../lib/isTokenExpired"

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let lastToken: string | null = null;

    const checkToken = () => {
      let tokenValue: string | null = null;
      // Si está en desarrollo, busca el token en localStorage, si no, en la cookie
      if (
        process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
        process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
      ) {
        tokenValue = localStorage.getItem("token");
        setToken(tokenValue);
      } else {
        const cookie = document.cookie;
        tokenValue =
          cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1] || null;
      }
      // Si el token está expirado, elimínalo y limpia el usuario
      if (tokenValue && isTokenExpired(tokenValue)) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        tokenValue = null;
      }
      if (tokenValue !== lastToken) {
        setToken(tokenValue);
        if (tokenValue) {
          try {
            setUser(JSON.parse(atob(tokenValue.split(".")[1])));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        lastToken = tokenValue;
      }
    };

    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-6 md:py-4 bg-azul w-full h-auto text-base md:text-xl text-white shadow-lg">
      <Link href="/">
        <Image
          src="/images/Icono.png"
          priority={false}
          alt="Logo"
          width={150}
          height={60}
          className="p-3"
        />
      </Link>
      <nav className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
        <ul className="flex gap-5 p-2">
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/integrantes">Integrantes</Link>
          </li>
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/services">Servicios</Link>
          </li>
        </ul>
        {token ? (
          <>
            <Link href="/dashboard" className="flex items-center space-x-4">
              <Image
                src={
                  user?.image
                    ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + user.image
                    : "/images/ico-profile.svg"
                }
                alt={`${user?.firstName ?? ""}`.trim() || "Icono de usuario"}
                width={42}
                height={42}
                priority={true}
              />
              <span className="ml-2">
                Dashboard de {user?.firstName ? user.firstName.split(" ")[0] : "Usuario"}
              </span>
            </Link>
            <button
              className="bg-magenta text-white px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300 ml-2"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/auth");
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link href="/auth">
            <button className="bg-cian text-white px-4 py-2 rounded-md hover:bg-azul hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300">
              Ingresar
            </button>
          </Link>
        )}
      </nav>
    </header >
  );
}
