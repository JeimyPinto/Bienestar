"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import ProfileCard from "../user/profileCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import { getToken } from "../lib/getToken";
import { getUserPayloadFromToken } from "../lib/getUserToken";
import { User } from "../lib/interface";

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Obtiene el token de autorización del localStorage
  useEffect(() => {
    getToken({ setToken, setError, setLoading });
  }, []);
  
  //Obtiene el usuario del token y lo actualiza conforme cambie el token
  useEffect(() => {
    if (token) {
      const result = getUserPayloadFromToken(token);
      if (result.user) {
        setUser(result.user);
      } else {
        setError(
          result.error ||
          "Error al obtener usuario del token / Error getting user from token"
        );
        setUser(null);
      }
    }
  }, [token]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <ProfileCard />
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Solicitudes de Remisión Pendientes
          </h2>
          <button
            className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
            onClick={() => router.push("/request")}
          >
            Crear una solicitud
          </button>
          <div>
            <p>No hay solicitudes pendientes.</p>
          </div>
        </section>
        {user &&
          (user.role === "admin" ? (
            <DashboardAdmin token={token ?? ""} />
          ) : (
            <DashboardUser token={token ?? ""} />
          ))}
      </main>
    </>
  );
}
