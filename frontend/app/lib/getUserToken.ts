import { jwtDecode } from "jwt-decode";

// Extrae el usuario del token JWT usando jwt-decode para soportar UTF-8
export default function getUsertoken(token: string) {
  if (!token) {
    throw new Error("Token JWT requerido para extraer el usuario.");
  }
  try {
    const payload: any = jwtDecode(token);
    return payload && payload.user ? payload.user : null;
  } catch (err) {
    throw new Error("Token JWT inválido o corrupto.");
  }
}
