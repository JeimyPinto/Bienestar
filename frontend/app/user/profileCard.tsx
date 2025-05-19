"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/interface";
import { getToken } from "../lib/getToken";
import { fetchUserById } from "../user/endpoints";

/**
 * Componente que representa la tarjeta de perfil del usuario.
 * @returns {JSX.Element} Tarjeta de perfil del usuario.
 */
export default function ProfileCard(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userImage, setUserImage] = useState<string | null>(null);

  // Obtiene el token de autorización del localStorage
  useEffect(() => {
    getToken({ setToken, setError, setLoading });
  }, []);

  // Función para cargar los datos del usuario
  const loadUserData = async (token: string) => {
    try {
      const { user, message, image } = await fetchUserById(token);
      if (user) {
        setUser(user);
        setUserImage(image || "/images/profile/default.png");
      } else {
        setError(message || "No se encontró el usuario.");
      }
    } catch (err) {
      setError("Error al cargar los datos del usuario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar los datos del usuario cuando el token esté disponible
  useEffect(() => {
    if (token) {
      loadUserData(token);
    }
  }, [token]);

  return (
    <div className="flex container mx-auto p-4 bg-white shadow-lg rounded-lg justify-center">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <div className="text-red-500 bg-red-100 p-4 rounded-md shadow-md">
          <p className="font-semibold">¡Ups! Algo salió mal:</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Cargar nuevamente
          </button>
        </div>
      ) : user ? (
        <>
          <div className="flex flex-col p-6 mb-6 gap-2 items-center">
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <Image
              src={userImage || "/images/profile/default.png"}
              priority={true}
              alt={`Foto de perfil de ${user.firstName} ${user.lastName}`}
              className="object-cover rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL="/images/profile/default.png"
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p>
              <strong>Nombre Completo:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Tipo de Documento:</strong>{" "}
              {user.documentType === "CC"
                ? "Cédula de ciudadanía"
                : user.documentType === "TI"
                ? "Tarjeta de identidad"
                : user.documentType === "CE"
                ? "Cédula de extranjería"
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
        <p>No se encontraron datos del usuario.</p>
      )}
    </div>
  );
}
