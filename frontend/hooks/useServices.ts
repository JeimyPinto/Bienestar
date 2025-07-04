"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Service } from "../interface/service";
import {
  getByUserId,
  getAllActive,
  getAll,
  getById,
  create,
  update
} from "../services/service";


interface UseServicesOptions {
  token?: string | null;
  userId?: number;
  mode?: 'all' | 'allActive' | 'byId' | 'userServices';
  serviceId?: number; // Para modo 'byId'
  onError?: (message?: string) => void;
}

interface UseServicesReturn<T> {
  // Estado
  services: T[];
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  setServices: React.Dispatch<React.SetStateAction<T[]>>;
  fetchServices: () => Promise<{ error: boolean; message?: string }>;
  refreshServices: () => void;
  createService: (service: Service, file?: File) => Promise<{ error: boolean; message?: string }>;
  updateService: (id: string, service: Service, file?: File) => Promise<{ error: boolean; message?: string }>;
  clearMessages: () => void;
}


export const useServices = ({
  token,
  userId,
  serviceId,
  onError,
  mode = 'allActive'
}: UseServicesOptions): UseServicesReturn<Service> => {
  const [services, setServices] = useState<Service[]>([]);
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

  // Cargar servicios según el modo
  const fetchServices = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token && (mode === 'userServices' || mode === 'all' || mode === 'byId')) {
      return { error: false }; 
    }

    setLoading(true);
    clearMessages(); // Limpiar mensajes previos

    try {
      let res;

      switch (mode) {
        case 'userServices':
          if (!userId) {
            setErrorMessage("userId requerido para modo 'userServices'");
            return { error: true, message: "userId requerido para modo 'userServices'" };
          }
          res = await getByUserId(userId, token || undefined);
          break;
        case 'all':
          res = await getAll(token || undefined);
          break;
        case 'allActive':
          res = await getAllActive();
          break;
        case 'byId':
          if (!serviceId) {
            setErrorMessage("serviceId requerido para modo 'byId'");
            return { error: true, message: "serviceId requerido para modo 'byId'" };
          }
          res = await getById(serviceId, token || undefined);
          // Para byId, convertir el servicio único en un array
          if (!res.error && res.service) {
            res.services = [res.service];
          }
          break;
        default:
          setErrorMessage("Modo no válido");
          return { error: true, message: "Modo no válido" };
      }

      if (res.error) {
        setServices(res.services || []);
        setErrorMessage(res.message || "Error al cargar servicios");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.log(`Error en fetchServices (modo: ${mode}):`, {
            message: res.message,
            details: res.details,
            mode,
            token: token ? "presente" : "ausente",
            userId,
            serviceId
          });
        } else {
          console.log(`Error en fetchServices (modo: ${mode}):`, res.message);
        }
        
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setServices(res.services || []);
        setSuccessMessage(res.message || "Servicios cargados exitosamente");
        return { error: false };
      }
    } catch (error) {
      setServices([]);
      const errorMsg = "Error al cargar servicios";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.log(`Excepción en fetchServices (modo: ${mode}):`, {
        error,
        mode,
        token: token ? "presente" : "ausente",
        userId,
        serviceId
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, userId, serviceId, mode, clearMessages]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadServices = async () => {
      await fetchServices();
    };

    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad =
      (mode === 'userServices' && token && userId) ||
      (mode === 'allActive') ||
      (mode === 'all' && token) ||
      (mode === 'byId' && token && serviceId);

    if (shouldLoad) {
      loadServices();
    }
  }, [fetchServices, token, userId, serviceId, mode]);

  // Función para refrescar servicios después de operaciones CRUD
  const refreshServices = useCallback(() => {
    fetchServices();
  }, [fetchServices]);

  // Métodos CRUD
  const createService = useCallback(async (service: Service, file?: File): Promise<{ error: boolean; message?: string }> => {
    if (!token) {
      setErrorMessage("Token requerido para crear servicio");
      return { error: true, message: "Token requerido para crear servicio" };
    }

    clearMessages(); // Limpiar mensajes previos

    try {
      const res = await create(service, file, token || undefined);
      if (res.error) {
        setErrorMessage(res.message || "Error al crear servicio");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.log("Error en createService:", {
            message: res.message,
            details: res.details,
            service,
            hasFile: !!file
          });
        } else {
          console.log("Error en createService:", res.message);
        }
        
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setSuccessMessage(res.message || "Servicio creado exitosamente");
        // Refrescar la lista después de crear
        await fetchServices();
        return { error: false, message: res.message };
      }
    } catch (error) {
      const errorMsg = "Error al crear servicio";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.log("Excepción en createService:", {
        error,
        service,
        hasFile: !!file
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchServices, clearMessages]);

  const updateService = useCallback(async (id: string, service: Service, file?: File): Promise<{ error: boolean; message?: string }> => {
    if (!token) {
      setErrorMessage("Token requerido para actualizar servicio");
      return { error: true, message: "Token requerido para actualizar servicio" };
    }

    clearMessages(); // Limpiar mensajes previos

    try {
      const res = await update(id, service, file, token || undefined);
      if (res.error) {
        setErrorMessage(res.message || "Error al actualizar servicio");
        
        // Log de depuración con detalles si están disponibles
        if (res.details) {
          console.log("Error en updateService:", {
            message: res.message,
            details: res.details,
            id,
            service,
            hasFile: !!file
          });
        } else {
          console.log("Error en updateService:", res.message);
        }
        
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setSuccessMessage(res.message || "Servicio actualizado exitosamente");
        // Refrescar la lista después de actualizar
        await fetchServices();
        return { error: false, message: res.message };
      }
    } catch (error) {
      const errorMsg = "Error al actualizar servicio";
      setErrorMessage(errorMsg);
      
      // Log detallado del error de excepción
      console.log("Excepción en updateService:", {
        error,
        id,
        service,
        hasFile: !!file
      });
      
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    }
  }, [token, fetchServices, clearMessages]);

  return {
    // Estado
    services,
    loading,
    successMessage,
    errorMessage,

    // Setters
    setServices,

    // Funciones CRUD
    fetchServices,
    refreshServices,
    createService,
    updateService,
    clearMessages,
  };
};
