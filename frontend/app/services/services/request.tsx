const url = `${process.env.NEXT_PUBLIC_API_URL}/requests`;

// Obtener todas las solicitudes activas (ADMIN, SUPERADMIN)
export async function getAllActive(token?: string) {
    try {
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error getAllActive requests:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al obtener las solicitudes activas.",
                requests: [],
            };
        }
        return {
            message: data.message ?? null,
            error: null,
            requests: data.requests ?? [],
        };
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching requests. / Error en el servidor al obtener las solicitudes. (" + error + ")",
            requests: [],
        };
    }
}

// Obtener todas las solicitudes (ADMIN, SUPERADMIN)
export async function getAll(token?: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error getAll requests:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al obtener las solicitudes.",
                requests: [],
            };
        }
        return {
            message: data.message ?? null,
            error: null,
            requests: data.requests ?? [],
        };
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching requests. / Error en el servidor al obtener las solicitudes. (" + error + ")",
            requests: [],
        };
    }
}

// Obtener una solicitud por ID (ADMIN, SUPERADMIN)
export async function getById(id: number, token?: string) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error getById request:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al obtener la solicitud por ID.",
                request: null,
            };
        }
        return {
            message: data.message ?? null,
            error: null,
            request: data.request ?? null,
        };
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching request by ID. / Error en el servidor al obtener la solicitud por ID. (" + error + ")",
            request: null,
        };
    }
}

// Crear una nueva solicitud (ADMIN, SUPERADMIN)
export async function create(request: Record<string, unknown>, token?: string) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(request),
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error create request:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al crear la solicitud.",
                request: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message: "Error en el servidor al crear la solicitud",
            details: error,
        };
    }
}

// Actualizar una solicitud existente (ADMIN, SUPERADMIN)
export async function update(id: number, request: Record<string, unknown>, token?: string) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(request),
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error update request:", data.details);
            }
            return {
                message: data.message,
            };
        }
        return data;
    } catch (error) {
        return {
            message: "Error en el servidor al actualizar la solicitud",
            details: error,
        };
    }
}

// Obtener todas las solicitudes de un usuario específico
export async function getByUserId(userId: string, token?: string) {
    try {
        const response = await fetch(`${url}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error getByUserId requests:", data.details);
            }
            return {
                message: data.message,
            };
        }
        return data;
    } catch (error) {
        return {
            message: "Error en el servidor al obtener las solicitudes del usuario",
            details: error,
        };
    }
}
