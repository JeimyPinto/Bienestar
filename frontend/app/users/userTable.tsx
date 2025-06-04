import React, { useEffect, useState, useRef } from "react"
import { useColumnSorter } from "../lib/useColumnSorter"
import { User } from "../types/user"
import ErrorMessage from "../ui/errorMessage";
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
                const data = await getAllPaginated(currentPage, limit, token);
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
    const {
        sortedData: sortedUsers,
        handleSort,
        sortColumn,
        sortOrder,
    } = useColumnSorter(users);
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const userEditFormRef = useRef<any>(null)

    function handleRowClick(user: User) {
        setSelectedUser(user);
        setIsFormOpen(true);
        userEditFormRef.current?.showModal();
    }
    return (
        <div className="overflow-x-auto px-4">
            {error && (
                <div className="mb-4">
                    <ErrorMessage message={error} />
                </div>
            )}
            <div className="flex justify-end items-center mb-2">
                <label className="mr-2 text-sm text-gray-700">Mostrar:</label>
                <select
                    value={limit}
                    onChange={e => {
                        setLimit(Number(e.target.value));
                        setCurrentPage(1); // Reinicia a la primera página al cambiar el límite
                    }}
                    className="border rounded px-2 py-1 text-sm"
                >
                    {[10, 25, 50, 100].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <span className="ml-2 text-sm text-gray-700">por página</span>
            </div>
            <div className="max-w-8xl mx-auto bg-blanco border border-azul shadow-md rounded-lg text-center">
                {/* Header */}
                <div className="grid grid-cols-12 bg-cian text-azul font-semibold px-4 py-2">
                    <div>Imagen</div>
                    <div
                        onClick={() => handleSort("firstName")}
                        className="cursor-pointer"
                    >
                        Nombre{" "}
                        {sortColumn === "firstName" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div
                        onClick={() => handleSort("email")}
                        className="col-span-2 cursor-pointer"
                    >
                        Email{" "}
                        {sortColumn === "email" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div
                        onClick={() => handleSort("documentType")}
                        className="col-span-2 cursor-pointer"
                    >
                        Tipo de Documento{" "}
                        {sortColumn === "documentType" &&
                            (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div
                        onClick={() => handleSort("documentNumber")}
                        className="cursor-pointer"
                    >
                        Número de Documento{" "}
                        {sortColumn === "documentNumber" &&
                            (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div onClick={() => handleSort("phone")} className="cursor-pointer">
                        Teléfono{" "}
                        {sortColumn === "phone" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div onClick={() => handleSort("role")} className="cursor-pointer">
                        Rol {sortColumn === "role" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div onClick={() => handleSort("status")} className="cursor-pointer">
                        Estado{" "}
                        {sortColumn === "status" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div
                        onClick={() => handleSort("createdAt")}
                        className="cursor-pointer"
                    >
                        Fecha de Creación{" "}
                        {sortColumn === "createdAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                    <div
                        onClick={() => handleSort("updatedAt")}
                        className="cursor-pointer"
                    >
                        Fecha de Actualización{" "}
                        {sortColumn === "updatedAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                    </div>
                </div>

                {/* Rows */}
                {sortedUsers.map((user: User) => (
                    <div
                        key={user.id}
                        className="grid grid-cols-12 items-center px-4 py-2 border-b hover:bg-amarillo cursor-pointer"
                        onClick={() => handleRowClick(user)}
                    >
                        <div>
                            {user.image ? (
                                <img
                                    src={
                                        user?.image
                                            ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + user.image
                                            : "/images/ico-profile.svg"
                                    }
                                    alt={`${user.firstName} avatar`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500">Sin imagen</span>
                            )}
                        </div>
                        <div>{`${user.firstName} ${user.lastName}`}</div>
                        <div className="col-span-2 truncate">{user.email}</div>
                        <div className="col-span-2 truncate">
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
                        </div>
                        <div>{user.documentNumber}</div>
                        <div>{user.phone}</div>
                        <div>{user.role}</div>
                        <div>
                            <span
                                className={`px-2 py-1 rounded-full text-sm ${user.status === "activo"
                                    ? "bg-cian text-azul"
                                    : "bg-magenta text-blanco"
                                    }`}
                            >
                                {user.status === "activo" ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                        <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                        <div>{new Date(user.updatedAt).toLocaleDateString()}</div>
                    </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 px-4 py-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1
                            ? "bg-cian text-azul cursor-not-allowed"
                            : "bg-amarillo hover:bg-azul"
                            }`}
                    >
                        Anterior
                    </button>
                    <span className="text-azul">
                        Página {currentPage} de {totalPages} &mdash;
                        Total: {totalUsers} usuarios
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage(Math.min(currentPage + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages
                            ? "bg-cian text-azul cursor-not-allowed"
                            : "bg-amarillo hover:bg-azul"
                            }`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}