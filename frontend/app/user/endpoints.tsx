import { User } from "../lib/types";

export const editableRoles = ["admin", "integrante"];

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;

/**
 * Fetch para obtener los datos de todos los usuarios.
 * @param page la página a obtener (por defecto 1)
 * @param limit el número de usuarios por página (por defecto 10)
 * @param token el token de autorización
 * @returns un objeto con los usuarios, la página actual, el total de páginas, el total de usuarios, y un mensaje
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
  message: string;
}> {
  try {
    const response = await fetch(`${baseUrl}?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        users: data.users,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalUsers: data.totalUsers,
        message: data.message,
      };
    } else {
      throw new Error(data.message || "Error fetching users / Error al obtener usuarios");
    }
  } catch (error) {
    console.error("Error fetching users: / Error al obtener usuarios", error);
    throw error;
  }
}

/**
 * fetch para obtener los datos de un usuario por su ID.
 * @param token el token de autorización
 * @param userId el ID del usuario a obtener (si no se proporciona, se obtiene el ID del token)
 * @returns un objeto con los datos del usuario, un mensaje y la imagen del usuario
 * @throws Error si ocurre un error al obtener los datos del usuario
 */
export const fetchUserById = async (
  token: string,
  userId?: string
): Promise<{
  user: User;
  message: string;
  image: string | null;
}> => {
  const id = userId || JSON.parse(atob(token.split(".")[1])).id;

  try {
    const response = await fetch(`${baseUrl}/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        user: data,
        message: data.message,
        image: data.image,
      };
    } else {
      throw new Error(data.message || "Error fetching user data / Error al obtener datos del usuario");
    }
  } catch (error) {
    console.error("Error fetching user data: / Error al obtener datos del usuario", error);
    throw error;
  }
};

/**
 * Fetch para crear un nuevo usuario. (solo administradores)
 * @param form el formulario con los datos del usuario
 * @param token el token de autorización
 * @returns los datos del usuario creado y un mensaje
 */
export async function createUser(
  form: FormData,
  token: string
): Promise<{ user: User; message: string }> {
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

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error creating user");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Fetch que actualiza los datos de un usuario.
 * @param user el usuario a actualizar
 * @param formData los datos del formulario
 * @param token el token de autorización
 * @returns los datos del usuario actualizado y un mensaje
 */
export const updateUser = async (
  user: User,
  formData: any,
  token: string
): Promise<{ updatedUser: User; message: string }> => {
  try {
    const response = await fetch(`${baseUrl}/id/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error updating user data");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

/**
 * Fetch para obtener los servicios de un usuario.
 * @param setServices función para establecer los servicios
 * @param setLoading función para establecer el estado de carga
 * @param setError función para establecer el error
 */
export const fetchUserServices = async (
  setServices: (services: any) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const user = JSON.parse(atob(token.split(".")[1]));
    const userId = user.id;

    const response = await fetch(`${baseUrl}/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setServices(data.services);
    } else {
      throw new Error(data.message || "Error loading services");
    }
  } catch (error) {
    console.error("Error loading services:", error);
    setError(
      "Server issues, services not available / Problemas con el servidor, servicios no disponibles"
    );
  } finally {
    setLoading(false);
  }
};