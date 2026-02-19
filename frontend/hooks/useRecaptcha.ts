import { useState } from "react";
import { verifyRecaptchaBackend } from "../services/auth";

export function useRecaptcha() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);

  const handleRecaptchaChange = async (token: string | null) => {
    // Si el token es el mismo que ya tenemos o es nulo, no hacemos nada
    if (!token || token === recaptchaToken) {
      if (!token) {
        setRecaptchaToken(null);
        setRecaptchaValid(false);
      }
      return;
    }

    setRecaptchaToken(token);
    setRecaptchaValid(false);
    setRecaptchaError("");
    setRecaptchaLoading(true);

    try {
      const recaptchaResult = await verifyRecaptchaBackend(token);
      if (recaptchaResult.success) {
        setRecaptchaValid(true);
      } else {
        // Ignorar el error si es timeout-or-duplicate y ya estamos validos
        const isDuplicate = recaptchaResult.details?.includes("timeout-or-duplicate");
        if (isDuplicate && recaptchaValid) {
          return;
        }
        setRecaptchaError(recaptchaResult.message || "reCAPTCHA inválido.");
        setRecaptchaValid(false);
      }
    } catch (err) {
      setRecaptchaError("Error al conectar con el servicio de verificación.");
    } finally {
      setRecaptchaLoading(false);
    }
  };

  return {
    recaptchaToken,
    recaptchaValid,
    recaptchaError,
    recaptchaLoading,
    handleRecaptchaChange,
    setRecaptchaToken,
    setRecaptchaValid,
    setRecaptchaError,
  };
}
