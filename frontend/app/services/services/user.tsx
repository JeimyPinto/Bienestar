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
        if (!response.ok || data.details) {
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
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.details) {
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
        const response = await fetch(`${url}/paginated?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            }, credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.details) {
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
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.details) {
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
        if (!response.ok || data.details) {
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

// Obtener instructores (solo usuarios con rol INSTRUCTOR)
export async function getAllInstructors(token?: string) {
    try {
        const response = await fetch(`${url}/instructors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función getAllInstructors:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        };
    }
}