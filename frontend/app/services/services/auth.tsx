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

        const data = await response.json();
        if (!response.ok) {
            if (data.details) {
                console.error("Detalles del error de login:", data.details);
                return { message: data.details, token: null };
            }
        }
        return data;
    } catch (error) {
        console.error("Error iniciando sesión en: ", error);
        return{
            message: "Error al iniciar sesión. Por favor, inténtalo de nuevo.",
            details: error
        }
    }
}
