import { useState, useCallback, useEffect, useRef } from "react";
import { Request } from "../types/request";
import { UseRequestsOptions, UseRequestsReturn } from "../types/hooks";
import { getByUserId as getRequestsByUserId } from "../services/services/request";

export const useRequests = ({ token, userId, onError }: UseRequestsOptions): UseRequestsReturn<Request> => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar requests del usuario
  const fetchRequests = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token || !userId) return { error: false }; // No hacer fetch si no hay token o userId
    setLoading(true);
    
    try {
      const res = await getRequestsByUserId(userId, token);
      if (res.error || !res.requests) {
        setRequests([]);
        onErrorRef.current?.(res.message || "Error al cargar solicitudes");
        return { error: true, message: res.message };
      } else {
        setRequests(res.requests);
        return { error: false, message: res.message };
      }
    } catch {
      setRequests([]);
      const errorMsg = "Error al cargar solicitudes";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadRequests = async () => {
      await fetchRequests();
    };
    
    if (token && userId) {
      loadRequests();
    }
  }, [fetchRequests, token, userId]);

  // Función para refrescar requests después de operaciones CRUD
  const refreshRequests = useCallback(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    // Estado
    requests,
    loading,
    
    // Setters
    setRequests,
    
    // Funciones
    fetchRequests,
    refreshRequests,
  };
};
