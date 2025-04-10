"use client";

import React, { useState, useEffect } from "react";
import { User } from "../lib/types";
import { fetchUsers, createUser } from "./endpoints";
import Header from "../ui/header";
import IcoBack from "../ui/ico-back";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import LoadingOverlay from "../ui/LoadingOverlay";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("No se ha encontrado el token de autorización");
      setLoading(false);
    } else {
      setToken(storedToken);
    }
    setIsTokenLoaded(true); // Indica que el token ha sido cargado
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
        setError(null);
      } catch (error) {
        console.error("Error loading users:", error);
        setError("Error al cargar los usuarios. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    if (isTokenLoaded) {
      loadUsers();
    }
  }, [currentPage, token, isTokenLoaded]);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

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
      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            setError(null);
            setLoading(true);
            setCurrentPage(1);
          }}
        />
      )}
      {successMessage && <SuccessMessage message={successMessage} />}
      <UserTable
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <UserForm
        dialogRef={dialogRef}
        closeDialog={closeDialog}
        setUsers={setUsers}
        setSuccessMessage={setSuccessMessage}
        token={token}
      />
      {loading && <LoadingOverlay />}
    </>
  );
};

export default UserPage;
