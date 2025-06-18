"use client"

import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User } from "../types"
import isTokenExpired from "../lib/isTokenExpired"
import getUserToken from "../lib/getUserToken"
import getToken from "../lib/getToken"

export default function Header() {

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Verifica el token al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const tokenValue = getToken();
      let userValue = null;
      if (tokenValue) {
        try {
          userValue = getUserToken(tokenValue);
        } catch (e) {
          userValue = null;
        }
        if (isTokenExpired(tokenValue)) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          router.push("/auth");
        } else {
          setToken(tokenValue);
          setUser(userValue as User);
        }
      } else {
        setToken(null);
        setUser(null);
      }
    }
    fetchData();
  }, [router]);

  // Cierra el menú al navegar o cambiar tamaño
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-4 py-3 md:px-6 md:py-4 bg-azul w-full h-auto text-base md:text-xl text-white shadow-lg relative">
      <Link href="/" tabIndex={0}>
        <Image
          src="/images/Icono.png"
          priority={false}
          alt="Logo Bienestar al Aprendiz"
          width={150}
          height={60}
          className="p-3"
        />
      </Link>
      <button
        className="md:hidden absolute right-6 top-6 z-50 flex flex-col justify-center items-center w-10 h-10"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
      >
        <span
          className={`block w-8 h-1 bg-white rounded transition-all duration-300
            ${menuOpen ? "rotate-45 translate-y-2" : ""}
          `}
        ></span>
        <span
          className={`block w-8 h-1 bg-white rounded transition-all duration-300 my-1
            ${menuOpen ? "opacity-0" : ""}
          `}
        ></span>
        <span
          className={`block w-8 h-1 bg-white rounded transition-all duration-300
            ${menuOpen ? "-rotate-45 -translate-y-2" : ""}
          `}
        ></span>
      </button>
      <nav
        id="main-menu"
        aria-label="Menú principal"
        className={`
          flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-4
          fixed md:static top-0 left-0 w-full h-full md:h-auto md:w-auto
          bg-[rgba(47,34,84,0.92)] md:bg-transparent z-30
          transition-all duration-300
          ${menuOpen ? "flex" : "hidden md:flex"}
        `}
      >
        <ul className="flex flex-col md:flex-row gap-8 md:gap-5 p-2 md:p-0 text-2xl md:text-base w-full md:w-auto">
          <li>
            <Link
              href="/integrantes"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-6 py-3 rounded-lg bg-white/80 shadow-md text-azul font-semibold hover:bg-cian/80 hover:text-magenta transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cian relative group"
            >
              <span className="relative z-10">Integrantes</span>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-cian transition-all duration-300 group-hover:w-full group-focus:w-full rounded"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              onClick={() => setMenuOpen(false)}
              className="block w-full px-6 py-3 rounded-lg bg-white/80 shadow-md text-azul font-semibold hover:bg-cian/80 hover:text-magenta transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cian relative group"
            >
              <span className="relative z-10">Servicios</span>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-cian transition-all duration-300 group-hover:w-full group-focus:w-full rounded"></span>
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="block w-full px-6 py-3 rounded-lg bg-white/80 shadow-md text-azul font-semibold hover:bg-cian/80 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cian relative group flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                  src={
                    user?.image
                    ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/users/" + user.image
                    : "/images/ico-profile.svg"
                  }
                  alt={`${user?.firstName ?? ""}`.trim() || "Icono de usuario"}
                  width={32}
                  height={32}
                  priority={true}
                  className="object-cover mr-2 w-8 h-8"
                  />
                  <span className="relative z-10">
                  {user
                    ? `Dashboard de ${user.firstName ? user.firstName.split(" ")[0] : "Usuario"}`
                    : "Cargando..."}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-cian transition-all duration-300 group-hover:w-full group-focus:w-full rounded"></span>
                </Link>
              </li>
              <li>
                <button
                  className="block w-full px-6 py-3 rounded-lg bg-magenta/90 shadow-md text-white font-semibold hover:bg-cian/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cian"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setMenuOpen(false);
                    router.push("/auth");
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth" onClick={() => setMenuOpen(false)}>
                <button className="relative flex items-center justify-between w-full px-6 py-3 rounded-lg bg-gradient-to-b from-blue-500 to-cian shadow-md text-azul-oscuro font-semibold hover:bg-azul/90 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cian">
                  <span>Ingresar al Portal</span>
                  <Image
                    src="/images/ico-login.svg"
                    alt="Icono de flecha derecha"
                    width={20}
                    height={20}
                    className="ml-3"
                    priority={false}
                  />
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
