"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
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
    <header className="flex flex-col md:flex-row justify-between items-center px-6 bg-azul w-full h-30 text-xl text-white">
      <Link href="/">
        <Image
          src="/images/Icono.png"
          alt="Logo"
          width={300}
          height={20}
          className="p-3"
        />
      </Link>
      <nav className="flex justify-center justify-center items-center">
        <ul className="flex gap-5 p-2">
          <li className="text-foreground">Integrantes</li>
          <li className="text-foreground px-2">
            <Link href="/servicios">Servicios</Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Link href="/dashboard" className="flex items-center ">
              <Image
                src="/images/ico-profile.svg"
                alt="Icon Profile"
                width={42}
                height={42}
              />
              <span> Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-azul px-4 py-2 rounded-md hover:bg-cian hover:border-2 hover:border-white hover:shadow-md hover:shadow-white"
            >
              Cerrar sesión
            </button>
          </div>
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
