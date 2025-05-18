"use client";

import React, { useState, useEffect } from "react";
import { fetchUserById, updateUser } from "./endpoints";
import { User } from "../lib/types";
import ErrorMessage from "../ui/ErrorMessage";

interface UserProfilePageProps {
  userId?: string;
  onClose: () => void;
}

export default function UserProfilePage({
  userId,
  onClose,
}: UserProfilePageProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener el token del localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Función para cargar los datos del usuario
  const loadUser = async () => {
    if (userId && token) {
      try {
        const { user, message, image } = await fetchUserById(token, userId);
        if (user) {
          setUser(user);
          setImage(image || "/images/profile/default.png");
          setMessage(message);
        }
      } catch (err) {
        setError("Error al cargar los datos del usuario. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    } else {
      setError(
        "No se ha encontrado el token de autorización o el ID del usuario."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token, userId]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  // Manejar el cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && token) {
      try {
        const formData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          documentType: user.documentType,
          documentNumber: user.documentNumber,
          phone: user.phone,
          password: user.password,
          role: user.role,
          status: user.status,
        };

        const { updatedUser, message } = await updateUser(
          user,
          formData,
          token
        );
        setUser(updatedUser);
        setMessage(message || "¡Cambios guardados exitosamente!");
        setTimeout(() => setMessage(null), 5000);
      } catch (err) {
        setError("Error al guardar los cambios. Intenta nuevamente.");
      }
    }
  };

  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <p className="text-gray-700">Cargando datos del usuario...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <ErrorMessage message={error} />
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center text-azul mb-8">
          Información del Usuario
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Imagen del usuario */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src={image || "/images/profile/default.png"}
              alt="Imagen del usuario"
              className="w-36 h-36 rounded-full object-cover border-4 border-cyan-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 w-full text-sm text-gray-600"
            />
          </div>
          {/* Información del usuario */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                value={user?.firstName || ""}
                placeholder="Nombre"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                value={user?.lastName || ""}
                placeholder="Apellido"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Documento
              </label>
              <select
                name="documentType"
                value={user?.documentType || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200"
                disabled={!isAdmin}
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
                <option value="RC">Registro Civil</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PPE">Permiso Especial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número de Documento
              </label>
              <input
                type="text"
                name="documentNumber"
                value={user?.documentNumber || ""}
                placeholder="Número de Documento"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                disabled={!isAdmin}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                placeholder="Correo Electrónico"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={user?.phone || ""}
                placeholder="Teléfono"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rol
              </label>
              <input
                type="text"
                name="role"
                value={user?.role || ""}
                placeholder="Rol"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                type="text"
                name="status"
                value={user?.status || ""}
                placeholder="Estado"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition duration-200 overflow-hidden text-ellipsis"
                disabled={!isAdmin}
              />
            </div>
          </div>
        </div>
        {/* Botón para guardar cambios */}
        <div className="flex justify-center mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
            className="bg-cyan-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300 focus:ring-4 focus:ring-cyan-300"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
