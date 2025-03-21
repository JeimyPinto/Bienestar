import { User, UploadResponse } from "../lib/types";

export const editableRoles = ["admin", "integrante"];

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
/**
 * Fetch para obtener todos los usuarios.
 * @param token el token de autorización
 * @returns los datos de todos los usuarios en formato JSON
 * @throws un error si no se pueden obtener los datos de los usuarios
 * @version 20/03/2025
 * @since 20/03/2025
 */
export async function fetchUsers(token: string): Promise<User[]> {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const users = await response.json();
      return users;
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
 * @version 21/03/2025
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

    // Obtener la imagen de perfil del usuario
    const imageResponse = await fetch(
      `${baseUrl}/images/profile/${user.id}/${user.image}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!imageResponse.ok) {
      throw new Error(
        "Error fetching user profile picture / Error al obtener la imagen de perfil del usuario"
      );
    }

    // Obtener el blob de la imagen y convertirlo a una URL de objeto
    const blob = await imageResponse.blob();
    const imageUrl = URL.createObjectURL(blob);

    // Añadir la URL de la imagen al usuario
    userData.image = imageUrl;
    return userData;
  } catch (error) {
    console.error(
      "Error fetching user data and profile picture / Error al obtener los datos del usuario y la imagen de perfil:",
      error
    );
    throw error;
  }
};

/**
 * Fetch que actualiza los datos de un usuario y si hay que actualizar la imagen de perfil lo direcciona a otro fetch.
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
    //Manda a una URL diferente dependiendo del rol del usuario
    const url = editableRoles.includes(user.role)
      ? `${baseUrl}/update/${user.id}`
      : `${baseUrl}/update-self`;

    //Valida si el formulario tiene una imagen para subir y si la tiene manda la imagen a la URL especificada
    if (formData.image) {
      const imageResponse = await uploadProfileImage(formData.image, token);
      user.image = imageResponse.fileName;
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
export const uploadProfileImage = async (
  formData: FormData,
  token: string
): Promise<UploadResponse> => {
  try {
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const response = await fetch(`${baseUrl}/upload/images/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error uploading image / Error al subir la imagen");
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

export const updateUserImage = async (
  userId: string,
  newImage: any,
  token: string
) => {
  try {
    const response = await fetch(`${baseUrl}/${userId}/image`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newImage),
    });
    if (response.ok) {
      const imageData = await response.json();
      return imageData;
    } else {
      throw new Error("Error al actualizar la imagen del usuario");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
