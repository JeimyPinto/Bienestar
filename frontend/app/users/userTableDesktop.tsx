import React from "react";
import Image from "next/image";
import { User, UserTableDesktopProps } from "../../interface/user";
import Spinner from "../../ui/spinner";
import PaginationControls from "./paginationControls";
import SortIcon from "../../ui/sortIcon";

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
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-azul-cielo/20 bg-white">
            <table className="min-w-full divide-y divide-azul-cielo/30">
                <thead className="bg-gradient-to-r from-azul-cielo/20 to-primary/10">
                    <tr>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("id")}
                        >
                            <div className="flex items-center">
                                ID
                                <SortIcon column="id" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">
                            Imagen
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("firstName")}
                        >
                            <div className="flex items-center">
                                Nombre
                                <SortIcon column="firstName" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("email")}
                        >
                            <div className="flex items-center">
                                Email
                                <SortIcon column="email" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("documentType")}
                        >
                            <div className="flex items-center">
                                Tipo Documento
                                <SortIcon column="documentType" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("documentNumber")}
                        >
                            <div className="flex items-center">
                                N° Documento
                                <SortIcon column="documentNumber" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("phone")}
                        >
                            <div className="flex items-center">
                                Teléfono
                                <SortIcon column="phone" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("role")}
                        >
                            <div className="flex items-center">
                                Rol
                                <SortIcon column="role" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("status")}
                        >
                            <div className="flex items-center">
                                Estado
                                <SortIcon column="status" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("createdAt")}
                        >
                            <div className="flex items-center">
                                Fecha Creación
                                <SortIcon column="createdAt" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("updatedAt")}
                        >
                            <div className="flex items-center">
                                Última Actualización
                                <SortIcon column="updatedAt" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("groupId")}
                        >
                            <div className="flex items-center">
                                Grupo ID
                                <SortIcon column="groupId" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                        <th 
                            className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro cursor-pointer select-none hover:bg-azul-cielo/30 transition-colors duration-200 group"
                            onClick={() => handleSort("group")}
                        >
                            <div className="flex items-center">
                                Nombre del Grupo
                                <SortIcon column="group" sortColumn={sortColumn} sortOrder={sortOrder} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-azul-cielo/20">
                    {loading ? (
                        <tr>
                            <td colSpan={13} className="py-12 text-center">
                                <div className="flex flex-col items-center">
                                    <Spinner className="text-primary mb-3" />
                                    <span className="text-azul-marino/70 font-medium">Cargando usuarios...</span>
                                </div>
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan={13} className="py-12 text-center">
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl mb-4 opacity-50">👥</span>
                                    <span className="text-azul-oscuro font-semibold text-lg mb-2">No hay usuarios para mostrar</span>
                                    <span className="text-azul-marino/70">Ajusta los filtros o crea nuevos usuarios</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        users.map((user: User) => (
                            <tr
                                key={user.id}
                                className="hover:bg-azul-cielo/10 hover:scale-[1.005] transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-primary"
                                onClick={() => handleRowClick(user)}
                            >
                                <td className="px-3 py-3 text-sm font-medium text-azul-oscuro">{user.id}</td>
                                <td className="px-3 py-3">
                                    <div className="flex justify-center">
                                        {user.image ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${user.image}`}
                                                alt={`${user.firstName} avatar`}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-azul-cielo/30 shadow-sm"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-azul-cielo/20 flex items-center justify-center">
                                                <span className="text-azul-marino/70 text-xs font-medium">
                                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino font-medium">
                                    {`${user.firstName} ${user.lastName}`}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/80 truncate max-w-xs">
                                    {user.email}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/80">
                                    <span className="px-2 py-1 bg-info/10 text-info rounded-full text-xs font-medium">
                                        {user.documentType === "CC" ? "C.C." :
                                         user.documentType === "CE" ? "C.E." :
                                         user.documentType === "PA" ? "Pasaporte" :
                                         user.documentType === "RC" ? "R.C." :
                                         user.documentType === "TI" ? "T.I." :
                                         user.documentType === "PEP" ? "PEP" :
                                         user.documentType}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino font-mono">
                                    {user.documentNumber}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/80">
                                    {user.phone || "-"}
                                </td>
                                <td className="px-3 py-3 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        user.role === "admin" ? "bg-warning/20 text-warning" :
                                        user.role === "instructor" ? "bg-info/20 text-info" :
                                        user.role === "superadmin" ? "bg-danger/20 text-danger" :
                                        "bg-primary/20 text-primary"
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        user.status === "activo" 
                                            ? "bg-success/20 text-success" 
                                            : "bg-danger/20 text-danger"
                                    }`}>
                                        {user.status === "activo" ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/70">
                                    {new Date(user.createdAt).toLocaleDateString("es-CO")}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/70">
                                    {new Date(user.updatedAt).toLocaleDateString("es-CO")}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/80 font-mono">
                                    {user.groupId ?? "-"}
                                </td>
                                <td className="px-3 py-3 text-sm text-azul-marino/80 max-w-xs truncate">
                                    {user.group?.programName ?? "-"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Paginación */}
        {!loading && users.length > 0 && (
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                totalUsers={totalUsers}
                setCurrentPage={setCurrentPage}
            />
        )}
    </>
);

export default UserTableDesktop;
