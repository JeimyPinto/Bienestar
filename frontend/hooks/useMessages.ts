import { useState, useCallback } from "react";

export interface UseMessagesReturn {
  // Estado
  successMessage: string;
  errorMessage: string;
  
  // Funciones
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  clearMessages: () => void;
  clearSuccess: () => void;
  clearError: () => void;
  
  // Para compatibilidad con código existente
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export const useMessages = (): UseMessagesReturn => {
  const [successMessage, setSuccessMessageState] = useState<string>("");
  const [errorMessage, setErrorMessageState] = useState<string>("");

  const showSuccess = useCallback((message: string) => {
    setSuccessMessageState(message);
    setErrorMessageState(""); // Limpiar error al mostrar éxito
  }, []);

  const showError = useCallback((message: string) => {
    setErrorMessageState(message);
    setSuccessMessageState(""); // Limpiar éxito al mostrar error
  }, []);

  const clearMessages = useCallback(() => {
    setSuccessMessageState("");
    setErrorMessageState("");
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessMessageState("");
  }, []);

  const clearError = useCallback(() => {
    setErrorMessageState("");
  }, []);

  // Para compatibilidad con código existente
  const setSuccessMessage = useCallback((message: string) => {
    setSuccessMessageState(message);
  }, []);

  const setErrorMessage = useCallback((message: string) => {
    setErrorMessageState(message);
  }, []);

  return {
    // Estado
    successMessage,
    errorMessage,
    
    // Funciones
    showSuccess,
    showError,
    clearMessages,
    clearSuccess,
    clearError,
    
    // Para compatibilidad con código existente
    setSuccessMessage,
    setErrorMessage,
  };
};
