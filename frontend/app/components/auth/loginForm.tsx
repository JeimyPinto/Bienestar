import ReCAPTCHA from "react-google-recaptcha";
import { LoginFormProps } from "../../../interface/login";
import { Button, Input, Card, ErrorMessage } from "../../../ui";

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
    <Card variant="gradient" className="w-full max-w-md mt-6 animate-fade-in-up">
      <form
        autoComplete="on"
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex flex-col gap-4"
      >
        {error && <ErrorMessage message={error} />}
        {recaptchaError && <ErrorMessage message={recaptchaError} />}
        
        <Input
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="ejemplo@correo.com"
          icon="📧"
        />
        
        <Input
          type="password"
          id="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="Tu contraseña"
          icon="🔒"
        />
        
        <div className="flex items-center justify-center mt-2 sm:mt-4 p-3 bg-gradient-to-r from-azul-cielo/10 to-beige-claro/20 rounded-lg border border-azul-cielo/20">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={handleRecaptchaChange}
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !recaptchaValid}
          loading={loading}
          className="mt-3"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </Button>
        
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
    </Card>
  );
}
