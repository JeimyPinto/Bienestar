import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useColumnSorter } from "../lib/useColumnSorter";
import { User } from "../types"
import ErrorMessage from "../ui/errorMessage";
import UserForm from "./userForm";
import UserCard from "./userCard";
import { getAllPaginated } from "../services/services/user";
export default function UserTable() {
    const [token, setToken] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const userEditFormRef = useRef<HTMLDialogElement>(null);
    const {
        sortedData: sortedUsers,
        handleSort,
        sortColumn,
        sortOrder,
    } = useColumnSorter(users);
    useEffect(() => {
        let tokenValue: string | null = null;
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
        if (tokenValue) setToken(tokenValue);
    }, []);

    useEffect(() => {
        if (!token) {
            setError("No se ha encontrado el token de autenticación.");
            setLoading(false);
            return;
        }
        let isMounted = true;
        setLoading(true);
        setError(null);
        const loadUsers = async () => {
            try {
                const data = await getAllPaginated(currentPage, limit, token);
                if (!isMounted) return;
                if (data.error) {
                    setError(typeof data.error === "string" ? data.error : data.error?.message || String(data.error));
                } else if (data.users) {
                    setUsers(data.users);
                    setCurrentPage(data.currentPage);
                    setTotalUsers(data.totalUsers);
                    setTotalPages(data.totalPages);
                }
            } catch {
                if (isMounted) setError("Error al cargar los usuarios");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadUsers();
        return () => { isMounted = false; };
    }, [token, currentPage, limit]);

    function handleRowClick(user: User) {
        setSelectedUser(user);
        setIsFormOpen(true);
        setTimeout(() => {
            userEditFormRef.current?.showModal();
        }, 0);
    }

    return (
        <section className="w-full max-w-8xl mx-auto px-2 py-6">
            <div className="flex flex-col gap-4">
                <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">Mostrar:</label>
                        <select
                            value={limit}
                            onChange={e => {
                                setLimit(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-azul rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cian"
                        >
                            {[10, 25, 50, 100].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-700">por página</span>
                    </div>
                </header>

                {error && (
                    <ErrorMessage message={error} />
                )}

                <div className="hidden sm:block">
                    <div className="overflow-x-auto rounded-lg shadow-md border border-azul bg-blanco">               <table className="min-w-full divide-y divide-cian">
                        <thead className="bg-cian text-azul">
                            <tr>
                                <th className="px-2 py-3 text-xs font-semibold"
                                    onClick={() => handleSort("id")}>
                                    ID {sortColumn === "id" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th className="px-2 py-3 text-xs font-semibold">Imagen</th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("firstName")}
                                >
                                    Nombre {sortColumn === "firstName" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("email")}
                                >
                                    Email {sortColumn === "email" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("documentType")}
                                >
                                    Tipo de Documento {sortColumn === "documentType" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("documentNumber")}
                                >
                                    Número de Documento {sortColumn === "documentNumber" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("phone")}
                                >
                                    Teléfono {sortColumn === "phone" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("role")}
                                >
                                    Rol {sortColumn === "role" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("status")}
                                >
                                    Estado {sortColumn === "status" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("createdAt")}
                                >
                                    Fecha de Creación {sortColumn === "createdAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                                <th
                                    className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                                    onClick={() => handleSort("updatedAt")}
                                >
                                    Fecha de Actualización {sortColumn === "updatedAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cian">
                            {loading ? (
                                <tr>
                                    <td colSpan={12} className="py-8 text-center text-azul">
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            ) : sortedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="py-8 text-center text-azul">
                                        No hay usuarios para mostrar.
                                    </td>
                                </tr>
                            ) : (
                                sortedUsers.map((user: User) => (
                                    <tr
                                        key={user.id}
                                        className="hover:scale-[1.01] transition-all duration-150 cursor-pointer"
                                        onClick={() => handleRowClick(user)}
                                    >
                                        <td className="px-2 py-2 text-center">{user.id}</td>
                                        <td className="px-2 py-2 flex justify-center">
                                            {user.image ? (
                                                <Image
                                                    src={
                                                        user?.image
                                                            ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + user.image
                                                            : "/images/ico-profile.svg"
                                                    }
                                                    alt={`${user.firstName} avatar`}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10 rounded-full object-cover border border-cian"
                                                />
                                            ) : (
                                                <span className="text-gray-500">Sin imagen</span>
                                            )}
                                        </td>
                                        <td className="px-2 py-2">{`${user.firstName} ${user.lastName}`}</td>
                                        <td className="px-2 py-2 truncate">{user.email}</td>
                                        <td className="px-2 py-2 truncate">
                                            {user.documentType === "CC"
                                                ? "Cédula de Ciudadanía"
                                                : user.documentType === "CE"
                                                    ? "Cédula de Extranjería"
                                                    : user.documentType === "PA"
                                                        ? "Pasaporte"
                                                        : user.documentType === "RC"
                                                            ? "Registro Civil"
                                                            : user.documentType === "TI"
                                                                ? "Tarjeta de Identidad"
                                                                : user.documentType === "PEP"
                                                                    ? "Permiso Especial de Permanencia"
                                                                    : user.documentType}
                                        </td>
                                        <td className="px-2 py-2">{user.documentNumber}</td>
                                        <td className="px-2 py-2">{user.phone}</td>
                                        <td className="px-2 py-2">{user.role}</td>
                                        <td className="px-2 py-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "activo"
                                                    ? "bg-cian text-azul"
                                                    : "bg-magenta text-blanco"
                                                    }`}
                                            >
                                                {user.status === "activo" ? "Activo" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td className="px-2 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="px-2 py-2">{new Date(user.updatedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    </div>
                    {/* Pagination */}
                    <nav className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4">
                        <button
                            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-md font-semibold transition ${currentPage === 1
                                ? "bg-cian text-azul cursor-not-allowed"
                                : "bg-amarillo text-azul hover:bg-azul hover:text-blanco"
                                }`}
                        >
                            Anterior
                        </button>
                        <span className="text-azul text-sm">
                            Página <span className="font-bold">{currentPage}</span> de <span className="font-bold">{totalPages}</span> &mdash; Total: <span className="font-bold">{totalUsers}</span> usuarios
                        </span>
                        <button
                            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-md font-semibold transition ${currentPage === totalPages
                                ? "bg-cian text-azul cursor-not-allowed"
                                : "bg-amarillo text-azul hover:bg-azul hover:text-blanco"
                                }`}
                        >
                            Siguiente
                        </button>
                    </nav>
                </div>
                {/* Mobile view */}
                <div className="sm:hidden flex flex-col gap-4">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onClick={() => handleRowClick(user)}
                        />
                    ))}
                </div>


                {isFormOpen && selectedUser && (
                    <UserForm
                        dialogRef={userEditFormRef}
                        closeDialog={() => setIsFormOpen(false)}
                        onClose={() => setIsFormOpen(false)}
                        mode="edit"
                        userToEdit={selectedUser}
                    />
                )}
            </div>
        </section>
    );
}