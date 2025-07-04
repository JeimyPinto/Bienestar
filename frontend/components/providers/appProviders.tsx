"use client";

import React from "react";
import { AuthProvider } from "../../contexts/authContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Componente que agrupa todos los providers de la aplicación
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
