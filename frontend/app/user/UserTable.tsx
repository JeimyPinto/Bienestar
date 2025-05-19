import React, { useState, useRef } from "react";
import { useColumnSorter } from "../lib/filter";
import { UserTableProps, User } from "../lib/interface";
import UserForm from "./UserForm";

const UserTable: React.FC<UserTableProps> = ({
  users,
  currentPage,
  setCurrentPage,
  totalPages,
  token,
  setUsers,
}) => {
  const {
    sortedData: sortedUsers,
    handleSort,
    sortColumn,
    sortOrder,
  } = useColumnSorter(users);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const userEditFormRef = useRef<any>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
    userEditFormRef.current?.showModal();
  };

  const closeForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  return (
    <div className="overflow-x-auto px-4">
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
              (sortOrder === "asc" ? "↑" : "↓")}
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
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-12 items-center px-4 py-2 border-b hover:bg-amarillo cursor-pointer"
            onClick={() => handleRowClick(user)}
          >
            <div>
              {user.image ? (
                <img
                  src={user.image}
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
                className={`px-2 py-1 rounded-full text-sm ${
                  user.status === "activo"
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
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-cian text-azul cursor-not-allowed"
                : "bg-amarillo hover:bg-azul"
            }`}
          >
            Anterior
          </button>
          <span className="text-azul">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-cian text-azul cursor-not-allowed"
                : "bg-amarillo hover:bg-azul"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
      {/* UserForm */}
      {isFormOpen && selectedUser && (
        <UserForm
          dialogRef={userEditFormRef}
          closeDialog={closeForm}
          setUsers={setUsers}
          setSuccessMessage={setSuccessMessage}
          token={token}
          mode="edit"
          userToEdit={selectedUser}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default UserTable;
