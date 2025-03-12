"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "../lib/types"

export default function ProfileCard() {
   const [user, setUser] = useState<User | null>(null);
   useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) {
       const user = JSON.parse(atob(token.split(".")[1]));
       setUser(user);
     }
   }, []);
  return (
      <div className="flex container mx-auto p-4 bg-white shadow-lg rounded-lg justify-center">
        {user ? (
          <>
            <div className="flex flex-col p-6 mb-6 gap-2 items-center">
              <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
              <label htmlFor="fileInput">
              <Image
                src={
                user.imagen
                  ? `/images/profile/${user.id}/${user.imagen}`
                  : "/images/logo-sena.png"
                }
                alt={user.nombre}
                className="object-cover cursor-pointer"
                width={200}
                height={200}
                priority={false}
              />
              </label>
              <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                // Handle file upload logic here
                console.log(file);
                }
              }}
              />
            </div>

            <div className="flex flex-col justify-center gap-1">
              <p>
                <strong>Nombre Completo:</strong> {user.nombre} {user.apellido}
              </p>
              <p>
                <strong>Documento:</strong> {user.documento}
              </p>
              <p>
                <strong>Teléfono:</strong> {user.telefono}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Rol:</strong> {user.rol}
              </p>
              <p>
                <strong>Estado de Cuenta:</strong> {user.estado}
              </p>
              <Link
                href={"/profile"}
                className="bg-azul text-white py-4 rounded text-center hover:bg-cian hover:text-lg"
              >
                Editar
              </Link>
            </div>
          </>
        ) : (
          <p>Cargando...</p>
        )}
        </div>
  );
}
