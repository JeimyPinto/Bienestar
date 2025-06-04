"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../ui/header"
import UserCard from "../users/userCard"
import DashboardAdmin from "./admin/page"
import DashboardUser from "./user/page"
import { User } from "../types/user"
import { ENABLED_ROLES } from "../lib/enabledRoles"


export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    let tokenValue: string | null = null;

    // Obtener el token dependiendo del entorno
    if (
      process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
      process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
    ) {
      tokenValue = localStorage.getItem("token");
    } else {
      const cookie = document.cookie;
      tokenValue =
        cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || null;
    }

    if (tokenValue) {
      try {
        setUser(JSON.parse(atob(tokenValue.split(".")[1])));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <UserCard user={user} />
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
            <DashboardAdmin />
          ) : (
            <DashboardUser />
          ))}
      </main>
    </>
  );
}
