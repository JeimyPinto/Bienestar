import Image from "next/image";
import ErrorMessage from "../ui/errorMessage";
import ReCAPTCHA from "react-google-recaptcha";
import Spinner from "../ui/spinner";
import { LoginFormProps } from "../types/login";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  recaptchaError,
  recaptchaValid,
  handleRecaptchaChange,
  handleSubmit,
  recaptchaRef,
}: LoginFormProps) {
  return (
    <form
      className="w-full max-w-md bg-gradient-to-br from-white/98 to-beige-claro/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border-2 border-azul-cielo/30 mt-6 flex flex-col gap-4 hover:shadow-xl hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
      autoComplete="on"
      onSubmit={handleSubmit}
      aria-busy={loading}
    >
      {error && <ErrorMessage message={error} />}
      {recaptchaError && <ErrorMessage message={recaptchaError} />}
      
      <div className="relative">
        <label
          className="block text-azul-oscuro text-sm font-bold mb-2 flex items-center gap-2"
          htmlFor="email"
        >
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          Email
        </label>
        <Image
          src="/images/ico-mail.svg"
          alt="Icono email"
          width={24}
          height={24}
          className="absolute left-3 top-12 -translate-y-1/2 opacity-70 text-primary"
        />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="ejemplo@correo.com"
          className="w-full p-3 pl-12 border-2 border-azul-cielo/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm sm:text-base bg-white/95 hover:border-azul-claro/70 hover:shadow-md"
        />
      </div>
      
      <div className="relative">
        <label
          className="block text-azul-oscuro text-sm font-bold mb-2 flex items-center gap-2"
          htmlFor="password"
        >
          <span className="w-2 h-2 bg-secondary rounded-full"></span>
          Contraseña
        </label>
        <Image
          src="/images/ico-password.svg"
          alt="Icono contraseña"
          width={24}
          height={24}
          className="absolute left-3 top-12 -translate-y-1/2 opacity-70 text-secondary"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="Tu contraseña"
          className="w-full p-3 pl-12 pr-12 border-2 border-azul-cielo/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 text-sm sm:text-base bg-white/95 hover:border-azul-claro/70 hover:shadow-md"
        />
      </div>
      
      <div className="flex items-center justify-center mt-2 sm:mt-4 p-3 bg-gradient-to-r from-azul-cielo/10 to-beige-claro/20 rounded-lg border border-azul-cielo/20">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleRecaptchaChange}
        />
      </div>
      
      <button
        type="submit"
        aria-disabled={loading || !recaptchaValid}
        disabled={loading || !recaptchaValid}
        className="w-full bg-gradient-to-r from-primary to-azul-claro text-white font-bold py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-azul-claro hover:to-verde-corporativo focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-neutral disabled:to-neutral mt-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-primary/20"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Spinner size="sm" color="primary" />
            <span>Cargando...</span>
          </div>
        ) : (
          "Iniciar sesión"
        )}
      </button>
      
      <div className="text-center mt-4 p-3 bg-gradient-to-r from-beige-claro/30 to-azul-cielo/20 rounded-lg border border-azul-cielo/20">
        <a
          href="mailto:bienestarregionalcaldascpic@gmail.com"
          className="text-azul-oscuro underline text-sm hover:text-primary transition-colors duration-300 font-medium flex items-center justify-center gap-2"
        >
          <span className="w-2 h-2 bg-info rounded-full"></span>
          ¿Necesitas ayuda? Contáctanos
        </a>
      </div>
    </form>
  );
}
