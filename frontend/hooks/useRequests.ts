import { useState, useCallback, useEffect, useRef } from "react";
import { Request } from "../interface/request";
import { 
  getAll, 
  getAllActive, 
  getById, 
  create, 
  update, 
  getByUserId as getRequestsByUserId 
} from "../services/request";

interface UseRequestsOptions {
  token: string | null;
  userId?: number; // Requerido cuando mode es 'byUserId'
  requestId?: number; // Requerido cuando mode es 'byId'
  mode?: 'all' | 'allActive' | 'byUserId' | 'byId';
  onError?: (message?: string) => void;
}

interface UseRequestsReturn<T> {
  requests: T[];
  loading: boolean;
  setRequests: React.Dispatch<React.SetStateAction<T[]>>;
  fetchRequests: () => Promise<{ error: boolean; message?: string }>;
  refreshRequests: () => void;
  // Métodos CRUD
  createRequest: (request: Request) => Promise<{ error: boolean; message?: string }>;
  updateRequest: (id: number, request: Request) => Promise<{ error: boolean; message?: string }>;
}

export const useRequests = ({ 
  token, 
  userId, 
  requestId, 
  mode = 'byUserId', 
  onError 
}: UseRequestsOptions): UseRequestsReturn<Request> => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar requests según el modo
  const fetchRequests = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
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
        case 'byUserId':
          if (!userId) return { error: true, message: "userId requerido para modo 'byUserId'" };
          res = await getRequestsByUserId(userId, token);
          break;
        case 'byId':
          if (!requestId) return { error: true, message: "requestId requerido para modo 'byId'" };
          res = await getById(requestId, token);
          // Para byId, convertir la request única en un array
          if (!res.error && res.request) {
            res.requests = [res.request];
          }
          break;
        default:
          return { error: true, message: "Modo no válido" };
      }
      
      // Si el backend retorna error explícito
      if (res.error) {
        setRequests([]);
        const errorMsg = res.message || "Error al cargar las solicitudes";
        onErrorRef.current?.(errorMsg);
        return { error: true, message: errorMsg };
      }
      
      // Si no hay requests o está vacío
      if (!res.requests || res.requests.length === 0) {
        setRequests([]);
        // No mostrar como error si es simplemente que no hay solicitudes
        if (res.isEmpty) {
          return { error: false, message: res.message || "No hay solicitudes aún" };
        }
        return { error: false, message: "No hay solicitudes disponibles" };
      }
      
      // Todo está bien, hay solicitudes
      setRequests(res.requests);
      return { error: false, message: res.message };
      
    } catch(error) {
      console.error("Error en fetchRequests:", error);
      let errorMsg = "Error interno del servidor";
      
      // Si es un error de parsing JSON, probablemente el servidor retornó HTML
      if (error instanceof Error && error.message.includes("Unexpected token")) {
        errorMsg = "Error de conexión con el servidor. Por favor, intenta de nuevo.";
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      
      setRequests([]);
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, userId, requestId, mode]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadRequests = async () => {
      await fetchRequests();
    };
    
    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad = 
      (mode === 'all' && token) ||
      (mode === 'allActive' && token) ||
      (mode === 'byUserId' && token && userId) ||
      (mode === 'byId' && token && requestId);
    
    if (shouldLoad) {
      loadRequests();
    }
  }, [fetchRequests, token, userId, requestId, mode]);

  // Función para refrescar requests después de operaciones CRUD
  const refreshRequests = useCallback(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Métodos CRUD
  const createRequest = useCallback(async (request: Request): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para crear solicitud" };
    
    try {
      const res = await create(request, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de crear
        await fetchRequests();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al crear solicitud";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchRequests]);

  const updateRequest = useCallback(async (id: number, request: Request): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: true, message: "Token requerido para actualizar solicitud" };
    
    try {
      const res = await update(id, request, token);
      if (res.error) {
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        // Refrescar la lista después de actualizar
        await fetchRequests();
        return { error: false, message: res.message };
      }
    } catch {
      const errorMsg = "Error al actualizar solicitud";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchRequests]);

  return {
    // Estado
    requests,
    loading,
    
    // Setters
    setRequests,
    
    // Funciones
    fetchRequests,
    refreshRequests,
    
    // Métodos CRUD
    createRequest,
    updateRequest,
  };
};
