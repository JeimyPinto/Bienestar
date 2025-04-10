"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UserProfilePage from "../user/UserProfilePage";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  id?: string;
  firstName?: string; 
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Obtener el token del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  
  useEffect(() => {
    if (token) {
      try {
        const tokenPayload = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;
  
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          console.warn("El token ha expirado.");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          setUser({
            id: tokenPayload.id,
            firstName: tokenPayload.firstName,
            exp: tokenPayload.exp,
          });
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

  // Manejar el cierre de sesión
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  }

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
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center text-white hover:text-cian transition-colors duration-300"
            >
              <Image
                src="/images/ico-profile.svg"
                alt="Icon Profile"
                width={42}
                height={42}
                priority
              />
              <span className="ml-2">{user?.firstName || "Usuario"}</span>
            </button>
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
      {showProfile && (
        <UserProfilePage
          userId={user?.id}
          onClose={() => setShowProfile(false)}
        />
      )}
    </header>
  );
}
