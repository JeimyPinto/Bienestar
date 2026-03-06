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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 sm:p-4 lg:p-8 bg-[url('/images/pattern.svg')] bg-repeat">
      <main className="w-full max-w-[1400px] min-h-[auto] lg:min-h-[800px] bg-azul-oscuro rounded-none sm:rounded-[3rem] shadow-[0_32px_120px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row relative group">

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-br from-primary/20 to-transparent blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-gradient-to-tr from-azul-cielo/20 to-transparent blur-[100px] pointer-events-none"></div>

        {token ? (
          <div className="flex-1 flex items-center justify-center p-8 sm:p-12 z-10">
            <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-[3rem] p-8 sm:p-16 border border-white/10 shadow-2xl animate-fade-in-up">
              <ActiveSessionMessage onLogout={logout} />
            </div>
          </div>
        ) : (
          <>
            {/* Seccion Izquierda: Branding e Info */}
            <div className="flex-1 lg:flex-[1.2] border-b lg:border-b-0 lg:border-r border-white/10 z-10">
              <LoginWelcome />
            </div>

            {/* Seccion Derecha: Formulario */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 z-10">
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
            </div>
          </>
        )}
      </main>
    </div>
  );
}
