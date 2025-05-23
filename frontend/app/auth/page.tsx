"use client";

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../ui/header"
import Footer from "../ui/footer"
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "../services/services/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookie = document.cookie;
    const tokenValue = cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
    setToken(tokenValue || null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!recaptchaToken) {
        setError("Please complete the reCAPTCHA. / Por favor completa el reCAPTCHA.");
        setLoading(false);
        return;
      }
      const { message } = await login({ email, password, recaptchaToken });
      if (message) {
        setError(message);
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al iniciar sesión. / Error logging in.");
      } else {
        setError("Error al iniciar sesión. / Error logging in.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      {token ?
        <main>
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-10 sm:px-4 sm:py-16 rounded-xl shadow-xl mx-auto w-full max-w-5xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
              Ya tienes una sesión iniciada
            </h1>
            <div className="bg-white/90 rounded-lg p-4 sm:p-6 shadow-md w-full max-w-lg mt-2 sm:mt-4 flex flex-col items-center">
              <p className="text-base sm:text-lg text-gray-700 text-center mb-4">
                Debes cerrar sesión antes de iniciar con otra cuenta.
              </p>
              <button
                className="mt-2 px-6 py-3 bg-magenta text-white rounded-lg font-semibold hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </main> :
        <main className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-10 sm:px-4 sm:py-16 rounded-xl shadow-xl mx-auto w-full max-w-9xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
            Bienvenido al Portal de Bienestar del Aprendiz
          </h1>
          <div className="bg-white/90 rounded-lg p-4 sm:p-6 shadow-md w-full max-w-lg mt-2 sm:mt-4">
            <p className="text-base sm:text-lg text-gray-700 text-center mb-2">
              ¡Hola! Para iniciar sesión, asegúrate de haber sido{" "}
              <span className="underline decoration-wavy decoration-cian font-semibold">
                registrado previamente
              </span>{" "}
              por el Área de Bienestar del Aprendiz.
            </p>
          </div>
          <form className="w-full max-w-md bg-white/95 p-6 sm:p-8 rounded-lg shadow-lg mt-6 flex flex-col gap-4"
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="email"
              >
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta transition"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-1"
                htmlFor="password"
              >
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta transition"
              />
            </div>
            <div className="flex items center justify-center mt-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token as string | null)}
              />
            </div>
            {error && (
              <div className="mb-2 text-center">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-magenta text-white rounded-lg font-semibold hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta transition disabled:opacity-60"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
            <div className="text-center mt-2">
              <a
                href="mailto:portafoliobienestar24@gmail.com"
                className="text-cian underline text-sm hover:text-magenta transition"
              >
                ¿Necesitas ayuda? Contáctanos
              </a>
            </div>
          </form>
        </main>
      }
      <Footer />
    </>
  );
};

