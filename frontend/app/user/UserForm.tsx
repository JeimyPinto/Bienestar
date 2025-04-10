import React, { useState } from "react";
import { User } from "../lib/types";
import { createUser } from "./endpoints";

interface UserFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
}

const UserForm: React.FC<UserFormProps> = ({
  dialogRef,
  closeDialog,
  setUsers,
  setSuccessMessage,
  token,
}) => {
  const [newUser, setNewUser] = useState<User>({
    id: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    firstName: "",
    lastName: "",
    email: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    password: "",
    role: "user",
    status: "activo",
    profileImage: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("email", newUser.email);
      formData.append("documentType", newUser.documentType);
      formData.append("documentNumber", newUser.documentNumber);
      formData.append("phone", newUser.phone);
      formData.append("password", newUser.password || newUser.documentNumber);
      formData.append("role", newUser.role);
      formData.append("status", newUser.status);
      if (newUser.profileImage) {
        formData.append("file", newUser.profileImage);
        formData.append("image", newUser.profileImage.name);
      }
      if (!token) {
        throw new Error("Token no disponible");
      }
      const { user, message } = await createUser(formData, token);
      setUsers((prevUsers) => [...prevUsers, user]);
      setSuccessMessage(message);
      setNewUser({
        id: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        firstName: "",
        lastName: "",
        email: "",
        documentType: "",
        documentNumber: "",
        phone: "",
        password: "",
        role: "user",
        status: "activo",
      });
      closeDialog();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-azul">
          Añadir Nuevo Usuario
        </h2>
        <button
          onClick={closeDialog}
          className="text-cian hover:text-azul transition-colors"
        >
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-azul">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-azul">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-azul">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-azul">
              Tipo de Documento
            </label>
            <select
              name="documentType"
              value={newUser.documentType}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PA">Pasaporte</option>
              <option value="RC">Registro Civil</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PEP">Permiso Especial de Permanencia</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-azul">
              Número de Documento
            </label>
            <input
              type="text"
              name="documentNumber"
              value={newUser.documentNumber}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-azul">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-azul">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-azul">Rol</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-azul">
              Estado
            </label>
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
              className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
              required
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian"
          >
            Guardar
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default UserForm;
