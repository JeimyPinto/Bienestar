"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "../ui/footer";
import ReCAPTCHA from "react-google-recaptcha";

/**
 * Componente que representa la página de inicio de sesión.
 * @returns {JSX.Element} Página de inicio de sesión.
 * @constructor
 * @version 18/03/2025
 * @author Jeimy Pinto
 */
const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  /**
   * Función que maneja el inicio de sesión.
   * @param e evento de formulario.
   * @returns {Promise<void>} Retorna una promesa.
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA./ Complete the reCAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, recaptchaToken }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to log in / Error al iniciar sesión"
        );
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Sacar el rol del token decodificado
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
      const userRole = tokenPayload.role;

      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función que maneja el cambio del reCAPTCHA.
   * @param token token del reCAPTCHA.
   * @since 18/05/2025
   * @returns {void} No retorna nada.
   * @version 18/05/2025
   * @autor Jeimy Pinto
   */
  const handleRecaptchaChange = (token: string | null): void => {
    setRecaptchaToken(token);
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center px-6 bg-azul w-full h-30 text-xl text-white">
        <Link href="/">
          <Image
            src="/images/Icono.png"
            priority={true}
            alt="Logo"
            width={300}
            height={20}
            className="p-3"
          />
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Inicia sesión en el portal de bienestar del aprendiz
        </h1>
        <div className="py-5 text-center">
          <p>
            ¡Hola! Para poder iniciar sesión, asegúrate de haber sido{" "}
            <u className="decoration-wavy decoration-cian">
              registrado previamente
            </u>{" "}
            por el Área de Bienestar del Aprendiz. ¡Gracias!
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="flex justify-center mb-6 bg-azul p-4 rounded-lg">
            <Image
              src="/images/Icono.png"
              alt="Logo"
              width={150}
              height={50}
              priority={false}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta"
            />
          </div>
          <div className="mb-6 items center justify-center flex">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleRecaptchaChange}
              theme="dark"
            />
          </div>
          {error && (
            <div className="mb-4 text-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-magenta text-white rounded-lg hover:bg-cian hover:text-azul focus:outline-none focus:ring-2 focus:ring-magenta"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="py-5 text-center">
          <p>
            Si tiene alguna dificultad, puede contactarnos en{" "}
            <a
              href="mailto:portafoliobienestar24@gmail.com"
              className="text-magenta underline"
            >
              portafoliobienestar24@gmail.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
