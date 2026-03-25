"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicioSaludDetallePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-cielo/10 via-blanco to-verde-bosque/10">
      {/* Breadcrumb */}
      <div className="bg-white/90 backdrop-blur-xs shadow-sm border-b border-azul-cielo/20">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-azul-marino hover:text-azul-cielo transition-colors">
              🏠 Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-azul-marino hover:text-azul-cielo transition-colors">
              🛠️ Servicios
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services/salud" className="text-azul-marino hover:text-azul-cielo transition-colors">
              💊 Salud
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-azul-oscuro font-medium">Servicio de Prueba</span>
          </nav>
        </div>
      </div>

      {/* Detalle del Servicio */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-azul-cielo/20 border-2 border-azul-cielo/30 shadow-md">
                  <span className="text-4xl">💊</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-azul-oscuro leading-tight mb-1">
                    Consulta Médica General
                  </h1>
                  <span className="inline-block bg-azul-cielo/10 text-azul-cielo px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-azul-cielo/20">Salud</span>
                </div>
              </div>
              <p className="text-lg text-azul-marino leading-relaxed max-w-2xl">
                Atención médica integral para diagnóstico y tratamiento de patologías comunes. Nuestro equipo médico está disponible para brindarte la mejor atención durante tu formación en el SENA.
              </p>
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">🏥</span>Consulta presencial</span>
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">📄</span>Expedición de certificados</span>
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">🩺</span>Valoraciones médicas</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/requests"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-azul-cielo to-verde-bosque text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  📋 Solicitar Cita Médica
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-azul-cielo text-azul-cielo font-semibold rounded-xl hover:bg-azul-cielo/10 transition-all duration-300">
                  📞 Contactar Enfermería
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/logo-bienestar.jpeg"
                  alt="Detalle Servicio de Salud SENA"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-verde-claro/20 to-verde-bosque/20 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

