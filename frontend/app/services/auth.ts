import { LoginParams } from "../lib/interface";
const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;
import { isValidEmail } from "../lib/isValidEmail";



export async function login({ email, password, recaptchaToken }: LoginParams) {
    if (!email || !password || !recaptchaToken) {
        throw new Error("All fields are required.");
    }
    if (!isValidEmail(email)) {
        throw new Error("Invalid email format.");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, recaptchaToken }),
        });

        if (!response.ok) {
            let errorMsg = "Login failed. Please try again.";
            try {
                const error = await response.json();
                errorMsg = error?.message || errorMsg;
            } catch { }
            throw new Error(errorMsg);
        }

        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Login failed. Please try again.");
    }
}