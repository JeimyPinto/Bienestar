import { error } from "console";

const url = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export async function getAllActive() {
    try {
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                message: data.message,
                error: null,
                services: data.services,
            };
        } else {
            return {
                message: null,
                error: data.error || "Error al obtener los servicios.",
                services: null,

            };
        }
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios.",
            services: null,
        };
    }
}

