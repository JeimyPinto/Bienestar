import { Service } from "../lib/interface";
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/services`;

//Obtiene todos los servicios
export async function fetchServices(token: string): Promise<{
  services: Service[];
  message: string;
}> {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        services: data.services,
        message: data.message,
      };
    } else {
      throw new Error(
        data.message || "Error fetching users / Error al obtener usuarios"
      );
    }
  } catch (error) {
    console.error("Error fetching users: / Error al obtener usuarios", error);
    throw error;
  }
}
//Obtiene todos los servicios activos
export async function fetchServicesActive(token: string): Promise<{
  services: Service[];
  message: string;
}> {
  try {
    const response = await fetch(`${baseUrl}/getAllActive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        services: data.services,
        message: data.message,
      };
    } else {
      throw new Error(
        data.message || "Error fetching users / Error al obtener usuarios"
      );
    }
  } catch (error) {
    console.error("Error fetching users: / Error al obtener usuarios", error);
    throw error;
  }
}
