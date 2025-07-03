import { useState, useCallback, useEffect, useRef } from "react";
import { AuditLog } from "../interface/auditLog";
import { getAll, getAuditLogById } from "../services/auditLog";

interface UseAuditOptions {
  token: string | null;
  mode?: 'all' | 'byId';
  auditLogId?: number; // Requerido cuando mode es 'byId'
  onError?: (message?: string) => void;
}

interface UseAuditReturn<T> {
  auditLogs: T[];
  loading: boolean;
  setAuditLogs: React.Dispatch<React.SetStateAction<T[]>>;
  fetchAuditLogs: () => Promise<{ error: boolean; message?: string }>;
  refreshAuditLogs: () => void;
}

export const useAudit = ({ 
  token, 
  mode = 'all', 
  auditLogId,
  onError 
}: UseAuditOptions): UseAuditReturn<AuditLog> => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar auditorías según el modo
  const fetchAuditLogs = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: false }; // No hacer fetch si no hay token
    setLoading(true);
    
    try {
      let res;
      
      switch (mode) {
        case 'all':
          res = await getAll(token);
          break;
        case 'byId':
          if (!auditLogId) return { error: true, message: "auditLogId requerido para modo 'byId'" };
          res = await getAuditLogById(auditLogId, token);
          // Para byId, convertir la auditoría única en un array
          if (!res.error && res.log) {
            res.logs = [res.log];
          }
          break;
        default:
          return { error: true, message: "Modo no válido" };
      }

      if (res.error) {
        setAuditLogs(res.logs || []);
        onErrorRef.current?.(res.message);
        return { error: true, message: res.message };
      } else {
        setAuditLogs(res.logs || []);
        return { error: false, message: res.message };
      }
    } catch {
      setAuditLogs([]);
      const errorMsg = "Error al cargar auditorías";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token, mode, auditLogId]);

  // Auto-fetch cuando cambien las dependencias críticas
  useEffect(() => {
    const loadAuditLogs = async () => {
      await fetchAuditLogs();
    };
    
    // Solo auto-cargar si tenemos los requisitos según el modo
    const shouldLoad = 
      (mode === 'all' && token) ||
      (mode === 'byId' && token && auditLogId);
    
    if (shouldLoad) {
      loadAuditLogs();
    }
  }, [fetchAuditLogs, token, mode, auditLogId]);

  // Función para refrescar auditorías después de operaciones
  const refreshAuditLogs = useCallback(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  return {
    // Estado
    auditLogs,
    loading,
    
    // Setters
    setAuditLogs,
    
    // Funciones
    fetchAuditLogs,
    refreshAuditLogs,
  };
};
