import { useState, useCallback, useEffect, useRef } from "react";
import { Group } from "../interface/group";
import { getAll, create, update } from "../services/group";

// Define the UseGroupsReturn type
type UseGroupsReturn<T> = {
  // Estado
  groups: T[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  
  // Setters
  setGroups: React.Dispatch<React.SetStateAction<T[]>>;
  
  // Funciones CRUD
  fetchGroups: () => Promise<{ error: boolean; message?: string }>;
  refreshGroups: () => void;
  createGroup: (group: Group) => Promise<{ error: boolean; message?: string }>;
  updateGroup: (id: number, group: Group) => Promise<{ error: boolean; message?: string }>;
  clearMessages: () => void;
};

// Define UseGroupsOptions type
type UseGroupsOptions = {
  token?: string | null;
  onError?: (msg: string) => void;
};

export const useGroups = ({ token, onError }: UseGroupsOptions): UseGroupsReturn<Group> => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Función para limpiar mensajes
  const clearMessages = useCallback(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  // Cargar grupos
  const fetchGroups = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) {
      return { error: false };
    }

    setLoading(true);
    clearMessages(); // Limpiar mensajes previos
    
    try {
      const res = await getAll(token);
      if (res.error) {
        setGroups([]);
        setErrorMessage(res.message || "Error al cargar grupos");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.error("Error en fetchGroups:", {
            message: res.message,
            details: res.details,
            token: token ? "presente" : "ausente"
          });
        } else {
          console.error("Error en fetchGroups:", res.message);
        }
        
        onErrorRef.current?.(res.message || "Error al cargar grupos");
        return { error: true, message: res.message };
      } else {
        setGroups(res.groups || []);
        setSuccessMessage(res.message || "Grupos cargados exitosamente");
        return { error: false };
      }
    } catch (error) {
      setGroups([]);
      const errorMsg = "Error al cargar grupos";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.error("Excepción en fetchGroups:", {
        error,
        token: token ? "presente" : "ausente"
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, clearMessages]);

  // Auto-fetch cuando cambie el token
  useEffect(() => {
    const loadGroups = async () => {
      await fetchGroups();
    };
    
    if (token) {
      loadGroups();
    }
  }, [fetchGroups, token]);

  // Función para refrescar grupos después de operaciones CRUD
  const refreshGroups = useCallback(() => {
    fetchGroups();
  }, [fetchGroups]);

  // Métodos CRUD
  const createGroup = useCallback(async (group: Group): Promise<{ error: boolean; message?: string }> => {
    if (!token) {
      setErrorMessage("Token requerido para crear grupo");
      return { error: true, message: "Token requerido para crear grupo" };
    }

    clearMessages(); // Limpiar mensajes previos

    try {
      const res = await create(group as unknown as Record<string, unknown>, token);
      if (res.error) {
        setErrorMessage(res.message || "Error al crear grupo");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.error("Error en createGroup:", {
            message: res.message,
            details: res.details,
            group
          });
        } else {
          console.error("Error en createGroup:", res.message);
        }
        
        onErrorRef.current?.(res.message || "Error al crear grupo");
        return { error: true, message: res.message };
      } else {
        setSuccessMessage(res.message || "Grupo creado exitosamente");
        // Refrescar la lista después de crear
        await fetchGroups();
        return { error: false, message: res.message };
      }
    } catch (error) {
      const errorMsg = "Error al crear grupo";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.error("Excepción en createGroup:", {
        error,
        group
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchGroups, clearMessages]);

  const updateGroup = useCallback(async (id: number, group: Group): Promise<{ error: boolean; message?: string }> => {
    if (!token) {
      setErrorMessage("Token requerido para actualizar grupo");
      return { error: true, message: "Token requerido para actualizar grupo" };
    }

    clearMessages(); // Limpiar mensajes previos

    try {
      const res = await update(id, group as unknown as Record<string, unknown>, token);
      if (res.error) {
        setErrorMessage(res.message || "Error al actualizar grupo");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.error("Error en updateGroup:", {
            message: res.message,
            details: res.details,
            id,
            group
          });
        } else {
          console.error("Error en updateGroup:", res.message);
        }
        
        onErrorRef.current?.(res.message || "Error al actualizar grupo");
        return { error: true, message: res.message };
      } else {
        setSuccessMessage(res.message || "Grupo actualizado exitosamente");
        // Refrescar la lista después de actualizar
        await fetchGroups();
        return { error: false, message: res.message };
      }
    } catch (error) {
      const errorMsg = "Error al actualizar grupo";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.error("Excepción en updateGroup:", {
        error,
        id,
        group
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchGroups, clearMessages]);

  return {
    // Estado
    groups,
    loading,
    successMessage,
    errorMessage,
    
    // Setters
    setGroups,
    
    // Funciones CRUD
    fetchGroups,
    refreshGroups,
    createGroup,
    updateGroup,
    clearMessages,
  };
};
