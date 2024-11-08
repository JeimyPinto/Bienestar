"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signup } from "@/app/actions/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <form
        action={signup}
        className="flex flex-col items-center mt-5 rounded-lg bg-white p-6 shadow-md w-4/12"
      >
        <div className="flex justify-center items-center gap-5 py-5 w-4/6">
          <Image
            src="/images/logo-sena.png"
            alt="Logo"
            width={80}
            height={80}
            className="p-3"
          />{" "}
          <h1 className="text-5xl font-bold">Ingresa a nuestro portal</h1>
        </div>
        <div className="mb-4 w-4/6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Documento:
          </label>
          <input
            type="number"
            name="documento"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6 relative w-4/6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="contrasena"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <Image
            src={
              showPassword
                ? "/images/icon-hide-password.svg"
                : "/images/icon-show-password.svg"
            }
            alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            width={24}
            height={24}
            className="absolute right-3 top-10 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ingresar
          </button>
        </div>
      </form>
      <div className="flex items-center">
        <p className="p-2">
          Recuerda que si aún no estás registrado puedes hacerlo
        </p>
        <strong className="underline">aquí</strong>
      </div>
    </div>
  );
}
