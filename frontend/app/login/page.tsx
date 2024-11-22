"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Image from "next/image";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
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
   * Si la petición es exitosa, guarda el token en el localStorage,
   * hace una petición GET al servidor para obtener la ruta del dashboard
   * y redirecciona al dashboard
   * Si la petición falla, muestra un mensaje de error
   * @param e Evento del formulario
   * @version 22/11/2024
   * @author Jeimy Pinto
   */
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
        throw new Error(errorData.message || "Fallo al Cerrar Sesión");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      const dashboardResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/dashboard`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${data.token}`,
        },
      });

      if (!dashboardResponse.ok) {
        throw new Error("Algo ha fallado meintras se redireccionaba al dashboard");
      }

      const dashboardData = await dashboardResponse.json();
      router.push(dashboardData.route);
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
        <h1 className="text-5xl font-bold mb-6">
          Ingresa al portal de servicios de bienestar al aprendiz
        </h1>
        <div className="py-5">
          <p>
            Ten en cuenta que no podrás ingresar si no has sido previamente
            registrado por el Área de bienestar al aprendiz.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-gray-500 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="flex flex-col w-full items-center text-2xl justify-center my-4 text-center">
            <Image
              src="/images/Icono.png"
              alt="Logo"
              width={300}
              height={20}
              className="py-3"
              style={{ width: 'auto', height: 'auto' }}
            />
          <div className="flex justify-center items-center bold bg-cian rounded-md p-1">
            {error && <strong className="mt-4 text-amarillo">{error}</strong>}
          </div>
          </div>
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
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
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
    </>
  );
}

export default LoginPage;
