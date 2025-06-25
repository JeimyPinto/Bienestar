"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../hooks/useAuth";
import { useRecaptcha } from "../hooks/useRecaptcha";
import { useLoginForm } from "../hooks/useLoginForm";
import LoginForm from "./loginForm";
import ActiveSessionMessage from "./activeSessionMessage";
import LoginWelcome from "./loginWelcome";

export default function LoginPage() {
  const { token, logout } = useAuth();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const {
    recaptchaToken,
    recaptchaValid,
    recaptchaError,
    handleRecaptchaChange,
  } = useRecaptcha();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLoginForm({ recaptchaToken, recaptchaValid });

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-8 sm:px-4 sm:py-12 md:py-16 rounded-xl shadow-xl mx-auto w-full max-w-7xl">
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
              error={error}
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

