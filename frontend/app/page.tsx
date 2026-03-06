"use client";

import HeroSection from "../components/home/heroSection";
import ContactSection from "../components/home/contactSection";

import { Target, Users, Star, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5">
      {/* Sección Hero */}
      <HeroSection />

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8 space-y-16">

        {/* Sección de Contacto - Centrada y Destacada */}
        <ContactSection />

        {/* Sección adicional de información o CTA */}
        <section className="py-12 bg-gradient-to-r from-azul-oscuro/5 to-success/5 rounded-3xl">
          <div className="text-center max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-azul-oscuro mb-4 flex items-center justify-center gap-3">
                <Target className="text-primary" size={40} />
                Tu Formación es Nuestra Prioridad
              </h3>
              <p className="text-lg text-azul-oscuro/80 leading-relaxed mb-8">
                En el Centro de Procesos Industriales y Construcción trabajamos
                cada día para brindarte la mejor experiencia de formación.
                Nuestro equipo de Bienestar está comprometido con tu desarrollo
                integral como aprendiz SENA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-azul-cielo/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Users size={40} />
                </div>
                <h4 className="font-bold text-azul-oscuro mb-2">
                  Acompañamiento
                </h4>
                <p className="text-sm text-azul-oscuro/70">
                  Te acompañamos en cada etapa de tu proceso formativo
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-success/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-success mb-4 group-hover:scale-110 transition-transform">
                  <Star size={40} />
                </div>
                <h4 className="font-bold text-azul-oscuro mb-2">Calidad</h4>
                <p className="text-sm text-azul-oscuro/70">
                  Servicios de alta calidad para tu desarrollo integral
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-azul-cielo/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                <div className="text-info mb-4 group-hover:scale-110 transition-transform">
                  <Zap size={40} />
                </div>
                <h4 className="font-bold text-azul-oscuro mb-2">Rapidez</h4>
                <p className="text-sm text-azul-oscuro/70">
                  Respuesta ágil y eficiente a todas tus solicitudes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
