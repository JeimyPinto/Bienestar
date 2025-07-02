"use client";

import { useCallback, useEffect, useState } from "react";
import { tokenManager } from "../lib/getToken";
import { User } from "../interface/user";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);

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

  // Logout: usa el tokenManager para limpiar todo
  const logout = useCallback(() => {
    tokenManager.clearSession();
    setToken(null);
    setUser(null);
    setIsExpired(true);
  }, []);

  return { token, user, isExpired, logout, refresh };
}
