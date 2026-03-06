import ReCAPTCHA from "react-google-recaptcha";
import { Mail, Lock, AlertCircle, CheckCircle, ArrowRight, LifeBuoy } from "lucide-react";

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
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
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
    <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-black text-azul-oscuro mb-2">Ingresar</h2>
        <p className="text-azul-marino/60 text-sm font-medium">Gestiona tus solicitudes de bienestar</p>
      </div>

      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex flex-col gap-6"
      >
        {/* Mensajes de éxito y error */}
        {(successMessage || error || recaptchaError) && (
          <div className="space-y-3">
            {successMessage && (
              <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-2xl flex items-center gap-3 animate-fade-in">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs font-semibold">{successMessage}</span>
              </div>
            )}
            {(error || recaptchaError) && (
              <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-2xl flex items-center gap-3 animate-fade-in">
                <AlertCircle className="w-5 h-5" />
                <span className="text-xs font-semibold">{error || recaptchaError}</span>
              </div>
            )}
          </div>
        )}

        {/* Campo de Email */}
        <div className="space-y-2 group">
          <label htmlFor="email" className="text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest px-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-azul-marino/30 group-focus-within:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="nombre@misena.edu.co"
              className="w-full pl-12 pr-4 py-4 bg-azul-cielo/5 border-2 border-transparent rounded-2xl text-azul-oscuro placeholder-azul-marino/20 focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Campo de Contraseña */}
        <div className="space-y-2 group">
          <label htmlFor="password" className="text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest px-1">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-azul-marino/30 group-focus-within:text-primary transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 bg-azul-cielo/5 border-2 border-transparent rounded-2xl text-azul-oscuro placeholder-azul-marino/20 focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* ReCAPTCHA */}
        <div className="flex items-center justify-center mt-2 p-4 bg-white/50 rounded-3xl border border-azul-cielo/10 shadow-inner overflow-hidden">
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
          className={`group w-full py-5 px-6 rounded-2xl font-display font-black text-white transition-all duration-500 shadow-xl ${loading || !recaptchaValid
            ? 'bg-neutral/20 text-azul-marino/20 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-primary via-primary-dark to-azul-oscuro hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]'
            } flex items-center justify-center gap-3`}
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Acceder al Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Enlace de ayuda */}
        <div className="flex justify-center mt-4">
          <a
            href="mailto:bienestarregionalcaldascpic@gmail.com"
            className="flex items-center gap-2 text-azul-marino/40 text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors duration-300"
          >
            <LifeBuoy className="w-4 h-4" />
            ¿Necesitas ayuda técnica?
          </a>
        </div>
      </form>
    </div>
  );
}
