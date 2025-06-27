import { tokenManager } from "./tokenManager";

// Usar el tokenManager para obtener el token
export default function getToken(): string | null {
  return tokenManager.getToken();
}