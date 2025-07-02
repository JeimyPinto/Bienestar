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
            console.error("Respuesta no JSON del backend:", jsonError);
            return { error: "Error inesperado del servidor.", token: null };
        }

        if (!response.ok) {
            console.error("Error de login:", data.message || data.details || data);
            return { error: data.message || "Error al iniciar sesión.", token: null };
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
                message: data.message || "Login exitoso"
            };
        } else {
            return { error: "No se recibió token del servidor.", token: null };
        }

    } catch (error) {
        console.error("Error iniciando sesión en: ", error);
        return {
            error: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
            token: null
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
    } catch (error) {
        console.error("Error en logout:", error);
    } finally {
        // Siempre limpiar localStorage usando tokenManager
        tokenManager.clearSession();
    }
}
