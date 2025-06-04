"use client"


import React, { useState, useEffect } from "react";
import Header from "../ui/header"
import IcoBack from "../ui/icoBack"
import ErrorMessage from "../ui/errorMessage";
import UserTable from "./userTable.tsx";
import { User } from "../types/user"
import { getAllPaginated } from "../services/services/user";

export default function UsersPage() {
    const [token, setToken] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    useEffect(() => {
        let tokenValue: string | null = null;

        // Obtener el token dependiendo del entorno
        if (
            process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
            process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
        ) {
            tokenValue = localStorage.getItem("token");
        } else {
            const cookie = document.cookie;
            tokenValue =
                cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null;
        }

        if (tokenValue) {
            setToken(tokenValue);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            setError("No authentication token found / No se ha encontrado el token de autenticación.");
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        const loadUsers = async () => {
            try {
                const data = await getAllPaginated(currentPage, 10, token);
                if (!isMounted) return;
                if (data.error) {
                    setError(data.error);
                } else if (data.users) {
                    setUsers(data.users);
                    setCurrentPage(data.currentPage);
                    setTotalUsers(data.totalUsers);
                    setTotalPages(data.totalPages);
                }
            } catch {
                if (isMounted) setError("Error al cargar los usuarios. / Error loading users.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadUsers();

        return () => {
            isMounted = false;
        };
    }, [token, currentPage]);

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };
    return (
        <>
            <Header />
            <IcoBack />
            <main className="flex flex-col md:flex-row justify-between items-center mb-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 ml-20">
                    Listado de Usuarios
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
            <UserTable
                users={users}
                currentPage={currentPage}
                totalUsers={totalUsers}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                token={token}
                setUsers={setUsers}
            />

        </>
    );
}