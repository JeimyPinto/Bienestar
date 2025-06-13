import { User } from "../../types/user"

const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

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
            return {
                message: data.message ?? null,
                error: data.error ?? "Error al obtener los usuarios.",
                users: null,
                details: data.details ?? null,
            };
        }
        return {
            message: data.message ?? null,
            users: data.users ?? null,
            details: data.details ?? null,
            error: null,
        };
    } catch (error) {
        return {
            message: null,
            error: "Error interno del servidor",
            users: null,
            details: null,
        };
    }
}

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
            // 404: No hay usuarios activos registrados
            if (response.status === 404) {
                return {
                    message: data.message ?? null,
                    users: data.details?.users ?? [],
                    details: data.details ?? null,
                    error: null,
                };
            }
            // 400: Error de validación en los datos enviados
            if (response.status === 400) {
                return {
                    message: data.message ?? "Error de validación en los datos enviados",
                    users: null,
                    details: data.details ?? null,
                    error: null,
                };
            }
            // 500: Error interno del servidor o de base de datos
            if (response.status === 500) {
                return {
                    message: data.message ?? "Error interno del servidor",
                    users: null,
                    details: data.details ?? null,
                    error: null,
                };
            }
            // Otros errores
            return {
                message: data.message ?? null,
                users: null,
                details: data.details ?? null,
                error: data.error ?? "Error al obtener los usuarios activos.",
            };
        }
        // 200: Usuarios activos obtenidos correctamente
        return {
            message: data.message ?? null,
            users: data.users ?? [],
            details: data.details ?? null,
            error: null,
        };
    } catch (error) {
        return {
            message: "Error interno del servidor",
            users: null,
            details: null,
            error: String(error),
        };
    }
}
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

export async function create(user: User, file?: File, token?: string) {
    try {
        let body: BodyInit;
        const headers: Record<string, string> = {};

        if (file) {
            const formData = new FormData();
            Object.entries(user).forEach(([key, value]) => {
                if (key !== "file") formData.append(key, value !== undefined && value !== null ? String(value) : "");
            });
            formData.append("file", file);
            body = formData;
        } else {
            body = JSON.stringify(user);
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                message: `${data.message || "Error al crear el usuario."} / Error creating user.`,
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

export async function update(id: string, user: User, file?: File, token?: string) {
    try {
        let body: BodyInit;
        const headers: Record<string, string> = {};

        if (file) {
            const formData = new FormData();
            Object.entries(user).forEach(([key, value]) => {
                if (key !== "file") formData.append(key, value !== undefined && value !== null ? String(value) : "");
            });
            formData.append("file", file);
            body = formData;
        } else {
            body = JSON.stringify(user);
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers,
            body,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                message: `${data.message || "Error al actualizar el usuario."} / Error updating user.`,
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