"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types";
import { fetchUserById, updateUser, editableRoles } from "../dashboard/user/endpoints";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  /**
   * Función que se encarga de enviar los datos del usuario al servidor para actualizarlos.
   * @param e evento de formulario
   * @returns {Promise<void>} Promesa vacía
   * @version 19/03/2025
   * @autor Jeimy Pinto
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Si hay un archivo seleccionado, sube el archivo al servidor
          if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/uploadProfileImage`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });

            if (uploadResponse.ok) {
              const { fileName } = await uploadResponse.json();
              user.image = fileName; // Actualiza el campo de imagen del usuario con el nombre del archivo
            } else {
              setError("Error al subir la imagen");
              return;
            }
          }

          // Envía los datos del usuario al servidor
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${user.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (response.ok) {
            const updatedUserData = await response.json();
            setUser(updatedUserData);
            setError(null);
          } else {
            setError("Error al actualizar los datos del usuario");
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message || "Unknown error / Error desconocido");
          } else {
            setError("Unknown error / Error desconocido");
          }
        }
      } else {
        setError("No se encontró el token de autenticación");
      }
    }
  };

  return (
    <div className="flex container mx-auto mt-20 p-4 bg-white shadow-lg rounded-lg justify-center">
      <div className="fixed top-6 left-5 bg-azul p-2 rounded-lg hover:bg-cian hover:scale-125 transition-transform duration-300">
        <Link href="/dashboard" className="flex items-center justify-center">
          <Image
            src="/images/ico-back.svg"
            alt="Icono de regreso"
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
                  src={previewImage || (user.image ? `/images/profile/${user.id}/${user.image}` : "/images/logo-sena.png")}
                  alt={`Foto de perfil de ${user.firstName} ${user.lastName}`}
                  className="object-cover rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  width={300}
                  height={300}
                  priority={false}
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                />
              </label>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold text-magenta">Nombre Completo:</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName || ""}
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
                  value={user.lastName || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  readOnly={!editableRoles.includes(user.role)}
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Tipo de Documento:</label>
                <select
                  name="documentType"
                  value={user.documentType || ""}
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
                  value={user.documentNumber || ""}
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
                  value={user.phone || ""}
                  onChange={handleChange}
                  className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                />
              </div>
              <div>
                <label className="font-semibold text-magenta">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={user.email || ""}
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
                      value={user.role || ""}
                      onChange={handleChange}
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-magenta">Estado de Cuenta:</label>
                    <select
                      name="status"
                      value={user.status || ""}
                      onChange={handleChange}
                      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                </>
              )}
              {!editableRoles.includes(user.role) && (
                <div>
                  <label className="font-semibold text-magenta">Estado de Cuenta:</label>
                  <select
                    name="status"
                    value={user.status || ""}
                    onChange={handleChange}
                    disabled
                    className="border p-2 rounded w-full bg-gray-100"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
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