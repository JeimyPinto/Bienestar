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
            if (data.details) {
                console.error("Detalles del error getAll users:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error ?? "Error al obtener los usuarios.",
                users: null,
            };
        }
        return {
            message: data.message ?? null,
            users: data.users ?? null,
            error: null,
        };
    } catch (error) {
        return {
            message: null,
            error: "Error interno del servidor",
            users: null,
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
            if (data.details) {
                console.error("Detalles del error getAllActive users:", data.details);
            }
            return {
                message: data.message ?? null,
                users: [],
                error: data.error ?? "Error al obtener los usuarios activos.",
            };
        }
        return {
            message: data.message ?? null,
            users: data.users ?? [],
            error: null,
        };
    } catch (error) {
        return {
            message: "Error interno del servidor",
            users: [],
            error: String(error),
        };
    }
}

// Obtener usuarios paginados
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
            if (data.details) {
                console.error("Detalles del error getAllPaginated users:", data.details);
            }
            return {
                message: data.message || "Error al obtener los usuarios.",
                error: data.error,
                users: null,
            };
        }
        return {
            message: data.message ?? null,
            users: data.users ?? [],
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            totalUsers: data.totalUsers,
            error: null,
        };
    } catch (error) {
        return {
            message: "Error Service /Error en el servidor.",
            error,
            users: null,
        };
    }
}

// Crear usuario (ADMIN, SUPERADMIN)
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
            if (data.details) {
                console.error("Detalles del error create user:", data.details);
            }
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

// Actualizar usuario (ADMIN, SUPERADMIN)
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
            if (data.details) {
                console.error("Detalles del error update user:", data.details);
            }
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