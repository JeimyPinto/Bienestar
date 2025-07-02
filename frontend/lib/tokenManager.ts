import { User } from "../interface/user";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  user?: unknown;
  exp?: number;
  [key: string]: unknown;
}

// Token Manager - Fuente única de verdad para manejo de tokens y usuario
export const tokenManager = {
  // Guardar token
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  },

  // Obtener token
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  // Eliminar token
  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Verificar si hay token
  hasToken(): boolean {
    return this.getToken() !== null;
  },

  // Verificar si el token está expirado (usando jwt-decode) - optimizado
  isTokenExpired(token?: string | null): boolean {
    const tokenToCheck = token || this.getToken();
    if (!tokenToCheck) return true;
    
    try {
      const payload = jwtDecode<JwtPayload>(tokenToCheck);
      if (!payload.exp) return true;
      
      const currentTime = Math.floor(Date.now() / 1000);
      // Agregar margen de 30 segundos para evitar problemas de sincronización
      return payload.exp < (currentTime + 30);
    } catch (error) {
      console.warn("Error al decodificar token:", error);
      return true; // Si hay error, considerar expirado
    }
  },

  // Extraer usuario del token JWT
  getUserFromToken(token?: string): User | null {
    const tokenToUse = token || this.getToken();
    if (!tokenToUse) return null;

    try {
      const payload = jwtDecode<JwtPayload>(tokenToUse);
      return payload && payload.user ? payload.user as User : null;
    } catch (error) {
      console.error("Error al extraer usuario del token:", error);
      return null;
    }
  },

  // Guardar datos del usuario
  setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  // Obtener datos del usuario (prioriza localStorage, luego token)
  getUser(): User | null {
    if (typeof window !== "undefined") {
      // Primero intentar obtener de localStorage
      const userFromStorage = localStorage.getItem("user");
      if (userFromStorage) {
        try {
          return JSON.parse(userFromStorage);
        } catch (error) {
          console.warn("Error parsing user from localStorage:", error);
        }
      }
      
      // Si no hay en localStorage, intentar extraer del token
      return this.getUserFromToken();
    }
    return null;
  },

  // Obtener token válido (que no esté expirado)
  getValidToken(): string | null {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.removeToken(); // Limpiar token expirado
      return null;
    }
    return token;
  },

  // Validar sesión completa (token válido y usuario disponible) - optimizado
  validateSession(): { isValid: boolean; token: string | null; user: User | null } {
    if (typeof window === "undefined") {
      return { isValid: false, token: null, user: null };
    }

    const token = this.getToken();
    
    // Si no hay token, sesión inválida
    if (!token) {
      return { isValid: false, token: null, user: null };
    }

    // Si el token está expirado, limpiar y retornar inválido
    if (this.isTokenExpired(token)) {
      this.clearSession();
      return { isValid: false, token: null, user: null };
    }

    // Obtener usuario
    const user = this.getUser();
    
    return {
      isValid: !!token && !!user,
      token,
      user
    };
  },

  // Limpiar todos los datos de sesión
  clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Guardar sesión completa (token + usuario)
  saveSession(token: string, user: User): void {
    this.setToken(token);
    this.setUser(user);
  }
};

// Función de conveniencia para obtener token (mantener retrocompatibilidad)
export default function getToken(): string | null {
  return tokenManager.getValidToken();
}

// Exportar funciones individuales para retrocompatibilidad
export function getUserToken(token: string): User | null {
  return tokenManager.getUserFromToken(token);
}

export function isTokenExpired(token: string | null): boolean {
  return tokenManager.isTokenExpired(token);
}
