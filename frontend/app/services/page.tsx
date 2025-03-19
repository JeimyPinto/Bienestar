"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import Footer from "../ui/footer";
import ServiciosGallery from "./gallery";
import { fetchUserById } from "../dashboard/user/endpoints";
import { User } from "../lib/types";

/**
 * Componente que representa la página de servicios.
 * @returns {JSX.Element} Página de servicios.
 * @constructor
 * @version 19/03/2025
 * @autor Jeimy Pinto
 */
export default function ServicePage(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        try {
          const userData = await fetchUserById(userId, token);
          setUser(userData);
        } catch (error) {
          setError("Error al obtener los datos del usuario");
        }
      } else {
        setError("No se encontró el token de autenticación");
      }
    };

    fetchUserData();
  }, []);

  const handleDashboardRedirect = () => {
    if (user) {
      if (user.role === "user") {
        router.push("/dashboard/user");
      } else {
        router.push("/dashboard/admin");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="relative">
        <button
          onClick={handleDashboardRedirect}
          className="absolute top-4 right-4 bg-azul text-white py-2 px-4 rounded hover:bg-cian transition-colors"
        >
          Ir al Dashboard
        </button>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md mt-4">
            <p>{error}</p>
          </div>
        )}
        <ServiciosGallery />
      </div>
      <Footer />
    </>
  );
}