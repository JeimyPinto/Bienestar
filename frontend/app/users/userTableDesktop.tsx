import React from "react";
import Image from "next/image";
import { User, UserTableDesktopProps } from "../types/user";
import Spinner from "../ui/spinner";

const UserTableDesktop: React.FC<UserTableDesktopProps> = ({
    users,
    loading,
    sortColumn,
    sortOrder,
    handleSort,
    handleRowClick,
    currentPage,
    totalPages,
    totalUsers,
    setCurrentPage,
}) => (
    <>
        <div className="overflow-x-auto rounded-lg shadow-md border border-azul bg-blanco">
            <table className="min-w-full divide-y divide-cian">
                <thead className="bg-cian text-azul">
                    <tr>
                        <th className="px-2 py-3 text-xs font-semibold"
                            onClick={() => handleSort("id")}>
                            ID {sortColumn === "id" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold">Imagen</th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("firstName")}>
                            Nombre {sortColumn === "firstName" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("email")}>
                            Email {sortColumn === "email" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("documentType")}>
                            Tipo de Documento {sortColumn === "documentType" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("documentNumber")}>
                            Número de Documento {sortColumn === "documentNumber" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("phone")}>
                            Teléfono {sortColumn === "phone" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("role")}>
                            Rol {sortColumn === "role" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("status")}>
                            Estado {sortColumn === "status" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("createdAt")}>
                            Fecha de Creación {sortColumn === "createdAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("updatedAt")}>
                            Fecha de Actualización {sortColumn === "updatedAt" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("groupId")}>
                            Grupo (ID) {sortColumn === "groupId" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                        </th>
                        <th className="px-2 py-3 text-xs font-semibold cursor-pointer select-none"
                            onClick={() => handleSort("group")}>
                            Nombre del Grupo
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-cian">
                    {loading ? (
                        <tr>
                            <td colSpan={12} className="py-8 text-center text-azul">
                                <Spinner className="mx-auto" />
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan={12} className="py-8 text-center text-azul">
                                No hay usuarios para mostrar.
                            </td>
                        </tr>
                    ) : (
                        users.map((user: User) => (
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
                                                    ? `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${user.image}`
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
                                <td className="px-2 py-2">{user.groupId ?? "-"}</td>
                                <td className="px-2 py-2">{user.group?.programName ?? "-"}</td>
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
    </>
);

export default UserTableDesktop;
