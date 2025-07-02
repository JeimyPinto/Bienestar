import { User } from "../../../types/user"

const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export async function getAll(token?: string) {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        }
    }
}

export async function getAllActive(token?: string) {
    try {
        const res = await fetch(`${url}/active`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        };
    }
}

// Obtener usuarios paginados
export async function getAllPaginated(page = 1, limit = 10, token?: string) {
    try {
        const res = await fetch(`${url}/paginated?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            }, credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
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
        const res = await fetch(url, {
            method: "POST",
            headers,
            body,
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función:" + error)
        return {
            error: true,
            message: "Error Service /Error en el servidor.",
            details: error,
        };
    }
}

// Actualizar usuario (ADMIN, SUPERADMIN)
export async function update(id: number, user: User, file?: File, token?: string) {
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
        const res = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers,
            body,
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            console.error("Error al actualizar usuario:", data.details);
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función:" + error)
        return {
            error: true,
            message: "Error Service /Error en el servidor.",
            details: error,
        };
    }
}

// Obtener usuarios por rol (flexible, por ejemplo: instructor)
export async function getAllByRole(role: string, token?: string) {
    try {
        const res = await fetch(`${url}/role/${role}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función getAllByRole:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        };
    }
}

export async function getById(id: number, token?: string) {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función getById:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        };
    }
}