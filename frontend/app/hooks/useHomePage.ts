"use client";

import { useState } from 'react';
import { useServices } from './useServices';

export const useHomePage = () => {
  const { 
    services, 
    loading, 
    refreshServices 
  } = useServices({ 
    mode: 'allActive'
  });

  // Estado para manejar errores localmente
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRetry = () => {
    setErrorMessage(null);
    refreshServices();
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
  };

  return {
    services,
    loading,
    errorMessage,
    handleRetry,
    handleError,
    refreshServices
  };
};
