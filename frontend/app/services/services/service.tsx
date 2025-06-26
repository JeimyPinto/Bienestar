import { Service } from "../../types/service";

const url = `${process.env.NEXT_PUBLIC_API_URL}/services`;

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
        return {
            error: true,
            message: "Server error while fetching service. / Error en el servidor al obtener el servicio. (" + error + ")",
            details: error,
        };
    }
}
// Obtener todos los servicios activos (público)
export async function getAllActive() {
    try {
        const res = await fetch(`${url}/active`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        return {
            error: true,
            message: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            details: error,
        };
    }
}

// Obtener todos los servicios (ADMIN, SUPERADMIN)
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
        return {
            error: true,
            message: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            details: error,
        };
    }
}

// Crear un nuevo servicio (ADMIN, SUPERADMIN)
export async function create(service: Service, file?: File, token?: string) {
    try {
        let body: BodyInit;
        const headers: Record<string, string> = {};
        if (file) {
            const formData = new FormData();
            Object.entries(service).forEach(([key, value]) => {
                if (key !== "file") formData.append(key, value !== undefined && value !== null ? String(value) : "");
            });
            formData.append("file", file);
            body = formData;
        } else {
            body = JSON.stringify(service);
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
        return {
            error: true,
            message: "Error Service / Error en el servidor. (" + error + ")",
            details: error,
        };
    }
}

// Actualizar un servicio existente (ADMIN, SUPERADMIN)
export async function update(id: string, service: Service, file?: File, token?: string) {
    try {
        let body: BodyInit;
        const headers: Record<string, string> = {};
        if (file) {
            const formData = new FormData();
            Object.entries(service).forEach(([key, value]) => {
                if (key !== "file" && key !== "id") formData.append(key, value !== undefined && value !== null ? String(value) : "");
            });
            formData.append("file", file);
            body = formData;
        } else {
            body = JSON.stringify(service);
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
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        return {
            error: true,
            message: "Error Service / Error en el servidor. (" + error + ")",
            details: error,
        };
    }
}

// Obtener servicios creados por un usuario específico (ADMIN, SUPERADMIN)
export async function getByUserId(userId: number, token?: string) {
    try {
        const res = await fetch(`${url}/user/${userId}`, {
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
        return {
            error: true,
            message: "Server error while fetching user services. / Error en el servidor al obtener los servicios del usuario",
            details: error,
        };
    }
}
