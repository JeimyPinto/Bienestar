"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "../ui/footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, contrasena }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fallo al iniciar sesión");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      // Hacer una solicitud al endpoint /dashboard para obtener los datos del usuario
      const dashboardResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      if (!dashboardResponse.ok) {
        throw new Error(
          "Algo ha fallado mientras se redireccionaba al dashboard"
        );
      }

      const dashboardData = await dashboardResponse.json();
      router.push(`/dashboard`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center px-6 bg-azul w-full h-30 text-xl text-white">
        <Link href="/">
          <Image
            src="/images/Icono.png"
            alt="Logo"
            width={300}
            height={20}
            className="p-3"
          />
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
        <h1 className="text-5xl font-bold mb-6">
          Ingresa al portal de servicios de bienestar al aprendiz
        </h1>
        <div className="py-5">
          <p>
            Ten en cuenta que no podrás ingresar si no has sido{" "}
            <u className="decoration-wavy decoration-cian">
              previamente registrado
            </u>{" "}
            por el Área de bienestar al aprendiz.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-gray-500 p-8 rounded-lg shadow-md"
        >
          <Image
            src="/images/Icono.png"
            alt="Logo"
            width={600}
            height={100}
            priority={false}
          />{" "}
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500"
            />
          </div>
          <div className="flex justify-center">
            {error && (
              <p className="text-amarillo text-sm mb-4 uppercase">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-magenta text-white rounded-lg hover:bg-cian hover:text-azul hover:border-1 hover:border-magenta focus:outline-none focus:ring-2 focus:ring-magenta-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="py-5">
          <p>
            Si tienes dificultades, puedes contactarnos a{" "}
            <a
              href="mailto:portafoliobienestar24@gmail.com"
              className="text-magenta-500 underline"
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
