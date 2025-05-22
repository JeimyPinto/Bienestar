"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import { ENABLED_ROLES } from "../lib/enabledRoles";

export default function DashboardPage() {
  const router = useRouter();
  // const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const cookie = document.cookie;
  //   const tokenValue = cookie
  //     .split("; ")
  //     .find(row => row.startsWith("token="))
  //     ?.split("=")[1];

  //   setToken(tokenValue || null);

  //   if (tokenValue) {
  //     try {
  //       setUser(JSON.parse(atob(tokenValue.split(".")[1])));
  //     } catch {
  //       setUser(null);
  //     }
  //   } else {
  //     setUser(null);
  //     // Redirige al login si no hay token
  //     router.push("/auth");
  //   }
  // }, [router]);

  return (
    <>
      <Header />
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
        {/* {user &&
          (ENABLED_ROLES.includes(user.role) ? (
            <DashboardAdmin token={token ?? ""} />
          ) : (
            <DashboardUser token={token ?? ""} />
          ))} */}
      </main>
    </>
  );
}
