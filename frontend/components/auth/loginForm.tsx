import ReCAPTCHA from "react-google-recaptcha";

type LoginFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error?: string;
  successMessage?: string;
  recaptchaError?: string;
  recaptchaValid: boolean;
  handleRecaptchaChange: (value: string | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  recaptchaRef: React.RefObject<ReCAPTCHA>;
};

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  successMessage,
  recaptchaError,
  recaptchaValid,
  handleRecaptchaChange,
  handleSubmit,
  recaptchaRef,
}: LoginFormProps) {
  return (
    <div className="w-full max-w-md mt-6 bg-gradient-to-br from-white to-azul-cielo/5 rounded-2xl shadow-2xl p-8 border border-azul-cielo/20 backdrop-blur-sm animate-fade-in-up">
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex flex-col gap-6"
      >
        {/* Mensajes de éxito y error */}
        {successMessage && (
          <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}
        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        {recaptchaError && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{recaptchaError}</span>
          </div>
        )}

        {/* Campo de Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-azul-oscuro flex items-center gap-2">
            <span>📧</span>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg bg-white/80 text-azul-oscuro placeholder-azul-marino/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-azul-cielo/50"
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-azul-oscuro flex items-center gap-2">
            <span>🔒</span>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="Tu contraseña"
            className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg bg-white/80 text-azul-oscuro placeholder-azul-marino/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-azul-cielo/50"
          />
        </div>

        {/* ReCAPTCHA */}
        <div className="flex items-center justify-center mt-2 sm:mt-4 p-3 bg-gradient-to-r from-azul-cielo/10 to-beige-claro/20 rounded-lg border border-azul-cielo/20">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={handleRecaptchaChange}
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={loading || !recaptchaValid}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 mt-3 ${
            loading || !recaptchaValid
              ? 'bg-neutral cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-primary to-azul-cielo hover:from-azul-cielo hover:to-primary hover:scale-105 hover:shadow-xl active:scale-95'
          } ${loading ? 'flex items-center justify-center gap-2' : ''}`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Cargando...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>

        {/* Enlace de ayuda */}
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
    </div>
  );
}
