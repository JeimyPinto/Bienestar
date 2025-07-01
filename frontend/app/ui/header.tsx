"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "../hooks/useAuth"
import { useHeader } from "../hooks/useHeader"
import {
  NavLink,
  UserDashboardLink,
  LogoutButton,
  LoginButton,
  MobileNavItem,
  MobileUserDashboard,
  MobileLogoutButton,
  MobileLoginButton
} from "./components/header/index"

export default function Header() {
  const { token, user, logout, refresh, isExpired } = useAuth();
  const { menuOpen, toggleMenu, closeMenu } = useHeader();
  const router = useRouter();

  // Refresca el token cada 10 segundos y valida que no haya expirado
  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 10000); // 10 segundos

    // Si el token ha expirado, cerrar sesión y redirigir
    if (isExpired) {
      logout();
      router.push("/auth");
    }

    return () => clearInterval(interval);
  }, [refresh, isExpired, logout, router]);

  return (
    <header className="bg-gradient-corporate shadow-xl border-b border-azul-cielo/20 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo mejorado */}
          <Link href="/" tabIndex={0} className="group flex items-center space-x-3">
            <div className="relative overflow-hidden rounded-xl p-2 transition-all duration-300 group-hover:bg-white/10 bg-white/5 backdrop-blur-sm border border-white/10">
              <Image
                src="/images/Icono.png"
                priority={false}
                alt="Logo Bienestar al Aprendiz"
                width={48}
                height={48}
                className="transition-transform duration-300 group-hover:scale-105 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white text-lg md:text-xl font-bold leading-tight">
                Sistema de Bienestar al Aprendiz
              </h1>
              <p className="text-azul-cielo/80 text-xs md:text-sm">
                SENA - Formación Integral
              </p>
            </div>
          </Link>

          {/* Botón hamburguesa mejorado */}
          <button
            className="md:hidden relative z-50 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 my-1 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/integrantes" onClick={closeMenu}>
              👥 Integrantes
            </NavLink>
            <NavLink href="/services" onClick={closeMenu}>
              🛠️ Servicios
            </NavLink>
            
            {token ? (
              <>
                <UserDashboardLink user={user} onClick={closeMenu} />
                <LogoutButton onClick={() => {
                  logout();
                  closeMenu();
                  router.push("/auth");
                }} />
              </>
            ) : (
              <LoginButton onClick={closeMenu} />
            )}
          </nav>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-azul-marino/95 backdrop-blur-md"
          onClick={closeMenu}
        />
        
        {/* Menú contenido */}
        <nav
          id="main-menu"
          aria-label="Menú principal"
          className={`absolute top-0 right-0 h-full w-80 max-w-full bg-gradient-to-b from-azul-oscuro to-azul-marino shadow-2xl transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-6 pb-6 h-full overflow-y-auto">
            <ul className="space-y-4">
              <MobileNavItem href="/integrantes" icon="👥" onClick={closeMenu}>
                Integrantes
              </MobileNavItem>
              <MobileNavItem href="/services" icon="🛠️" onClick={closeMenu}>
                Servicios
              </MobileNavItem>
              
              {token ? (
                <>
                  <MobileUserDashboard user={user} onClick={closeMenu} />
                  <MobileLogoutButton onClick={() => {
                    logout();
                    closeMenu();
                    router.push("/auth");
                  }} />
                </>
              ) : (
                <MobileLoginButton onClick={closeMenu} />
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
