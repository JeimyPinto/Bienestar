"use client";

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image";
import Header from "../ui/header"
import Footer from "../ui/footer"
import ErrorMessage from "../ui/errorMessage";
import ReCAPTCHA from "react-google-recaptcha"
import { login } from "../services/services/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA. / Por favor completa el reCAPTCHA.");
        return setLoading(false);
      }

      const { message, token, error } = await login({ email, password, recaptchaToken });

      if (error) {
        setError("Error al iniciar sesión. / Error logging in. ( " + error + " )");
        setLoading(false);
        return;
      }
      if (message) {
        setLoading(false);
      }
      if (!token) {
        setError("No se recibió un token de autenticación. / No authentication token received.");
        setLoading(false);
        return;
      }
      //Si el entorno es localhost, guarda el token en localStorage, de lo contrario, lo salva en una cookie
      if (
        process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
        process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
      ) {
        localStorage.setItem("token", token);
      } else {
        const tokenValue = document.cookie
          .split("; ")
          .find(row => row.startsWith("token="))
          ?.split("=")[1];
        setToken(tokenValue || null);
      }

      router.push("/dashboard");
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message || "Error al iniciar sesión. / Error logging in." : "Error al iniciar sesión. / Error logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-8 sm:px-4 sm:py-12 md:py-16 rounded-xl shadow-xl mx-auto w-full max-w-7xl">
        {token ? (
          <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white/90 rounded-lg p-4 sm:p-6 shadow-md mt-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
              Ya tienes una sesión iniciada
            </h1>
            <p className="text-base sm:text-lg text-gray-700 text-center mb-4">
              Debes cerrar sesión antes de iniciar con otra cuenta.
            </p>
            <button
              className="mt-2 px-6 py-3 bg-magenta text-white rounded-lg font-semibold hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition w-full sm:w-auto"
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
              Bienvenido al Portal de Bienestar del Aprendiz
            </h1>
            <div className="bg-white/90 rounded-lg p-3 sm:p-5 md:p-6 shadow-md w-full max-w-lg mt-2 sm:mt-4">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-2">
                ¡Hola! Para iniciar sesión, asegúrate de haber sido{" "}
                <span className="underline decoration-wavy decoration-cian font-semibold">
                  registrado previamente
                </span>{" "}
                por el Área de Bienestar del Aprendiz.
              </p>
            </div>
            <form
              className="w-full max-w-md bg-white/95 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg mt-6 flex flex-col gap-4"
              autoComplete="on"
              onSubmit={handleSubmit}
              aria-busy={loading}
            >
              {error && <ErrorMessage message={error} />}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  className="w-full p-3 pl-12 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta transition text-sm sm:text-base"
                />
                <button
                  type="button"
                  tabIndex={0}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-12 -translate-y-1/2 focus:outline-none"
                >
                  <Image
                    src={showPassword ? "/images/ico-eye-visibility-on.svg" : "/images/ico-eye-visibility-off.svg"}
                    alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <div className="flex items-center justify-center mt-2 sm:mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={(token) => setRecaptchaToken(token as string | null)}
                />
              </div>
              <button
                type="submit"
                aria-disabled={loading || !recaptchaToken}
                className="w-full bg-magenta text-white font-semibold py-3 px-4 rounded-lg hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
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
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

