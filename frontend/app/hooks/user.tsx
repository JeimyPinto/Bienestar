import { useEffect, useState } from "react";
import { fetchUserById } from "../user/endpoints";
import { User } from "../lib/types";

/**
 * Hook para cargar los datos del usuario al cargar la página.
 * @param token el token de autorización
 * @version 20/03/2025
 * @since 20/03/2025
 */
export async function fetchUser (token: string | null): Promise<User> {
  if (!token || typeof token !== "string") {
    throw new Error("Token is invalid or not provided");
  }

  try {
    const id = JSON.parse(atob(token.split(".")[1])).id;
    const userData = await fetchUserById(id, token);
    return userData;
  } catch (error) {
    console.error("Error fetching user data/Error al obtener los datos del usuario", error);
    throw error;
  }
}

/**
 * Hook para cargar los datos del usuario.
 * @param token el token de autorización
 * @returns [User  | null, string | null] - El usuario y un mensaje de error
 * @version 20/03/2025
 * @since 20/03/2025
 */
export function useFetchUser (token: string | null): [User  | null, string | null] {
  const [user, setUser ] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser  = async (): Promise<void> => {
      if (token) {
        try {
          const userData = await fetchUser (token);
          setUser (userData);
        } catch (error) {
          setError("Error al cargar los datos del usuario: " + error);
        }
      } else {
        setError("Token is null / El token es nulo");
      }
    };

    loadUser ();
  }, [token]);

  return [user, error];
}