const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;

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

export async function create(user: any, file?: File, token?: string) {
    try {
        let body: BodyInit;
        let headers: Record<string, string> = {};

        if (file) {
            const formData = new FormData();
            Object.entries(user).forEach(([key, value]) => {
                if (key !== "file") formData.append(key, value as string);
            }); body = formData;
            formData.append("file", file);
            // Do not set Content-Type header for FormData
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
