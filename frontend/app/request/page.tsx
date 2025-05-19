"use client";

import React, { useEffect, useState } from "react";
// import { createRequest } from "./endpoints";
import { fetchUsersActive } from "../user/endpoints";
import { fetchServices } from "../services/endpoints";
import { User, Service } from "../lib/types";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingOverlay from "../ui/LoadingOverlay";
import SuccessMessage from "../ui/SuccessMessage";

const RequestForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  //Obtiene el token de autorización del localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError(
        "Authorization token not found / No se ha encontrado el token de autorización"
      );
      setLoading(false);
    } else {
      setToken(storedToken);
    }
  }, []);
  //Obtiene los usuarios
  useEffect(() => {
    const loadUsers = async () => {
      console.log("Cargando usuarios...");
      try {
        if (!token) {
          throw new Error("Token no disponible");
        }
        const data = await fetchUsersActive(token);
        console.log("Usuarios:", data);
        setUsers(data.users);
        setError(null);
      } catch (error) {
        setError("Error al cargar los usuarios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    if (isTokenLoaded) {
      loadUsers();
    }
  }, [token, isTokenLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // await createRequest({
      //   userId: selectedUser,
      //   serviceId: selectedService,
      //   description,
      // });
      setSuccess(true);
      setSelectedUser("");
      setSelectedService("");
      setDescription("");
    } catch {
      setError("No se pudo enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Nueva Solicitud de Remisión</h1>
      {loading && <LoadingOverlay />}
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Solicitud enviada correctamente." />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Usuario</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Seleccione un usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Tipo de Servicio</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Seleccione un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Descripción</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describa la historia de remisión..."
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
