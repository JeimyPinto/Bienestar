"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Service } from "../../types/service";
import { UseServicesOptions, UseServicesReturn } from "../../types";
import { 
  getByUserId as getServicesByUserId,
  getAllActive as getAllActiveServices,
  getAll as getAllServices
} from "../services/services/service";

/**
 * Hook para manejar la carga y gestión de servicios
 * 
 * @param options - Opciones de configuración del hook
 * @param options.token - Token de autenticación
 * @param options.userId - ID del usuario (requerido para mode 'userServices')
 * @param options.onError - Callback para manejar errores
 * @param options.mode - Modo de carga:
 *   - 'userServices': Servicios creados por un usuario específico (requiere token y userId)
 *   - 'allActive': Todos los servicios activos (público)
 *   - 'all': Todos los servicios (requiere token de admin)
 * 
 * @returns Objeto con estado y funciones para manejar servicios
 * 
 * @example
 * // Obtener servicios del usuario actual
 * const { services, loading, refreshServices } = useServices({
 *   token,
 *   userId: user?.id,
 *   mode: 'userServices',
 *   onError: (message) => setErrorMessage(message)
 * });
 * 
 * @example
 * // Obtener todos los servicios activos (público)
 * const { services, loading } = useServices({
 *   mode: 'allActive'
 * });
 */
export const useServices = ({ 
  token, 
  userId, 
  onError, 
  mode = 'userServices' 
}: UseServicesOptions): UseServicesReturn<Service> => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar servicios según el modo
  const fetchServices = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    setLoading(true);
    
    try {
      let res;
      
      switch (mode) {
        case 'userServices':
          if (!token || !userId) return { error: false }; // No hacer fetch si no hay token o userId
          res = await getServicesByUserId(userId, token);
          break;
        case 'allActive':
          res = await getAllActiveServices();
          break;
        case 'all':
          if (!token) return { error: false }; // No hacer fetch si no hay token
          res = await getAllServices(token);
          break;
        default:
          return { error: true, message: "Modo no válido" };
      }

      if (res.error || !res.services) {
        setServices([]);
        onErrorRef.current?.(res.message || "Error al cargar servicios");
        return { error: true, message: res.message };
      } else {
        setServices(res.services);
        return { error: false, message: res.message };
      }
    } catch {
      setServices([]);
      const errorMsg = "Error al cargar servicios";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, userId, mode]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };
    
    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad = 
      (mode === 'userServices' && token && userId) ||
      (mode === 'allActive') ||
      (mode === 'all' && token);
    
    if (shouldLoad) {
      loadServices();
    }
  }, [fetchServices, token, userId, mode]);

  // Función para refrescar servicios después de operaciones CRUD
  const refreshServices = useCallback(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    // Estado
    services,
    loading,
    
    // Setters
    setServices,
    
    // Funciones
    fetchServices,
    refreshServices,
  };
};
