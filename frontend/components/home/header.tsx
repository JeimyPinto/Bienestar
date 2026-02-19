"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../contexts/authContext";
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
  const { token, user, isInitialized, isAuthenticated, clearAuth } = useAuthContext();
  const { menuOpen, toggleMenu, closeMenu } = useHeader();
  const router = useRouter();

  // Función para manejar logout
  const handleLogout = useCallback(() => {
    clearAuth();
    closeMenu();
    router.push("/auth");
  }, [clearAuth, closeMenu, router]);

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
    <header className="sticky top-0 z-40 w-full bg-azul-oscuro border-b border-white/10 shadow-premium transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:px-6">
        <div className="flex justify-between items-center">
          {/* Brand/Logo Section (Integrated Rectangular Design) */}
          <Link
            href="/"
            className="group flex items-center transition-all duration-300 active:scale-95"
          >
            <div className="flex items-center bg-white/95 backdrop-blur-sm p-1.5 pr-6 rounded-2xl border border-white/20 shadow-lg group-hover:bg-white transition-all duration-300">
              <div className="bg-azul-oscuro p-1 rounded-xl shadow-inner group-hover:rotate-3 transition-transform duration-500">
                <Image
                  src="/images/logo-sena.png"
                  alt="SENA Logo"
                  width={35}
                  height={35}
                  className="w-7 h-7 object-contain brightness-0 invert"
                />
              </div>

              <div className="h-6 w-[1.5px] bg-azul-oscuro/10 mx-3"></div>

              <div className="flex flex-col">
                <h1 className="text-azul-oscuro font-display font-bold text-base md:text-lg tracking-tight leading-none">
                  Bienestar <span className="text-azul-claro">Aprendiz</span>
                </h1>
                <p className="text-azul-oscuro/50 text-[9px] uppercase tracking-wider font-bold mt-0.5">
                  Regional Caldas
                </p>
              </div>
            </div>
          </Link>

          {/* Botón hamburguesa (Moderna) */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 text-white"
            onClick={(e) => {
              e.preventDefault();
              toggleMenu();
            }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="flex flex-col justify-center items-center w-6 h-5 gap-1.5">
              <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>

          {/* Navegación de escritorio (Limpia) */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/services" onClick={closeMenu}>
              Servicios
            </NavLink>

            {showAuthButtons ? (
              isAuthenticated ? (
                <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-5">
                  <UserDashboardLink user={user} onClick={closeMenu} />
                  <LogoutButton onClick={handleLogout} />
                </div>
              ) : (
                <div className="ml-4">
                  <LoginButton onClick={closeMenu} />
                </div>
              )
            ) : (
              <div className="w-24 h-10 bg-white/5 animate-pulse rounded-xl ml-4" />
            )}
          </nav>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"
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
          className={`absolute top-0 right-0 mobile-menu-height w-80 max-w-[85%] sm:max-w-sm bg-gradient-to-b from-azul-oscuro to-azul-marino shadow-2xl transform transition-transform duration-300 mobile-menu-safe-area ${menuOpen ? "translate-x-0" : "translate-x-full"
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
