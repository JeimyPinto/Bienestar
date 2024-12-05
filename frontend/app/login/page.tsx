"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verifica si el usuario está logueado
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem("token");
      if (isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fallo al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Hacer una solicitud al endpoint /dashboard para obtener los datos del usuario
      const dashboardResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (!dashboardResponse.ok) {
        throw new Error("Algo ha fallado mientras se redireccionaba al dashboard");
      }

      const dashboardData = await dashboardResponse.json();
      router.push(`/dashboard?user=${encodeURIComponent(JSON.stringify(dashboardData.user))}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
  );
};

export default LoginPage;
