import {User} from "../interface/user";

export const tokenManager = {
  // Guardar token
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem("token", token);
    }
  },

  // Obtener token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  },

  // Eliminar token
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      // También limpiar otros datos del usuario si los hay
      localStorage.removeItem("user");
    }
  },

  // Verificar si hay token
  hasToken(): boolean {
    return this.getToken() !== null;
  },

  // Guardar datos del usuario
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  // Obtener datos del usuario
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};