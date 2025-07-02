import isValidEmail from "../lib/isValidEmail";
import { tokenManager } from "../lib/tokenManager";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export async function verifyRecaptchaBackend(recaptchaToken: string) {
    const response = await fetch(`${url}/verify-recaptcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken }),
    });
    const data = await response.json();
    return { success: response.ok, ...data };
}

type LoginParams = {
    email: string;
    password: string;
    recaptchaToken: string;
};

export async function login({ email, password, recaptchaToken }: LoginParams) {
    if (!email || !password || !recaptchaToken) {
        return { error: "Todos los campos son obligatorios.", token: null };
    }
    if (!isValidEmail(email)) {
        return { error: "Formato de correo electrónico inválido.", token: null };
    }

    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, recaptchaToken }),
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            return { error: "Error inesperado del servidor.", token: null, details: jsonError };
        }

        if (!response.ok || data.details) {
            return { error: true, message: data.message, details: data.details };
        }

        // Guardar token y usuario en localStorage usando tokenManager
        if (data.token) {
            if (data.user) {
                tokenManager.saveSession(data.token, data.user);
            } else {
                tokenManager.setToken(data.token);
            }

            // Retornar datos exitosos
            return {
                token: data.token,
                user: data.user,
                message: data.message
            };
        } else {
            return { error: "No se recibió token del servidor.", token: null };
        }

    } catch (error) {
        return {
            error: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
            token: null,
            details: error
        };
    }
}

export async function logout() {
    try {
        // Llamar al endpoint de logout (opcional)
        await fetch(`${url}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenManager.getToken()}`
            },
        });
    } catch {
        // Error será manejado por el hook si es necesario
    } finally {
        // Siempre limpiar localStorage usando tokenManager
        tokenManager.clearSession();
    }
}
