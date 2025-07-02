"use client";

import React from "react";
import { useHomePage } from "../hooks/useHomePage";
import {
  HeroSection,
  AboutSection,
  ContactSection,
  ServicesDisplaySection
} from "./components/home";

export default function Page() {
  const {
    services,
    loading,
    errorMessage,
    handleRetry
  } = useHomePage();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5">
      {/* Sección Hero */}
      <HeroSection />
      
      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Sección Sobre Nosotros y Contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          <AboutSection />
          <ContactSection />
        </div>
        
        {/* Sección de Servicios */}
        <div className="flex justify-center">
          <ServicesDisplaySection
            services={services}
            loading={loading}
            errorMessage={errorMessage}
            onRetry={handleRetry}
          />
        </div>
      </main>
    </div>
  );
}
