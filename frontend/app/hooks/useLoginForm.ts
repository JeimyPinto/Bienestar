import { useState } from "react";
import { login } from "../services/services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { UseLoginFormProps } from "../types/login"


export function useLoginForm({ recaptchaToken, recaptchaValid }: UseLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { refresh } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!recaptchaToken || !recaptchaValid) {
        setError("Por favor completa y valida el reCAPTCHA.");
        setLoading(false);
        return;
      }
      const { token: loginToken, error: loginError } = await login({ email, password, recaptchaToken });
      if (loginError) {
        setError(loginError);
        setLoading(false);
        return;
      }
      if (!loginToken) {
        setError("No se recibió un token de autenticación");
        setLoading(false);
        return;
      }
      
      // Guardar token de manera síncrona
      if (
        process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
        process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
      ) {
        localStorage.setItem("token", loginToken);
      }
      
      // Actualizar estado de autenticación de manera síncrona
      await refresh();
      
      // Solo redirigir después de que todo esté completamente actualizado
      setLoading(false);
      router.push("/dashboard");
      
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error iniciando sesión:", error);
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    handleSubmit,
  };
}
