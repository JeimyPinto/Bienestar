import React, { useState, useEffect } from "react";
import { User, UserFormProps } from "../lib/types";
import { createUser, updateUser } from "./endpoints";

const UserForm: React.FC<UserFormProps> = ({
  dialogRef,
  closeDialog,
  setSuccessMessage,
  token,
  mode = "create",
  userToEdit,
}) => {
  const [newUser, setNewUser] = useState<User>({
    id: "",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  /**
   *Función que se ejecuta cuando el componente se monta o se actualiza.
   * Si el modo es "editar" y se proporciona un usuario, se establece el estado del nuevo usuario con los datos del usuario a editar.
   * Si el modo es "editar" pero no se proporciona un usuario, se muestra un error en la consola.
   * @returns {void}
   * @throws {void}
   * @since 18/05/2025
   * @version 18/05/2025
   * @author Jeimy Pinto
   */
  useEffect(() => {
    if (mode === "edit" && userToEdit) {
      setNewUser({
        ...userToEdit,
        profileImage: null,
        firstName: userToEdit.firstName || "",
        lastName: userToEdit.lastName || "",
        email: userToEdit.email || "",
        documentType: userToEdit.documentType || "",
        documentNumber: userToEdit.documentNumber || "",
        phone: userToEdit.phone || "",
        password: userToEdit.password || "",
        role: userToEdit.role || "user",
        status: userToEdit.status || "activo",
      });
    } else if (mode === "edit" && !userToEdit) {
      console.error(
        "No user provided for editing / No se proporcionó un usuario para editar."
      );
    }
  }, [mode, userToEdit]);

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
      formData.append("firstName", newUser.firstName || "");
      formData.append("lastName", newUser.lastName || "");
      formData.append("email", newUser.email || "");
      formData.append("documentType", newUser.documentType || "");
      formData.append("documentNumber", newUser.documentNumber || "");
      formData.append("phone", newUser.phone || "");
      formData.append(
        "password",
        newUser.password || newUser.documentNumber || ""
      );
      formData.append("role", newUser.role || "user");
      formData.append("status", newUser.status || "activo");
      if (newUser.profileImage) {
        formData.append("file", newUser.profileImage);
        formData.append("image", newUser.profileImage.name);
      }
      if (!token) {
        throw new Error("Token not available / Token no disponible");
      }

      if (mode === "create") {
        const { user, message } = await createUser(formData, token);
        setSuccessMessage(message);
      } else if (mode === "edit" && userToEdit) {
        const { message } = await updateUser(userToEdit, newUser, token);
        setSuccessMessage(message);
        window.location.reload();
      }
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
      console.error("Error al procesar el formulario:", error);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-azul">
          {mode === "create"
            ? "          Añadir Nuevo Usuario"
            : "Editar Usuario"}
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
        <div>
          <label className="block text-sm font-medium text-azul">
            Imagen de Perfil
          </label>
          {mode === "edit" && (
            <div className="mb-4">
              <img
                  src={newUser.image}
                  alt={`${newUser.firstName} avatar`}
                  className="w-50 h-50 rounded-full object-cover"
                />
            </div>
          )}
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
          setNewUser((prevUser) => ({
            ...prevUser,
            profileImage: e.target.files![0],
          }));
              }
            }}
            className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian"
          >
            {mode === "create" ? "Guardar" : "Actualizar"}
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default UserForm;
