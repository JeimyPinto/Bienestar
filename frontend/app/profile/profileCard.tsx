"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types";

/**
 * Componente que representa la tarjeta de perfil del usuario.
 * @returns {JSX.Element} Tarjeta de perfil del usuario.
 * @constructor
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setUser(user);
    }
  }, []);

  return (
    <div className="flex container mx-auto p-4 bg-white shadow-lg rounded-lg justify-center">
      {user ? (
        <>
          <div className="flex flex-col p-6 mb-6 gap-2 items-center">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <label htmlFor="fileInput">
              <Image
              src={
                user.image
                ? `/images/profile/${user.id}/${user.image}`
                : "/images/profile/default.png"
              }
              alt={`Foto de perfil de ${user.firstName} ${user.lastName}`}
              className="object-cover cursor-pointer rounded-full"
              width={200}
              height={200}
              priority={true}
              />
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload logic here
                  console.log(file);
                }
              }}
            />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <p>
              <strong>Nombre Completo:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Tipo de Documento:</strong> 
              {user.documentType === "CC"
                ? " Cédula de ciudadanía"
                : user.documentType === "TI"
                ? " Tarjeta de identidad"
                : user.documentType === "CE"
                ? " Cédula de extranjería"
                : user.documentType}
            </p>
            <p>
              <strong>Documento:</strong> {user.documentNumber}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
            <p>
              <strong>Estado de Cuenta:</strong> {user.status}
            </p>
            <Link
              href={"/profile"}
              className="bg-azul text-white py-2 px-4 rounded text-center hover:bg-cian hover:text-lg"
            >
              Editar
            </Link>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}