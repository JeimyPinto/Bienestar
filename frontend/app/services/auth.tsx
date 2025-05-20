import { isValidEmail } from "../lib/isValidEmail";
import { LoginParams } from "../lib/interface";

const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;


export async function login({ email, password, recaptchaToken }: LoginParams) {
    if (!email || !password || !recaptchaToken) {
        throw new Error("All fields are required. / Todos los campos son obligatorios.");
    }
    if (!isValidEmail(email)) {
        throw new Error("Invalid email format. / Formato de correo electrónico inválido.");
    }

    try {
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, recaptchaToken }),
        });

        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(`${message || "Login failed. Please try again."} / Error de inicio de sesión. Por favor, inténtalo de nuevo.`);
        }

        // Recupera el mensaje y el token del servidor
        const { message, token } = await response.json();
        return { message, token };
        return { message };
    } catch (error) {
        console.error("Error logging in: / Error iniciando sesión en: ", error);
        throw new Error("Login failed. Please try again. / Error de inicio de sesión. Por favor, inténtalo de nuevo.");
    }
}
