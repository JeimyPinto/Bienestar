"use client";

import React from "react";
import { useHomePage } from "../hooks/useHomePage";
import HeroSection from "../components/home/heroSection";
import ContactSection from "../components/home/contactSection";
import  ServicesDisplaySection  from "../components/home/servicesDisplaySection";

export default function Page() {
  const { services, loading, errorMessage, handleRetry } = useHomePage();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5">
      {/* Sección Hero */}
      <HeroSection />

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Sección de Servicios - Destacada */}
        <ServicesDisplaySection
          services={services}
          loading={loading}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />

        {/* Sección de Contacto - Centrada y Destacada */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-azul-oscuro mb-4">
                <span className="bg-gradient-to-r from-success to-verde-bosque bg-clip-text text-transparent">
                  ¿Necesitas Ayuda?
                </span>
              </h2>
              <p className="text-lg text-azul-oscuro/70 max-w-2xl mx-auto leading-relaxed">
                Estamos aquí para apoyarte en tu proceso de formación. Contáctanos directamente
              </p>
              <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-success to-verde-bosque rounded-full"></div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <ContactSection />
              </div>
            </div>
          </div>
        </section>

        {/* Sección adicional de información o CTA */}
        <section className="py-12 bg-gradient-to-r from-azul-oscuro/5 to-success/5 rounded-3xl">
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-azul-oscuro mb-4">
                <span className="text-4xl mr-4">🎯</span>
                Tu Formación es Nuestra Prioridad
              </h3>
              <p className="text-lg text-azul-oscuro/80 leading-relaxed mb-8">
                En el Centro de Procesos Industriales y Construcción trabajamos cada día para brindarte 
                la mejor experiencia de formación. Nuestro equipo de Bienestar está comprometido con tu 
                desarrollo integral como aprendiz SENA.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-azul-cielo/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="font-bold text-azul-oscuro mb-2">Acompañamiento</h4>
                <p className="text-sm text-azul-oscuro/70">Te acompañamos en cada etapa de tu proceso formativo</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-success/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-4xl mb-4">🌟</div>
                <h4 className="font-bold text-azul-oscuro mb-2">Calidad</h4>
                <p className="text-sm text-azul-oscuro/70">Servicios de alta calidad para tu desarrollo integral</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-azul-cielo/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-bold text-azul-oscuro mb-2">Rapidez</h4>
                <p className="text-sm text-azul-oscuro/70">Respuesta ágil y eficiente a todas tus solicitudes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
