"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import LoadingOverlay from "../ui/LoadingOverlay";
import ProfileCard from "../user/profileCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import { useAuth } from "../context/AuthContext";
import { ENABLED_ROLES } from "../lib/enabledRoles";
import ErrorMessage from "../ui/ErrorMessage";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("user", user);
    console.log("token", token);
    // Si ya tenemos token y user.role, dejamos de cargar
    if (token && user?.role) {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    // Timeout máximo de 20s para dejar de cargar
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("No se pudo conectar con el servidor. Intenta más tarde.");
      }
    }, 20000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      <Header />
      {loading && <LoadingOverlay />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <main className="container mx-auto p-6">
          {/* <ProfileCard /> */}
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
            (ENABLED_ROLES.includes(user.role) ? (
              <DashboardAdmin token={token ?? ""} />
            ) : (
              <DashboardUser token={token ?? ""} />
            ))}
        </main>
      )}
    </>
  );
}
