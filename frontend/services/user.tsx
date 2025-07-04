import { User } from "../interface/user"

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
        if (!res.ok || data.error) {
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
        if (!res.ok || data.error) {
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
        if (!res.ok || data.error) {
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
        
        console.log("Respuesta del servidor (create):", { 
            status: res.status, 
            statusText: res.statusText,
            contentType: res.headers.get('content-type')
        });
        
        // Verificar si la respuesta es JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await res.text();
            console.error("Respuesta no es JSON:", textResponse.substring(0, 500));
            return {
                error: true,
                message: `Error del servidor (${res.status}): Respuesta no válida`,
                details: { status: res.status, contentType, response: textResponse.substring(0, 200) }
            };
        }
        
        const data = await res.json();
        console.log("Datos JSON recibidos:", data);
        
        if (!res.ok || data.error) {
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
        if (!res.ok || data.error) {
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
        if (!res.ok || data.error) {
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
        if (!res.ok || data.error) {
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

export async function getMyProfile(token?: string) {
    try {
        const res = await fetch(`${url}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en la función getMyProfile:" + error)
        return {
            error: true,
            message: "Error interno del servidor",
            details: error
        };
    }
}

// Carga masiva de usuarios desde Excel (ADMIN, SUPERADMIN)
export async function bulkUpload(file: File, token?: string) {
    try {
        const formData = new FormData();
        formData.append("excel", file);

        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-users/upload`, {
            method: "POST",
            headers,
            body: formData,
            credentials: "include",
        });

        console.log("Respuesta del servidor (bulkUpload):", { 
            status: res.status, 
            statusText: res.statusText,
            contentType: res.headers.get('content-type')
        });

        // Verificar si la respuesta es JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const textResponse = await res.text();
            console.error("Respuesta no es JSON:", textResponse.substring(0, 500));
            return {
                error: true,
                message: `Error del servidor (${res.status}): Respuesta no válida`,
                details: { status: res.status, contentType, response: textResponse.substring(0, 200) }
            };
        }

        const data = await res.json();
        console.log("Datos JSON recibidos (bulkUpload):", data);

        if (!res.ok || data.error) {
            return { error: true, message: data.message, details: data.details };
        }
        return { error: false, ...data };
    } catch (error) {
        console.error("Error en bulkUpload:", error);
        return {
            error: true,
            message: "Error al procesar la carga masiva",
            details: error,
        };
    }
}

// Descargar plantilla Excel para carga masiva (ADMIN, SUPERADMIN)
export async function downloadBulkTemplate(token?: string) {
    try {
        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-users/template`, {
            method: "GET",
            headers,
            credentials: "include",
        });

        console.log("Respuesta del servidor (downloadTemplate):", { 
            status: res.status, 
            statusText: res.statusText,
            contentType: res.headers.get('content-type')
        });

        if (!res.ok) {
            // Si hay error, intentar obtener mensaje JSON
            try {
                const errorData = await res.json();
                return {
                    error: true,
                    message: errorData.message || "Error al descargar plantilla",
                    details: errorData.details
                };
            } catch {
                return {
                    error: true,
                    message: `Error del servidor (${res.status}): ${res.statusText}`,
                    details: { status: res.status }
                };
            }
        }

        // Si la respuesta es exitosa, devolver el blob para descarga
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'plantilla_usuarios.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        return { 
            error: false, 
            message: "Plantilla descargada exitosamente" 
        };
    } catch (error) {
        console.error("Error en downloadBulkTemplate:", error);
        return {
            error: true,
            message: "Error al descargar la plantilla",
            details: error,
        };
    }
}