
import { Service } from "../../types/service";
const url = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export async function getAllActive() {
    try {
        const response = await fetch(`${url}/active`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            return {
                message: data.message,
                error: null,
                services: data.services,
            };
        } else {
            return {
                message: null,
                error: data.error || "Error al obtener los servicios.",
                services: null,

            };
        }
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            services: null,
        };
    }
}

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

        if (response.ok) {
            return {
                message: data.message,
                error: null,
                services: data.services,
            };
        } else {
            return {
                message: null,
                error: data.error || "Error fetching services. / Error al obtener los servicios.",
                services: null,
            };
        }
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios. (" + error + ")",
            services: null,
        };
    }
}

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
            return {
                message: null,
                error: "Error al crear el servicio. / Error creating service. ( " + (data.error || "Unknown error") + " )",
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
            return {
                message: null,
                error: "Error al actualizar el servicio. / Error updating service. ( " + (data.error || "Unknown error") + " )",
                service: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message:null,
            error: "Error Service / Error en el servidor. (" + error + ")",
            service: null,
        };
    }
}
