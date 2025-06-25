import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user?: unknown;
  [key: string]: unknown;
}

// Extrae el usuario del token JWT usando jwt-decode para soportar UTF-8
export default function getUsertoken(token: string) {
  if (!token) {
    throw new Error("Token JWT requerido para extraer el usuario.");
  }
  try {
    const payload = jwtDecode<JwtPayload>(token);
    return payload && payload.user ? payload.user : null;
  } catch {
    throw new Error("Token JWT inválido o corrupto.");
  }
}
