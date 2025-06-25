import { useState } from "react";
import { login } from "../services/services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

interface UseLoginFormProps {
  recaptchaToken: string | null;
  recaptchaValid: boolean;
}

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
      const { message, token: loginToken } = await login({ email, password, recaptchaToken });
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      if (message) {
        setLoading(false);
      }
      if (!loginToken) {
        setError("No se recibió un token de autenticación");
        setLoading(false);
        return;
      }
      if (
        process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
        process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
      ) {
        localStorage.setItem("token", loginToken);
      }
      refresh();
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error iniciando sesión:", error);
    } finally {
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
