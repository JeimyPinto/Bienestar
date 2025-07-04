"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../hooks/useAuth";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import LoginForm from "../../components/auth/loginForm";
import LoginWelcome from "../../components/auth/loginWelcome";
import ActiveSessionMessage from "../../components/auth/activeSessionMessage";

export default function LoginPage() {
  const { 
    token, 
    logout,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMessage,
    successMessage,
    handleLoginSubmit
  } = useAuth();
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    recaptchaToken,
    recaptchaValid,
    recaptchaError,
    handleRecaptchaChange,
  } = useRecaptcha();

  // Wrapper para el submit que incluye los datos del recaptcha
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleLoginSubmit(e, recaptchaToken || "", recaptchaValid);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-azul-oscuro via-azul-marino to-azul-claro/40 px-2 py-8 sm:px-4 sm:py-12 md:py-16 rounded-xl shadow-xl mx-auto w-full max-w-7xl backdrop-blur-sm">
        {token ? (
          <ActiveSessionMessage onLogout={logout} />
        ) : (
          <>
            <LoginWelcome />
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              error={errorMessage || undefined}
              successMessage={successMessage || undefined}
              recaptchaError={recaptchaError}
              recaptchaValid={recaptchaValid}
              handleRecaptchaChange={handleRecaptchaChange}
              handleSubmit={handleSubmit}
              recaptchaRef={recaptchaRef}
            />
          </>
        )}
      </main>
    </>
  );
}
