"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Error al obtener los datos del usuario");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          setError(null); // Clear any previous errors
          // Fetch the updated user data
          const updatedResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/usuarios/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (updatedResponse.ok) {
            const updatedUserData = await updatedResponse.json();
            setUser(updatedUserData);
          } else {
            console.error(
              "Error al obtener los datos actualizados del usuario"
            );
          }
        } else {
          const errorData = await response.json();
          console.error("Error al actualizar los datos:", errorData);
          setError(errorData.message || "Error desconocido");
        }
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        if (error instanceof Error) {
          setError(error.message || "Error desconocido");
        } else {
          setError("Error desconocido");
        }
      }
    }
  };

  return (
    <div className="flex container mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg justify-center">
      <div className="fixed top-6 left-5 bg-azul p-2 rounded-lg hover:bg-cian hover:scale-125 transition-transform duration-300">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Image
            src="/images/ico-back.svg"
            alt="Icon Back"
            width={42}
            height={42}
            className="hover:filter hover:brightness-0 hover:invert"
          />
        </Link>
      </div>
      {user ? (
        <form className="flex flex-col text-lg gap-4" onSubmit={handleSubmit}>
          <div className="col-span-6 text-center">
            <h2 className="text-5xl font-bold mb-4 text-azul">
              Información del Usuario
            </h2>
          </div>
          <div className="grid grid-cols-7 grid-rows-8 gap-4">
            <div className="col-span-2 row-span-6">
              <label htmlFor="fileInput">
                <Image
                  src={
                    user.imagen
                      ? `/images/profile/${user.id}/${user.imagen}`
                      : "/images/logo-sena.png"
                  }
                  alt={user.nombre}
                  className="object-cover rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                  width={300}
                  height={300}
                  priority={false}
                />
              </label>
            </div>
            <div className="col-start-3">
              <label className="font-semibold text-magenta">
                Nombre Completo:
              </label>
            </div>
            <div className="col-span-2 col-start-4">
              <input
                type="text"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div className="col-span-2 col-start-6">
              <input
                type="text"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian mt-2"
              />
            </div>
            <div className="col-start-3 row-start-2">
              <label className="font-semibold text-magenta">
                Tipo de Documento:
              </label>
            </div>
            <div className="col-span-2 col-start-4 row-start-2">
              <select
                name="tipoDocumento"
                value={user.tipoDocumento}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
                <option value="RC">Registro Civil</option>
                <option value="PEP">Permiso Especial de Permanencia</option>
              </select>
            </div>
            <div className="col-start-3 row-start-3">
              <label className="font-semibold text-magenta">Documento:</label>
            </div>
            <div className="col-span-2 col-start-4 row-start-3">
              <input
                type="text"
                name="documento"
                value={user.documento}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div className="col-start-3 row-start-4">
              <label className="font-semibold text-magenta">Teléfono:</label>
            </div>
            <div className="col-span-2 col-start-5 row-start-4">
              <input
                type="text"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div className="col-start-3 row-start-5">
              <label className="font-semibold text-magenta">Email:</label>
            </div>
            <div className="col-span-5 col-start-4 row-start-5">
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div className="col-start-3 row-start-6">
              <label className="font-semibold text-magenta">Rol:</label>
            </div>
            <div className="col-span-2 col-start-4 row-start-6">
              {" "}
              <input
                type="text"
                name="rol"
                value={user.rol}
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div className="col-start-3 row-start-7">
              <label className="font-semibold text-magenta">
                Estado de Cuenta:
              </label>
            </div>
            <div className="col-span-2 col-start-4 row-start-7">
              {" "}
              <input
                type="text"
                name="estado"
                value={user.estado}
                onChange={handleChange}
                readOnly
                className="border p-2 rounded bg-gray-100"
              />
            </div>
            <div className="col-span-5 col-start-2 row-start-8">
              <button
                type="submit"
                className="bg-azul w-full text-white px-20 py-2 rounded-lg text-center hover:bg-cian hover:text-lg shadow-md transition-all duration-300"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
