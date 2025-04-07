"use client";

import React, { useState, useEffect } from "react";
import IcoBack from "../ui/ico-back";
import Image from "next/image";
import { fetchUserById, updateUser, editableRoles } from "../user/endpoints";
import { User } from "../lib/types";

export default function ProfilePage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<User | null>(null);

  // Cargar el token del localStorage al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const userData = await fetchUserById(token);
          setUser(userData);
          setFormData(userData);
        } catch (error) {
          setError(
            `Error fetching user data / Error al obtener los datos del usuario: ${error}`
          );
        }
      }
    };

    fetchUserData();
  }, [token]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (formData) {
      setFormData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  // Manejar la carga de la imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Por favor selecciona un archivo de imagen válido.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData!,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData && token) {
      try {
        const updatedUser = await updateUser(user!, formData, token);
        setUser(updatedUser);
        setFormData(updatedUser);
        setError(null);
      } catch (error) {
        console.error("Error updating user data:", error);
        setError("Error al actualizar los datos del usuario");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <IcoBack role={user?.role || "user"} />
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-20">
          <h2 className="text-3xl font-bold mb-6 text-azul text-center">
            Información del Usuario
          </h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="font-semibold text-magenta">Nombre:</label>
              <input
                type="text"
                name="firstName"
                value={formData?.firstName || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div>
              <label className="font-semibold text-magenta">Apellido:</label>
              <input
                type="text"
                name="lastName"
                value={formData?.lastName || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div>
              <label className="font-semibold text-magenta">
                Tipo de Documento:
              </label>
              <select
                name="documentType"
                value={formData?.documentType || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
                <option value="RC">Registro Civil</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PEP">Permiso Especial de Permanencia</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-magenta">Documento:</label>
              <input
                type="text"
                name="documentNumber"
                value={formData?.documentNumber || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div>
              <label className="font-semibold text-magenta">Teléfono:</label>
              <input
                type="text"
                name="phone"
                value={formData?.phone || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
              />
            </div>
            <div>
              <label className="font-semibold text-magenta">Email:</label>
              <input
                type="text"
                name="email"
                value={formData?.email || ""}
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
                    value={formData?.role || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  />
                </div>
                <div>
                  <label className="font-semibold text-magenta">
                    Estado de Cuenta:
                  </label>
                  <select
                    name="status"
                    value={formData?.status || ""}
                    onChange={handleChange}
                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="font-semibold text-magenta">Imagen:</label>
              {formData?.image && (
                <div className="mb-2">
                  <Image
                    src={formData.image}
                    alt="Imagen de perfil"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cian"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="bg-azul text-white px-4 py-2 rounded hover:bg-cian transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
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