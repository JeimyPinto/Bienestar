"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import { useHeader } from "../../hooks/useHeader";
import NavLink from "../header/NavLink";
import UserDashboardLink from "../header/UserDashboardLink";
import LogoutButton from "../header/LogoutButton";
import LoginButton from "../header/LoginButton";
import MobileNavItem from "../../components/header/MobileNavItem";
import MobileUserDashboard from "../header/MobileUserDashboard";
import MobileLogoutButton from "../header/MobileLogoutButton";
import MobileLoginButton from "../header/MobileLoginButton";

export default function Header() {
  const { token, user, logout, isInitialized } = useAuth();
  const { menuOpen, toggleMenu, closeMenu } = useHeader();
  const router = useRouter();

  // Función para manejar logout
  const handleLogout = useCallback(() => {
    logout();
    closeMenu();
    router.push("/auth");
  }, [logout, closeMenu, router]);

  // Determinar si el usuario está autenticado
  const isAuthenticated = Boolean(token && user);
  
  // Mostrar loading hasta que la autenticación esté inicializada
  const showAuthButtons = isInitialized;

  // Función para debug del estado de auth
  React.useEffect(() => {
    console.log("Header Auth State:", { 
      token: !!token, 
      user: !!user, 
      isAuthenticated, 
      isInitialized,
      showAuthButtons 
    });
  }, [token, user, isAuthenticated, isInitialized, showAuthButtons]);

  return (
    <header className="bg-gradient-corporate shadow-xl border-b border-azul-cielo/20 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo mejorado */}
          <Link
            href="/"
            tabIndex={0}
            className="group flex items-center space-x-3"
          >
            <div className="relative overflow-hidden rounded-xl p-2 transition-all duration-300 group-hover:bg-white/10 bg-white/5 backdrop-blur-sm border border-white/10">
              <Image
                src="/images/icono.png"
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Hamburger button clicked"); // Debug
              toggleMenu();
            }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            type="button"
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
            <NavLink href="/services" onClick={closeMenu}>
              🛠️ Servicios
            </NavLink>

            {showAuthButtons ? (
              isAuthenticated ? (
                <>
                  <UserDashboardLink user={user} onClick={closeMenu} />
                  <LogoutButton onClick={handleLogout} />
                </>
              ) : (
                <LoginButton onClick={closeMenu} />
              )
            ) : (
              <div className="w-20 h-10 animate-pulse bg-white/10 rounded-lg" />
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
          className="absolute inset-0 bg-azul-marino/95 backdrop-blur-md cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
          }}
          aria-label="Cerrar menú"
        />

        {/* Menú contenido */}
        <nav
          id="main-menu"
          aria-label="Menú principal"
          className={`absolute top-0 right-0 mobile-menu-height w-80 max-w-[85%] sm:max-w-sm bg-gradient-to-b from-azul-oscuro to-azul-marino shadow-2xl transform transition-transform duration-300 mobile-menu-safe-area ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Contenido scrolleable */}
            <div className="flex-1 pt-16 sm:pt-20 pb-4 overflow-y-auto mobile-menu-scroll">
              <div className="px-4 sm:px-6 mobile-menu-compact">
                <ul className="space-y-3 mobile-menu-short mobile-touch-target">
                  <MobileNavItem href="/services" icon="🛠️" onClick={closeMenu}>
                    Servicios
                  </MobileNavItem>

                  {isAuthenticated ? (
                    <>
                      <MobileUserDashboard user={user} onClick={closeMenu} />
                      <MobileLogoutButton onClick={handleLogout} />
                    </>
                  ) : (
                    <MobileLoginButton onClick={closeMenu} />
                  )}
                </ul>
              </div>
            </div>

            {/* Área inferior para evitar que el contenido se corte */}
            <div className="h-4 flex-shrink-0" />
          </div>
        </nav>
      </div>
    </header>
  );
}
