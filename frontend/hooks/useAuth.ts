"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { tokenManager } from "../lib/tokenManager";
import { login } from "../services/auth";
import { User } from "../interface/user";

export function useAuth() {
  // Estados de sesión
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Estados del formulario de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const pathname = usePathname();

  // Logout: usa el tokenManager para limpiar todo
  const logout = useCallback(() => {
    tokenManager.clearSession();
    setToken(null);
    setUser(null);
    setIsExpired(true);
    // Limpiar también el formulario
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  // Obtiene y valida el token y usuario
  const refresh = useCallback(async () => {
    const validatedSession = tokenManager.validateSession();
    
    setToken(validatedSession.token);
    setUser(validatedSession.user);
    setIsExpired(!validatedSession.isValid);
    
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Manejo del submit del formulario de login
  const handleLoginSubmit = useCallback(async (e: React.FormEvent, recaptchaToken: string, recaptchaValid: boolean) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (!recaptchaToken || !recaptchaValid) {
        setError("Por favor completa y valida el reCAPTCHA.");
        setLoading(false);
        return;
      }

      // Realizar login
      const result = await login({ email, password, recaptchaToken });
      
      if (result.error || result.message) {
        setError(result.error || result.message);
        setLoading(false);
        return;
      }
      
      if (!result.token) {
        setError("No se recibió un token de autenticación");
        setLoading(false);
        return;
      }
      
      // Actualizar estado de autenticación después del login exitoso
      await refresh();
      
      // Limpiar formulario
      setEmail("");
      setPassword("");
      setError("");
      
      // Redirigir al dashboard
      router.push("/dashboard");
      
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error iniciando sesión:", error);
    } finally {
      setLoading(false);
    }
  }, [email, password, refresh, router]);

  // Cargar al montar
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Lógica de revisión automática de token y redirección por expiración
  useEffect(() => {
    // Solo ejecutar si ya se inicializó y no estamos en la página principal
    if (!isInitialized || pathname === "/") {
      return;
    }

    // Refresca el token cada 30 segundos (menos frecuente)
    const interval = setInterval(() => {
      refresh();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [refresh, pathname, isInitialized]);

  // Efecto separado para manejar redirección por token expirado
  useEffect(() => {
    // Solo redirigir si ya se inicializó y no estamos en las páginas permitidas
    if (!isInitialized || pathname === "/" || pathname === "/auth") {
      return;
    }

    // Si el token ha expirado, cerrar sesión y redirigir
    if (isExpired && token === null) {
      logout();
      router.push("/auth");
    }
  }, [isExpired, token, pathname, logout, router, isInitialized]);

  return { 
    // Estados de sesión
    token, 
    user, 
    isExpired, 
    logout, 
    refresh, 
    isInitialized,
    // Estados y métodos del formulario de login
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    handleLoginSubmit
  };
}
