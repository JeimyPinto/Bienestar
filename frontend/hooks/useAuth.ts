"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  // Logout: usa el tokenManager para limpiar todo
  const logout = useCallback(() => {
    tokenManager.clearSession();
    setToken(null);
    setUser(null);
    setIsExpired(true);
    // Limpiar también el formulario y mensajes
    setEmail("");
    setPassword("");
    setErrorMessage(null);
    setSuccessMessage(null);
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
  }, [isInitialized]); // Mantener isInitialized como dependencia

  // Manejo del submit del formulario de login
  const handleLoginSubmit = useCallback(async (e: React.FormEvent, recaptchaToken: string, recaptchaValid: boolean) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      if (!recaptchaToken || !recaptchaValid) {
        setErrorMessage("Por favor completa y valida el reCAPTCHA.");
        return;
      }

      // Realizar login
      const result = await login({ email, password, recaptchaToken });
      
      // Log para depuración
      console.log("Resultado del login:", {
        hasToken: !!result.token,
        hasUser: !!result.user,
        userData: result.user,
        message: result.message
      });
      
      if (result.error) {
        // Loguear errores del servicio si contienen detalles técnicos
        if (result.details) {
          console.error("Error en login:", result.details);
        }
        setErrorMessage(result.message);
        return;
      }
      
      if (!result.token) {
        setErrorMessage("No se recibió un token de autenticación");
        return;
      }
      
      // Limpiar formulario inmediatamente
      setEmail("");
      setPassword("");
      setErrorMessage(null);
      setSuccessMessage("Inicio de sesión exitoso. Redirigiendo...");
      
      // Asegurar que la sesión esté guardada (el servicio ya lo hace, pero por seguridad)
      tokenManager.saveSession(result.token, result.user);
      
      // Usar directamente los datos del resultado del login
      setToken(result.token);
      setUser(result.user);
      setIsExpired(false);
      
      // Actualizar estado de inicializado si no lo está
      if (!isInitialized) {
        setIsInitialized(true);
      }
      
      // Forzar una actualización inmediata del estado
      setTimeout(() => {
        refresh();
      }, 100);
      
      // Redirigir inmediatamente sin esperar
      router.push("/dashboard");
      
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error iniciando sesión:", error);
    } finally {
      setLoading(false);
    }
  }, [email, password, router, isInitialized, refresh]); // Incluir todas las dependencias

  // Cargar al montar y escuchar cambios en localStorage
  useEffect(() => {
    refresh();
    
    // Escuchar cambios en localStorage para sincronizar pestañas
    const handleStorageChange = () => {
      refresh();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refresh]);

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
    successMessage,
    errorMessage,
    handleLoginSubmit
  };
}
