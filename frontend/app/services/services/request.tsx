import { error } from "console";

const url = `${process.env.NEXT_PUBLIC_API_URL}/requests`;

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

        if (response.ok) {
            return {
                message: data.message,
                error: null,
                requests: data.requests,
            };
        } else {
            return {
                message: null,
                error: data.error || "Error fetching requests. / Error al obtener las solicitudes.",
                requests: null,
            };
        }
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching services. / Error en el servidor al obtener los servicios.",
            requests: null,
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
                requests: data.requests,
            };
        } else {
            return {
                message: null,
                error: data.error || "Error fetching requests. / Error al obtener las solicitudes.",
                requests: null,
            };
        }
    } catch (error) {
        return {
            message: null,
            error: "Server error while fetching requests. / Error en el servidor al obtener las solicitudes.",
            requests: null,
        };
    }
}

export async function create(request: any, token?: string) {
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
            return {
                message: null,
                error: data.error || "Error creating request. / Error al crear la solicitud.",
                request: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message: null,
            error: "Server error while creating request. / Error en el servidor al crear la solicitud. (" + error + ")",
            request: null,
        };
    }
}

export async function update(id: number, request: any, token?: string) {
    try {
        let body: BodyInit;
        let headers: Record<string, string> = {};

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: "active" }),
            credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                message: null,
                error: data.error || "Error updating request. / Error al actualizar la solicitud.",
                request: null,
            };
        }
        return data;
    } catch (error) {
        return {
            message: null,
            error: "Server error while updating request. / Error en el servidor al actualizar la solicitud. (" + error + ")",
            request: null,
        };
    }
}
