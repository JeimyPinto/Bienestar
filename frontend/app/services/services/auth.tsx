import { isValidEmail } from "../../lib/isValidEmail"
import { LoginParams } from "../../types/login"
import { tokenManager } from "../../lib/tokenManager"

// Asegurar que la variable de entorno se lea correctamente
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const url = `${API_URL}/auth`

console.log('🔍 URL de API configurada:', url)

export async function verifyRecaptchaBackend(recaptchaToken: string) {
    console.log('🚀 Enviando reCAPTCHA a:', `${url}/verify-recaptcha`)
    
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
        console.log('🚀 Enviando login a:', `${url}/login`)
        
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, recaptchaToken }),
            // Eliminar credentials: "include" ya que no usamos cookies
        });

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error("Respuesta no JSON del backend:", jsonError);
            return { message: "Error inesperado del servidor.", token: null };
        }

        if (!response.ok) {
            console.error("Error de login:", data.message || data.details || data);
            return { message: data.message || "Error al iniciar sesión.", token: null };
        }

        // Guardar token y usuario en localStorage
        if (data.token) {
            tokenManager.setToken(data.token);
            if (data.user) {
                tokenManager.setUser(data.user);
            }
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
        // Siempre limpiar localStorage
        tokenManager.removeToken();
    }
}
