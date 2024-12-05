"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    email: "",
    estado: "",
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userQuery = searchParams.get('user');
      if (userQuery) {
        const userData = JSON.parse(userQuery as string);
        setUser(userData);
      }
    }
  }, [searchParams]);

  const handleEdit = () => {
    // Lógica para editar los datos del usuario
    console.log("Editar usuario");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
        <p><strong>Nombre Completo:</strong> {user.nombre} {user.apellido}</p>
        <p><strong>Documento:</strong> {user.documento}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Estado de Cuenta:</strong> {user.estado}</p>
        <button
          onClick={handleEdit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Editar
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Solicitudes de Remisión Pendientes</h2>
        <div>
          <p>No hay solicitudes pendientes.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;