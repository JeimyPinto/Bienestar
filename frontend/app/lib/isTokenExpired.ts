export default function isTokenExpired(token: string | null) {
    if (!token) return true;
    try {
        const parts = token.split(".");
        if (parts.length !== 3) {
            console.error("Token mal formado:", token);
            return true;
        }
        // JWT usa base64url, reemplaza caracteres antes de decodificar
        let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        // Padding para base64
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }
        const payload = JSON.parse(atob(base64));
        return !payload.exp || payload.exp * 1000 < Date.now();
    } catch (e) {
        console.error("Error decodificando token:", e);
        return true;
    }
}