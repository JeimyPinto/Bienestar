const url = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export async function getAllActive() {
    try {
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data.services) {
            return { services: data.services, message: data.message };
        } else {
            return { message: data.message || "Error return services / Error al obtener los servicios." };
        }
    } catch (error) {
        return {
            message: "Error Service /Error en el servidor.",
            error,
        };
    }
}