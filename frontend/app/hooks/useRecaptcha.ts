import { useState } from "react";
import { verifyRecaptchaBackend } from "../services/services/auth";

export function useRecaptcha() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaValid, setRecaptchaValid] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);

  const handleRecaptchaChange = async (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaValid(false);
    setRecaptchaError("");
    if (token) {
      setRecaptchaLoading(true);
      const recaptchaResult = await verifyRecaptchaBackend(token);
      if (recaptchaResult.success) {
        setRecaptchaValid(true);
      } else {
        setRecaptchaError(recaptchaResult.message || "reCAPTCHA inválido.");
        setRecaptchaValid(false);
      }
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
