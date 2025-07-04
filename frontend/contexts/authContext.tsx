"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interface/user";
import { tokenManager } from "../lib/tokenManager";

interface AuthContextValue {
  token: string | null;
  user: User | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
  setAuth: (token: string | null, user: User | null) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Calcular isAuthenticated basado en token y user
  const isAuthenticated = Boolean(token && user);

  const setAuth = (newToken: string | null, newUser: User | null) => {
    setToken(newToken);
    setUser(newUser);
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
  };

  // Inicializar auth state al montar
  useEffect(() => {
    const initializeAuth = () => {
      const validatedSession = tokenManager.validateSession();
      setToken(validatedSession.token);
      setUser(validatedSession.user);
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  // Listener para cambios en localStorage (para sincronizar entre tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        const validatedSession = tokenManager.validateSession();
        setToken(validatedSession.token);
        setUser(validatedSession.user);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value: AuthContextValue = {
    token,
    user,
    isInitialized,
    isAuthenticated,
    setAuth,
    clearAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
