const API_URL = process.env.NEXT_PUBLIC_API_URL + "/audit-logs"

// Obtener todos los registros de auditoría
export async function getAll(token: string) {
    try {
        const res = await fetch(`${API_URL}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
            credentials: "include", // Incluye cookies
        });
        if (!res.ok) throw new Error("Error al obtener auditorías");
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Obtener un registro de auditoría por ID
export async function getAuditLogById(id: string | number, token: string) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
            credentials: "include", // Incluye cookies
        });
        if (!res.ok) throw new Error("Error al obtener auditoría");
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
