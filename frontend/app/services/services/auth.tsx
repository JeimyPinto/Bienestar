import { isValidEmail } from "../../lib/isValidEmail"
import { LoginParams } from "../../types/login"

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export async function verifyRecaptchaBackend(recaptchaToken: string) {
    const response = await fetch(`${url}/verify-recaptcha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recaptchaToken }),
    });
    const data = await response.json();
    return { success: response.ok, ...data };
}

export async function login({ email, password, recaptchaToken }: LoginParams) {
    if (!email || !password || !recaptchaToken) {
        return { message: "Todos los campos son obligatorios.", token: null };
    }
    if (!isValidEmail(email)) {
        return { message: "Formato de correo electrónico inválido.", token: null };
    }

    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, recaptchaToken }),
            credentials: "include",
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            // Si la respuesta no es JSON, muestra el error crudo
            console.error("Respuesta no JSON del backend:", jsonError);
            return { message: "Error inesperado del servidor.", token: null };
        }

        if (!response.ok) {
            // Imprime el mensaje de error recibido del backend
            console.error("Error de login:", data.message || data.details || data);
            return { message: data.message || "Error al iniciar sesión.", token: null };
        }
        return data;
    } catch (error) {
        console.error("Error iniciando sesión en: ", error);
        return {
            message: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
            token: null
        };
    }
}
