import { useState, useCallback, useEffect, useRef } from "react";
import { Request } from "../interface/request";
import { UseRequestsOptions, UseRequestsReturn } from "../interface";
import { getByUserId as getRequestsByUserId } from "../services/request";

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
          return { error: false, message: res.message || "No tienes solicitudes aún" };
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
