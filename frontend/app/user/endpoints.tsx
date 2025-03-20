import { User, UploadResponse } from "../lib/types";

export const editableRoles = ["admin", "integrante"];

export const fetchUserById = async (userId: string, token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/id/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      console.error("Error al obtener los datos del usuario");
      throw new Error("Error al obtener los datos del usuario");
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
};

export const updateUser = async (user: User, formData: any, token: string) => {
  try {
    const url = editableRoles.includes(user.role)
      ? `${process.env.NEXT_PUBLIC_API_URL}/users/update/${user.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/users-self`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedUserData = await response.json();
      return updatedUserData;
    } else {
      const errorData = await response.json();
      console.error("Error updating data:", errorData);
      throw new Error(errorData.message || "Unknown error / Error desconocido");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

/**
 * Sube una imagen de perfil.
 * 
 * @param {FormData} formData - Los datos del formulario que contienen el archivo de imagen.
 * @param {string} token - El token de autorización.
 * @returns {Promise<Object>} - La respuesta del servidor que contiene el nombre del archivo.
 * @throws {Error} - Lanza un error si la subida falla.
 * @version 20/03/2025
 * @since 20/03/2025
 * @author JeimyPinto
 */
export const uploadProfileImage = async (formData: FormData, token: string): Promise<UploadResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/uploadProfileImage`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      console.error("Error uploading image:", errorData);
      throw new Error(errorData.message || "Unknown error / Error desconocido");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const fetchUserServices = async (
  setServices: (services: any) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found / No se encontró el token");
    }
    const user = JSON.parse(atob(token.split(".")[1]));
    const userId = user.id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/id/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error loading services / Error al cargar los servicios");
    }
    const data = await response.json();
    setServices(data.services);
  } catch (error) {
    console.error("Error loading services / Error al cargar los servicios:", error);
    setError("Server issues, services not available / Problemas con el servidor, servicios no disponibles");
  } finally {
    setLoading(false);
  }
};