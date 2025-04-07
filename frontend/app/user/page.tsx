"use client";

import React, { useState, useEffect } from "react";
import { User, TableProps } from "../lib/types";
import { fetchUsers, createUser } from "./endpoints";
import Table from "./table";
import Header from "../ui/header";
import IcoBack from "../ui/ico-back";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    firstName: "",
    lastName: "",
    email: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    password: "",
    role: "user",
    status: "activo",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("No se ha encontrado el token de autorización");
      setLoading(false);
      return;
    }
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!token) {
          throw new Error("Token no disponible");
        }
        const data = await fetchUsers(token, currentPage, 10);
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, [currentPage, token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    try {
      const formData = new FormData();
      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("email", newUser.email);
      formData.append("documentType", newUser.documentType);
      formData.append("documentNumber", newUser.documentNumber);
      formData.append("phone", newUser.phone);
      formData.append("password", newUser.password || newUser.documentNumber);
      formData.append("role", newUser.role);
      formData.append("status", newUser.status);
      if (newUser.profileImage) {
        formData.append("file", newUser.profileImage);
        formData.append("image", newUser.profileImage.name);
      }
      if (!token) {
        throw new Error("Token no disponible");
      }
      const { user, message } = await createUser(formData, token);
      setUsers((prevUsers) => [...prevUsers, user]);
      setSuccessMessage(message);
      setNewUser({
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        firstName: "",
        lastName: "",
        email: "",
        documentType: "",
        documentNumber: "",
        phone: "",
        password: "",
        role: "user",
        status: "activo",
      });
      closeDialog();
    } catch (error) {
      console.error("Error register user / Error al registrar usuario:", error);
      setError("Error al registrar usuario / Error registering user");
    } finally {
      setLoading(false);
    }
  };
  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error al cargar datos
        </h2>
        <p className="text-gray-700 mb-2">
          Lo sentimos, ha ocurrido un error al cargar los datos.
        </p>
        <p className="text-gray-500 italic mb-4">Mensaje de error: {error}</p>
        <p className="text-gray-700">
          Por favor, inténtelo de nuevo más tarde.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <IcoBack role="admin" />
      <main className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 ml-20">
          Lista de Usuarios
        </h1>
        <button
          onClick={openDialog}
          className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300"
        >
          Añadir Nuevo Usuario
        </button>
      </main>
      <Table
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <dialog
        ref={dialogRef}
        className="rounded-md shadow-lg p-6 bg-white w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Añadir Nuevo Usuario
          </h2>
          <button
            onClick={closeDialog}
            className="text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Por favor, complete toda la información. Todos los campos son
          obligatorios.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
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
              value={newUser.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Documento
            </label>
            <select
              name="documentType"
              value={newUser.documentType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Seleccione</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PA">Pasaporte</option>
              <option value="RC">Registro Civil</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PEP">Permiso Especial de Permanencia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Documento
            </label>
            <input
              type="text"
              name="documentNumber"
              value={newUser.documentNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
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
              value={newUser.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Imagen de Perfil
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setNewUser((prevUser) => ({
                    ...prevUser,
                    profileImage: file,
                  }));
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-azul text-white py-2 px-4 rounded-md shadow-md hover:bg-cian transition-all duration-300"
          >
            Guardar
          </button>
        </form>
      </dialog>
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          {successMessage}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <p className="text-white text-lg font-semibold">Cargando...</p>
        </div>
      )}
    </>
  );
};

export default UserPage;
