"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  function handleLogout() {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cerrar sesión");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Logout exitoso:", data);
          // Destruir el token y realizar otras limpiezas
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error al intentar desloguearse:", error);
        });
    } catch (error) {
      console.error("Error en la función handleLogout:", error);
    }
  }

  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-azul w-full h-auto text-xl text-white shadow-lg">
      <Link href="/">
        <Image
          src="/images/Icono.png"
          alt="Logo"
          width={150}
          height={60}
          className="p-3"
          priority={false}
        />
      </Link>
      <nav className="flex items-center space-x-4 mt-4 md:mt-0">
        <ul className="flex gap-5 p-2">
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/integrantes">Integrantes</Link>
          </li>
          <li className="text-white hover:text-cian transition-colors duration-300">
            <Link href="/servicios">Servicios</Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="flex items-center text-white hover:text-cian transition-colors duration-300">
              <Image
                src="/images/ico-profile.svg"
                alt="Icon Profile"
                width={42}
                height={42}
                priority
              />
              <span className="ml-2">Mi Perfil</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-magenta text-white px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-cian text-white px-4 py-2 rounded-md hover:bg-azul hover:border-2 hover:border-white hover:shadow-md hover:shadow-white transition-all duration-300">
              Ingresar
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}