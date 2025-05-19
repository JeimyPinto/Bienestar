"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import IcoBack from "../ui/ico-back";
import Footer from "../ui/footer";
import ErrorMessage from "../ui/ErrorMessage";
import ServiceTable from "./ServiceTable";
import { Service } from "../lib/interface";
import { getToken } from "../lib/getToken";
import { fetchServices } from "./endpoints";
import { jwtDecode, JwtPayload as BaseJwtPayload } from "jwt-decode";

interface JwtPayload extends BaseJwtPayload {
  id?: string;
  firstName?: string;
  role?: string;
}
export default function ServicePage(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const router = useRouter();

  // Obtiene el token de autorización del localStorage
   useEffect(() => {
     getToken({ setToken, setError, setLoading });
   }, []);

  // Obtiene el payload del token para ver su role
  useEffect(() => {
    if (token) {
      try {
        const tokenPayload = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          console.warn("El token ha expirado.");
          localStorage.removeItem("token");
          setError("El token ha expirado");
          setLoading(false);
        } else {
          setUser({
            id: tokenPayload.id,
            firstName: tokenPayload.firstName,
            role: tokenPayload.role,
            exp: tokenPayload.exp,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
        setError("Error al decodificar el token");
        setLoading(false);
      }
    }
  }, [token]);

  const loadServices = async () => {
    if (!token || loading) return;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const { services, message } = await fetchServices(token);
      setServices(services || []);
      console.log("services", services);
      if (message) setSuccessMessage(message);
    } catch (err) {
      setError("Error al obtener los servicios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };
  return (
    <>
      <Header />
      <IcoBack role={user?.role ?? ""} />
      <main className="flex flex-col md:flex-row justify-between items-center mb-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 ml-20">
          Lista de Sevicios
        </h1>
        <button
          onClick={openDialog}
          className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300"
        >
          Añadir Nuevo Servicio
        </button>
      </main>
      <div className="relative">
        {loading && (
          <div className="text-center text-cian my-4">Cargando...</div>
        )}
        {successMessage && (
          <div className="text-center text-green-600 my-4">
            {successMessage}
          </div>
        )}
        {error && <ErrorMessage message={error} onRetry={loadServices} />}
        <ServiceTable services={services} setServices={setServices} />
      </div>
      <Footer />
    </>
  );
}
