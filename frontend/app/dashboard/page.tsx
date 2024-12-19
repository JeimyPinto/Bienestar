"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../ui/header";
import Link from "next/link";

interface User {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  telefono: string;
  email: string;
  estado: string;
  rol: string;
  imagen: string;
}
const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUser(user);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {user ? (
          <div className="flex bg-white shadow-lg rounded-lg p-6 mb-6 gap-2">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <div className="flex flex-col">
              <p>
                <strong>Nombre Completo:</strong> {user.nombre} {user.apellido}
              </p>
              <p>
                <strong>Documento:</strong> {user.documento}
              </p>
              <p>
                <strong>Teléfono:</strong> {user.telefono}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong>
                {user.rol}
              </p>
              <p>
                <strong>Estado de Cuenta:</strong> {user.estado}
              </p>
              <Link
                href={"/profile"}
                className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
              >
                Editar
              </Link>
            </div>
            <Image
              src={
                user.imagen
                  ? `/images/profile/${user.id}/${user.imagen}`
                  : "/images/logo-sena.png"
              }
              alt={user.nombre}
              className="object-cover"
              width={300}
              height={300}
              priority={false}
            />
          </div>
        ) : (
          <p>Cargando...</p>
        )}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Solicitudes de Remisión Pendientes
          </h2>
          <div>
            <p>No hay solicitudes pendientes.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
