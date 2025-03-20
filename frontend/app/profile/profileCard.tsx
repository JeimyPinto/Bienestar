"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types";
import { fetchUserById } from "../user/endpoints";

/**
 * Componente que representa la tarjeta de perfil del usuario.
 * @returns {JSX.Element} Tarjeta de perfil del usuario.
 * @constructor
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex container mx-auto p-4 bg-white shadow-lg rounded-lg justify-center">
      {user ? (
        <>
          <div className="flex flex-col p-6 mb-6 gap-2 items-center">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <Image
              src={
                previewImage ||
                (user.image
                  ? `${
                      process.env.NEXT_PUBLIC_API_URL
                    }/uploads/images/profile/${user.id}/${encodeURIComponent(
                      user.image
                    )}`
                  : "/images/logo-sena.png")
              }
              priority={true}
              alt={`Foto de perfil de ${user.firstName} ${user.lastName}`}
              className="object-cover rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              width={300}
              height={300}
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
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
        <p>{error ? error : "Cargando..."}</p>
      )}
    </div>
  );
}
