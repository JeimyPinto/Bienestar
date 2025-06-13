import { isValidEmail } from "../../lib/isValidEmail"
import { LoginParams } from "../../types/login"

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export async function login({ email, password, recaptchaToken }: LoginParams) {
    if (!email || !password || !recaptchaToken) {
        throw new Error("Todos los campos son obligatorios.");
    }
    if (!isValidEmail(email)) {
        throw new Error("Formato de correo electrónico inválido.");
    }

    try {
        const response = await fetch(`${url}/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, recaptchaToken }),
                credentials: "include",
            });

        const responseData = await response.json();
        const { message, token, error, details } = responseData;

        if (!response.ok) {
            if (details) {
                console.error("Detalles del error de login:", details);
            }
            return {
                message: message || "Error de inicio de sesión. Por favor, inténtalo de nuevo.",
                token: null,
                error: error || null
            };
        }
        return { message, token, error: null };
    } catch (error) {
        console.error("Error iniciando sesión en: ", error);
        throw new Error("Error de inicio de sesión. Por favor, inténtalo de nuevo.");
    }
}
