import { useState, useCallback, useEffect, useRef } from "react";
import { User } from "../interface/user";
import { 
  getAll, 
  getAllActive, 
  getAllPaginated, 
  getAllByRole, 
  getById, 
  getMyProfile,
  create, 
  update 
} from "../services/user";
interface UseUsersOptions {
  token: string | null;
  initialLimit?: number;
  mode?: 'all' | 'allActive' | 'paginated' | 'byRole' | 'byId' | 'myProfile';
  role?: string; // Requerido cuando mode es 'byRole'
  userId?: number; // Requerido cuando mode es 'byId'
  onError?: (message?: string) => void;
}
interface UseUsersReturn<T> {
  users: T[];
  currentPage: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  loading: boolean;
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  fetchUsers: () => Promise<{ error: boolean; message?: string }>;
  refreshUsers: () => void;
  // Métodos CRUD
  createUser: (user: User, file?: File) => Promise<{ error: boolean; message?: string }>;
  updateUser: (id: number, user: User, file?: File) => Promise<{ error: boolean; message?: string }>;
}
export const useUsers = ({ 
  token, 
  initialLimit = 10, 
  mode = 'paginated', 
  role, 
  userId,
  onError 
}: UseUsersOptions): UseUsersReturn<User> => {
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

  // Cargar usuarios según el modo
  const fetchUsers = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: false }; // No hacer fetch si no hay token
    setLoading(true);
    
    try {
      let res;
      
      switch (mode) {
        case 'all':
          res = await getAll(token);
          break;
        case 'allActive':
          res = await getAllActive(token);
          break;
        case 'paginated':
          res = await getAllPaginated(currentPage, limit, token);
          break;
        case 'byRole':
          if (!role) return { error: true, message: "Rol requerido para modo 'byRole'" };
          res = await getAllByRole(role, token);
          break;
        case 'byId':
          if (!userId) return { error: true, message: "userId requerido para modo 'byId'" };
          res = await getById(userId, token);
          // Para byId, convertir el usuario único en un array
          if (!res.error && res.user) {
            res.users = [res.user];
          }
          break;
        case 'myProfile':
          res = await getMyProfile(token);
          // Para myProfile, convertir el usuario único en un array
          if (!res.error && res.user) {
            res.users = [res.user];
          }
          break;
        default:
          return { error: true, message: "Modo no válido" };
      }

      if (res.error) {
        setUsers(res.users || []);
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setUsers(res.users || []);
        
        // Solo actualizar datos de paginación en modo paginated
        if (mode === 'paginated') {
          setTotalUsers(res.totalUsers || res.users?.length || 0);
          setTotalPages(res.totalPages || 1);
        }
        
        return { error: false };
      }
    } catch {
      setUsers([]);
      const errorMsg = "Error al cargar usuarios";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, token, mode, role, userId]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };
    
    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad = 
      (mode === 'all' && token) ||
      (mode === 'allActive' && token) ||
      (mode === 'paginated' && token) ||
      (mode === 'byRole' && token && role) ||
      (mode === 'byId' && token && userId) ||
      (mode === 'myProfile' && token);
    
    if (shouldLoad) {
      loadUsers();
    }
  }, [fetchUsers, token, mode, role, userId]);

  // Función para refrescar usuarios después de operaciones CRUD
  const refreshUsers = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Métodos CRUD
  const createUser = useCallback(async (user: User, file?: File): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para crear usuario" };
    
    try {
      const res = await create(user, file, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de crear
        await fetchUsers();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al crear usuario";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchUsers]);

  const updateUser = useCallback(async (id: number, user: User, file?: File): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para actualizar usuario" };
    
    try {
      const res = await update(id, user, file, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de actualizar
        await fetchUsers();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al actualizar usuario";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchUsers]);

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
    
    // Funciones CRUD
    fetchUsers,
    refreshUsers,
    createUser,
    updateUser,
  };
};
