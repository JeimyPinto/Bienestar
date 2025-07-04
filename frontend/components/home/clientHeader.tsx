"use client";

import React, { useEffect, useState } from "react";
import Header from "./header";

/**
 * Client-side wrapper para el Header que maneja la hidratación
 * y evita problemas de sincronización entre server y client
 */
export default function ClientHeader() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Renderizar un placeholder simple durante la hidratación inicial
  if (!isMounted) {
    return (
      <header className="bg-gradient-corporate shadow-xl border-b border-azul-cielo/20 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo placeholder */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
              <div className="hidden sm:block">
                <div className="w-64 h-6 bg-white/10 rounded animate-pulse mb-2" />
                <div className="w-48 h-4 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
            
            {/* Navigation placeholder */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-20 h-8 bg-white/10 rounded animate-pulse" />
              <div className="w-24 h-8 bg-white/10 rounded animate-pulse" />
            </div>
            
            {/* Mobile menu button placeholder */}
            <div className="md:hidden w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return <Header />;
}
