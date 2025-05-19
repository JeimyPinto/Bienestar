"use client";

import { useEffect, useState } from "react";
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
        setError(result.error || "Error al obtener usuario del token / Error getting user from token");
        setUser(null);
      }
    }
  }, [token]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <ProfileCard />
        {user &&
          (user.role === "admin" ? <DashboardAdmin /> : <DashboardUser />)}
      </main>
    </>
  );
}
