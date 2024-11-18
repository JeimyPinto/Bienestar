"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario está logueado
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [router]);

  /**
   * Función para manejar el login
   * Crea una petición POST al servidor con los datos de login
   * Si la petición es exitosa, guarda el token en el localStorage y redirige al dashboard
   * Si la petición falla, muestra un mensaje de error
   * @param e Evento del formulario
   * @returns void
   * @version 18/1/2024
   * @author Jeimy Pinto
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Fallo al iniciar sesión");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center py-20 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">
          Ingresa al portal de servicios de bienestar al aprendiz
        </h1>
        <div className="py-5">
          <p>
            Ten en cuenta que no podrás ingresar si no has sido previamente
            registrado por el Área de bienestar al aprendiz.
          </p>
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
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-magenta-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-magenta text-white rounded-lg hover:bg-magenta-600 focus:outline-none focus:ring-2 focus:ring-magenta-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
