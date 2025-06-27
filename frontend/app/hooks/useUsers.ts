import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "../types/user";
import { UseUsersOptions, UseUsersReturn } from "../types";
import { getAllPaginated } from "../services/services/user";

export const useUsers = ({ token, initialLimit = 10, onError }: UseUsersOptions): UseUsersReturn<User> => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar usuarios paginados
  const fetchUsers = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: false }; // No hacer fetch si no hay token
    setLoading(true);
    
    try {
      const res = await getAllPaginated(currentPage, limit, token);
      if (res.error) {
        setUsers(res.users || []);
        onErrorRef.current?.(res.message); // Usar la ref para evitar dependencias
        return { error: true, message: res.message };
      } else {
        setUsers(res.users);
        setTotalUsers(res.totalUsers || res.users.length);
        setTotalPages(res.totalPages || 1);
        return { error: false };
      }
    } catch {
      setUsers([]);
      const errorMsg = "Error al cargar usuarios";
      onErrorRef.current?.(errorMsg); // Usar la ref para evitar dependencias
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, token]); // Removido onError de las dependencias

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
      // Los errores ya se manejan dentro de fetchUsers
    };
    
    if (token) {
      loadUsers();
    }
  }, [fetchUsers, token]); // fetchUsers ahora es más estable debido a la optimización

  // Función para refrescar usuarios después de operaciones CRUD
  const refreshUsers = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Estado
    users,
    currentPage,
    limit,
    totalUsers,
    totalPages,
    loading,
    
    // Setters
    setUsers,
    setCurrentPage,
    setLimit,
    
    // Funciones
    fetchUsers,
    refreshUsers,
  };
};
