import { useState, useCallback, useEffect, useRef } from "react";
import { Remission } from "../interface/remission";
import { 
  getAll, 
  getById, 
  create, 
  update
} from "../services/remission";

interface UseRemissionsOptions {
  token: string | null;
  mode?: 'all' | 'byId';
  remissionId?: string; // Requerido cuando mode es 'byId'
  onError?: (message?: string) => void;
}

interface UseRemissionsReturn<T> {
  remissions: T[];
  loading: boolean;
  setRemissions: React.Dispatch<React.SetStateAction<T[]>>;
  fetchRemissions: () => Promise<{ error: boolean; message?: string }>;
  refreshRemissions: () => void;
  // Métodos CRUD
  createRemission: (remission: Remission) => Promise<{ error: boolean; message?: string }>;
  updateRemission: (id: string, remission: Remission) => Promise<{ error: boolean; message?: string }>;
}

export const useRemissions = ({ 
  token, 
  mode = 'all', 
  remissionId,
  onError 
}: UseRemissionsOptions): UseRemissionsReturn<Remission> => {
  const [remissions, setRemissions] = useState<Remission[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar remisiones según el modo
  const fetchRemissions = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: false }; // No hacer fetch si no hay token
    setLoading(true);
    
    try {
      let res;
      
      switch (mode) {
        case 'all':
          res = await getAll(token);
          break;
        case 'byId':
          if (!remissionId) return { error: true, message: "remissionId requerido para modo 'byId'" };
          res = await getById(remissionId, token);
          // Para byId, convertir la remisión única en un array
          if (!res.error && res.remission) {
            res.remissions = [res.remission];
          }
          break;
        default:
          return { error: true, message: "Modo no válido" };
      }

      if (res.error) {
        setRemissions(res.remissions || []);
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setRemissions(res.remissions || []);
        return { error: false, message: res.message };
      }
    } catch {
      setRemissions([]);
      const errorMsg = "Error al cargar remisiones";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, mode, remissionId]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadRemissions = async () => {
      await fetchRemissions();
    };
    
    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad = 
      (mode === 'all' && token) ||
      (mode === 'byId' && token && remissionId);
    
    if (shouldLoad) {
      loadRemissions();
    }
  }, [fetchRemissions, token, mode, remissionId]);

  // Función para refrescar remisiones después de operaciones
  const refreshRemissions = useCallback(() => {
    fetchRemissions();
  }, [fetchRemissions]);

  // Métodos CRUD
  const createRemission = useCallback(async (remission: Remission): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para crear remisión" };
    
    try {
      const res = await create(remission, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de crear
        await fetchRemissions();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al crear remisión";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchRemissions]);

  const updateRemission = useCallback(async (id: string, remission: Remission): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para actualizar remisión" };
    
    try {
      const res = await update(id, remission, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de actualizar
        await fetchRemissions();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al actualizar remisión";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchRemissions]);

  return {
    // Estado
    remissions,
    loading,
    
    // Setters
    setRemissions,
    
    // Funciones CRUD
    fetchRemissions,
    refreshRemissions,
    createRemission,
    updateRemission
  };
};
