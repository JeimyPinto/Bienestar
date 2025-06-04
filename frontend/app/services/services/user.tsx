const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export async function getAllPaginated(page = 1, limit = 10, token?: string) {
    try {
        const response = await fetch(`${url}/paginated?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            }, credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                message: data.message || "Error al obtener los usuarios.",
                error: data.error,
            };
        }
        return data;
    } catch (error) {
        return {
            message: "Error Service /Error en el servidor.",
            error,
        };
    }
}