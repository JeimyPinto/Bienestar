import { User } from "../lib/types";

export const editableRoles = ["admin", "integrante"];

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
/**
 * Fetch para obtener los datos de todos los usuarios.
 * @param page la página a obtener (por defecto 1)
 * @param limit el número de usuarios por página (por defecto 10)
 * @param token el token de autorización
 * @returns un objeto con los usuarios, la página actual, el total de páginas y el total de usuarios
 * @version 07/04/2025
 * @since 20/03/2025
 */
export async function fetchUsers(
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}> {
  try {
    const response = await fetch(`${baseUrl}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching users / Error al obtener los usuarios");
    }
  } catch (error) {
    console.error(
      "Error fetching users / Error al obtener los usuarios:",
      error
    );
    throw error;
  }
}
/**
 * Fetch para obtener los datos de un usuario por su ID.
 * @param token el token de autorización
 * @returns los datos del usuario en formato JSON
 * @throws un error si no se pueden obtener los datos del usuario
 * @version 31/03/2025
 * @since 20/03/2025
 */
export const fetchUserById = async (token: string): Promise<User> => {
  // Obtener el user del token
  const user = JSON.parse(atob(token.split(".")[1]));

  try {
    // Obtener los datos del usuario
    const userResponse = await fetch(`${baseUrl}/id/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error(
        "Error fetching user data / Error al obtener los datos del usuario"
      );
    }

    const userData = await userResponse.json();
    return userData;
  } catch (error) {
    console.error(
      "Error fetching user data / Error al obtener los datos del usuario:",
      error
    );
    throw error;
  }
};
/**
 * Fetch para crear un nuevo usuario. (solo administradores)
 * @param user el usuario a crear
 * @param token el token de autorización
 * @returns los datos del usuario creado en formato JSON
 * @throws un error si no se pueden crear los datos del usuario
 * @version 31/03/2025
 * @since 31/03/2025
 */
export async function createUser(form: FormData, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }
    );
    const { user, message } = await response.json();
    return { user, message };
  } catch (error) {
    console.error("Error creating user / Error al crear el usuario:", error);
    throw error;
  }
}
/**
 * Fetch que actualiza los datos de un usuario
 * @param user el usuario a actualizar
 * @param formData los datos del formulario
 * @param token el token de autorización
 * @returns los datos del usuario actualizado en formato JSON
 * @throws un error si no se pueden actualizar los datos del usuario
 * @version 20/03/2025
 * @since 20/03/2025
 */
export const updateUser = async (user: User, formData: any, token: string) => {
  try {
    //Actualiza los datos del usuario
    const response = await fetch(`${baseUrl}/id/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error(
      "Error updating data: / Error al actualizar los datos:",
      error
    );
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

    const response = await fetch(`${baseUrl}/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error loading services / Error al cargar los servicios");
    }
    const data = await response.json();
    setServices(data.services);
  } catch (error) {
    console.error(
      "Error loading services / Error al cargar los servicios:",
      error
    );
    setError(
      "Server issues, services not available / Problemas con el servidor, servicios no disponibles"
    );
  } finally {
    setLoading(false);
  }
};
