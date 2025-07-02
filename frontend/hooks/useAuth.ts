"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { tokenManager } from "../lib/getToken";
import { User } from "../interface/user";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Logout: usa el tokenManager para limpiar todo
  const logout = useCallback(() => {
    tokenManager.clearSession();
    setToken(null);
    setUser(null);
    setIsExpired(true);
  }, []);

  // Obtiene y valida el token y usuario
  const refresh = useCallback(async () => {
    const validatedSession = tokenManager.validateSession();
    
    setToken(validatedSession.token);
    setUser(validatedSession.user);
    setIsExpired(!validatedSession.isValid);
  }, []);

  // Cargar al montar
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Lógica de revisión automática de token y redirección por expiración
  useEffect(() => {
    // Solo ejecutar si no estamos en la página principal
    if (pathname === "/") {
      return;
    }

    // Refresca el token cada 10 segundos
    const interval = setInterval(() => {
      refresh();
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, [refresh, pathname]);

  // Efecto separado para manejar redirección por token expirado
  useEffect(() => {
    // Solo redirigir si no estamos en la página principal ni en auth
    if (pathname === "/" || pathname === "/auth") {
      return;
    }

    // Si el token ha expirado, cerrar sesión y redirigir
    if (isExpired && token === null) {
      logout();
      router.push("/auth");
    }
  }, [isExpired, token, pathname, logout, router]);

  return { token, user, isExpired, logout, refresh };
}
