"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User } from "../types/user";

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let lastToken : string | null = null;
    const checkToken = () => {
      const cookie = document.cookie;
      const tokenValue = cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || null;
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
    <header className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-azul w-full h-auto text-xl text-white shadow-lg">
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
      <nav className="flex items-center space-x-4 mt-4 md:mt-0">
        <ul className="flex gap-5 p-2">
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/integrantes">Integrantes</Link>
          </li>
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/services">Servicios</Link>
          </li>
        </ul>
        {token ? (
          <div className="flex items-center space-x-4">
            <Image
              src="/images/ico-profile.svg"
              alt="Icon Profile"
              width={42}
              height={42}
              priority={true}
            />
            <span className="ml-2">{user?.firstName || "Usuario"}</span>
            <button className="bg-magenta text-white px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/auth");
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link href="/auth">
            <button className="bg-cian text-white px-4 py-2 rounded-md hover:bg-azul hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300">
              Ingresar
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
