"use client";

import React from "react";
import Image from "next/image";
import { User } from "../lib/types";

interface TableProps {
  users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  return (
    <div className="container mx-auto p-4 lg:pl-20">
      {users.map((user, index) => (
        <div
          key={user?.id}
          className={`border border-gray-300 rounded-lg shadow-md p-4 mb-4 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={
                user?.image?.startsWith("http") ||
                user?.image?.startsWith("data:image")
                  ? user.image
                  : "/images/profile/default.png"
              }
              alt={`Imagen de ${user?.firstName || "Usuario"}`}
              width={64}
              height={64}
              priority={false}
              className="w-16 h-16 object-cover rounded-full shadow-md"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>ID:</strong> {user?.id}
            </div>
            <div>
              <strong>Tipo de Documento:</strong>{" "}
              {user?.documentType === "CC"
                ? "Cédula de ciudadanía"
                : user?.documentType === "TI"
                ? "Tarjeta de identidad"
                : user?.documentType === "CE"
                ? "Cédula de extranjería"
                : user?.documentType === "PA"
                ? "Pasaporte"
                : user?.documentType === "RC"
                ? "Registro civil"
                : user?.documentType === "PEP"
                ? "Permiso especial de permanencia"
                : "Desconocido"}
            </div>
            <div>
              <strong>Número de Documento:</strong> {user?.documentNumber}
            </div>
            <div>
              <strong>Teléfono:</strong> {user?.phone}
            </div>
            <div>
              <strong>Rol :</strong>{" "}
              <span
                className={`${
                  user?.role === "admin"
                    ? "text-colorWpp font-bold"
                    : "text-gray-500"
                }`}
              >
                {user?.role}
              </span>
            </div>
            <div>
              <strong>Estado:</strong> {user?.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
