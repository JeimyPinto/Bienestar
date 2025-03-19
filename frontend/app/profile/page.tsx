"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types";

// Array de roles permitidos para editar cualquier información del usuario
const editableRoles = ["admin", "integrante"];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/id/${userId}`,
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
          setError("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setError("Error al obtener los datos del usuario");
      }
    }
  };

  useEffect(() => {
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
          `${process.env.NEXT_PUBLIC_API_URL}/users/id/${user.id}`,
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
          setError(null); // Limpiar cualquier error previo
          // Obtener los datos actualizados del usuario
          const updatedResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/id/${user.id}`,
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
            console.error("Error al obtener los datos actualizados del usuario");
            setError("Error al obtener los datos actualizados del usuario");
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
        <form className="flex flex-col text-lg gap-4 w-full max-w-4xl" onSubmit={handleSubmit}>
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 text-azul">Información del Usuario</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label htmlFor="fileInput">
                <Image
                  src={user.image ? `/images/profile/${user.id}/${user.image}` : "/images/logo-sena.png"}
                  alt={user.firstName}
                  className="object-cover rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                  width={300}
                  height={300}
                  priority={false}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-magenta">Nombre Completo:</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  readOnly={!editableRoles.includes(user.role)}
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  readOnly={!editableRoles.includes(user.role)}
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Tipo de Documento:</label>
                <select
                  name="documentType"
                  value={user.documentType}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  disabled={!editableRoles.includes(user.role)}
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PA">Pasaporte</option>
                  <option value="RC">Registro Civil</option>
                  <option value="PEP">Permiso Especial de Permanencia</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-magenta">Documento:</label>
                <input
                  type="text"
                  name="documentNumber"
                  value={user.documentNumber}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  readOnly={!editableRoles.includes(user.role)}
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Teléfono:</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                />
              </div>
              {editableRoles.includes(user.role) && (
                <>
                  <div>
                    <label className="font-semibold text-magenta">Rol:</label>
                    <input
                      type="text"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-magenta">Estado de Cuenta:</label>
                    <input
                      type="text"
                      name="status"
                      value={user.status}
                      onChange={handleChange}
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                    />
                  </div>
                </>
              )}
              {!editableRoles.includes(user.role) && (
                <div>
                  <label className="font-semibold text-magenta">Estado de Cuenta:</label>
                  <input
                    type="text"
                    name="status"
                    value={user.status}
                    onChange={handleChange}
                    readOnly
                    className="border p-2 rounded w-full bg-gray-100"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-azul w-full text-white px-20 py-2 rounded-lg text-center hover:bg-cian hover:text-lg shadow-md transition-all duration-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      ) : (
        <p>Cargando...</p>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md mt-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}