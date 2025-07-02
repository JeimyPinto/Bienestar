import { useState, useCallback, useEffect, useRef } from "react";
import { Group } from "../../types/group";
import { UseGroupsOptions, UseGroupsReturn } from "../../types";
import { getAll } from "../services/services/group";

export const useGroups = ({ token, onError }: UseGroupsOptions): UseGroupsReturn<Group> => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);

  // Usar ref para mantener una referencia estable a onError
  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Cargar grupos
  const fetchGroups = useCallback(async (): Promise<{ error: boolean; message?: string }> => {
    if (!token) return { error: false };
    setLoading(true);
    
    try {
      const res = await getAll(token);
      if (res.error) {
        setGroups([]);
        onErrorRef.current?.(`❌ ${res.message || "Error al cargar grupos"}`);
        return { error: true, message: res.message };
      } else {
        setGroups(res.groups || []);
        return { error: false };
      }
    } catch {
      setGroups([]);
      const errorMsg = "Error al cargar grupos";
      onErrorRef.current?.(errorMsg);
      return { error: true, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Auto-fetch cuando cambie el token
  useEffect(() => {
    const loadGroups = async () => {
      await fetchGroups();
    };
    
    if (token) {
      loadGroups();
    }
  }, [fetchGroups, token]);

  // Función para refrescar grupos
  const refreshGroups = useCallback(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    // Estado
    groups,
    loading,
    
    // Setters
    setGroups,
    
    // Funciones
    fetchGroups,
    refreshGroups,
  };
};
