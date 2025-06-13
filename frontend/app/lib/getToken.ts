import getCookie from "./getCookie";

// Obtiene el token de autenticación según el entorno (local o producción)
export default function getToken(): string | null {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
    return localStorage.getItem("token");
  } else {
    return getCookie("token");
  }
}
