import Image from "next/image";
import ErrorMessage from "../ui/errorMessage";
import ReCAPTCHA from "react-google-recaptcha";
import {LoginFormProps} from "../types/";

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
      className="w-full max-w-md bg-white/95 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg mt-6 flex flex-col gap-4"
      autoComplete="on"
      onSubmit={handleSubmit}
      aria-busy={loading}
    >
      {error && <ErrorMessage message={error} />}
      {recaptchaError && <ErrorMessage message={recaptchaError} />}
      <div className="relative">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <Image
          src="/images/ico-mail.svg"
          alt="Icono email"
          width={24}
          height={24}
          className="absolute left-3 top-12 -translate-y-1/2"
        />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="ejemplo@correo.com"
          className="w-full p-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta transition text-sm sm:text-base"
        />
      </div>
      <div className="relative">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="password"
        >
          Contraseña
        </label>
        <Image
          src="/images/ico-password.svg"
          alt="Icono contraseña"
          width={24}
          height={24}
          className="absolute left-3 top-12 -translate-y-1/2"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="Tu contraseña"
          className="w-full p-3 pl-12 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta transition text-sm sm:text-base"
        />
      </div>
      <div className="flex items-center justify-center mt-2 sm:mt-4">
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
        className="w-full bg-magenta text-white font-semibold py-3 px-4 rounded-lg hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
      <div className="text-center mt-2">
        <a
          href="mailto:bienestarregionalcaldascpic@gmail.com"
          className="text-cian underline text-sm hover:text-magenta transition"
        >
          ¿Necesitas ayuda? Contáctanos
        </a>
      </div>
    </form>
  );
}
