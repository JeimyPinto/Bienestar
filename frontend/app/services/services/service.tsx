import { Service } from "../../types/service";
const url = `${process.env.NEXT_PUBLIC_API_URL}/services`;

// Obtener todos los servicios activos (público)
export async function getAllActive() {
    try {
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error getAllActive services:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al obtener los servicios.",
                services: [],
            };
        }
        return {
            message: data.message ?? null,
            error: null,
            services: data.services ?? [],
        };
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            services: [],
        };
    }
}

// Obtener todos los servicios (ADMIN, SUPERADMIN)
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
                console.error("Detalles del error getAll services:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al obtener los servicios.",
                services: [],
            };
        }
        return {
            message: data.message ?? null,
            error: null,
            services: data.services ?? [],
        };
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            services: [],
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
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error create service:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al crear el servicio.",
                service: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message: null,
            error: "Error Service / Error en el servidor. (" + error + ")",
            service: null,
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
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers,
            body,
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error update service:", data.details);
            }
            return {
                message: data.message ?? null,
                error: data.error || "Error al actualizar el servicio.",
                service: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message: "Error en el servidor",
            details: error.message,
        };
    }
}

// Obtener servicios creados por un usuario específico (ADMIN, SUPERADMIN)
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
                console.error("Detalles del error getByUserId services:", data.details);
            }
            return {
                message: data.message,
                services: [],
            };
        }
        return {
            message: data.message,
            services: data.services ?? [],
        };
    } catch (error) {
        return {
            message: "Server error while fetching user services. / Error en el servidor al obtener los servicios del usuario",
            details: error.message
        };
    }
}
