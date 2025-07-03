"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../services/auth";

/**
 * Hook para manejar el formulario de login
 * El estado de autenticación se maneja via AuthContext
 */
export function useAuth() {
  // Obtener estado y métodos del AuthContext
  const { token, user, isInitialized, isAuthenticated, setAuth, clearAuth } = useAuthContext();
  
  // Estados del formulario de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const router = useRouter();

  // Logout: usar el método del contexto
  const logout = useCallback(() => {
    clearAuth();
    // Limpiar también el formulario y mensajes
    setEmail("");
    setPassword("");
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [clearAuth]);

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
      
      if (result.error) {
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
      
      // Limpiar formulario y mostrar éxito
      setEmail("");
      setPassword("");
      setErrorMessage(null);
      setSuccessMessage("Inicio de sesión exitoso. Redirigiendo...");
      
      // Actualizar el contexto de autenticación
      setAuth(result.token, result.user);
      
      // Redirigir al dashboard
      router.push("/dashboard");
      
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error iniciando sesión:", error);
    } finally {
      setLoading(false);
    }
  }, [email, password, router, setAuth]);

  return { 
    // Estados de sesión del AuthContext
    token, 
    user, 
    isExpired: !isAuthenticated,
    isInitialized,
    logout,
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
