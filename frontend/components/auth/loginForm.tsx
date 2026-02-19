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
    <div className="w-full max-w-md mt-6 glass-card rounded-2xl p-8 border border-white/20 animate-fade-in-up">
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex flex-col gap-6"
      >
        {/* Mensajes de éxito y error */}
        {successMessage && (
          <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}
        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        {recaptchaError && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{recaptchaError}</span>
          </div>
        )}

        {/* Campo de Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-display font-semibold text-azul-oscuro flex items-center gap-2">
            <span>📧</span>
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            className="w-full px-4 py-3 border border-azul-cielo/30 rounded-xl bg-white/50 text-azul-oscuro placeholder-azul-marino/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:bg-white"
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-display font-semibold text-azul-oscuro flex items-center gap-2">
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
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-azul-cielo/30 rounded-xl bg-white/50 text-azul-oscuro placeholder-azul-marino/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:bg-white"
          />
        </div>

        {/* ReCAPTCHA */}
        <div className="flex items-center justify-center mt-2 p-4 bg-white/30 rounded-2xl border border-white/40 shadow-inner">
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
          className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-white transition-all duration-300 shadow-lg ${loading || !recaptchaValid
              ? 'bg-neutral/50 text-azul-marino/30 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-primary to-azul-cielo hover:shadow-primary/30 hover:scale-[1.02] active:scale-95'
            } ${loading ? 'flex items-center justify-center gap-2' : ''}`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verificando...
            </>
          ) : (
            'Ingresar al Portal'
          )}
        </button>

        {/* Enlace de ayuda */}
        <div className="text-center mt-2">
          <a
            href="mailto:bienestarregionalcaldascpic@gmail.com"
            className="text-azul-marino/60 text-xs hover:text-primary transition-colors duration-300 font-medium inline-flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 bg-azul-cielo rounded-full group-hover:scale-150 transition-transform"></span>
            ¿Tienes problemas para ingresar?
          </a>
        </div>
      </form>
    </div>
  );
}
