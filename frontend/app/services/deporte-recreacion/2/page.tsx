"use client";

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

export default function DeporteRecreacionDetallePage() {
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
            <Link href="/services/deporte-recreacion" className="text-azul-marino hover:text-azul-cielo transition-colors">
              ⚽ Deporte y Recreación
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-azul-oscuro font-medium">Torneo Intercentros</span>
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
                  <span className="text-4xl">⚽</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-azul-oscuro leading-tight my-2">
                    Torneo Intercentros de Deportes
                  </h1>
                    <span className="inline-block bg-verde-bosque/10 text-verde-bosque px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-verde-bosque/20">Deporte y Recreación</span>
                </div>
              </div>
              <p className="text-lg text-azul-marino leading-relaxed max-w-2xl">
                Participa en el torneo intercentros y representa a tu centro en diferentes disciplinas deportivas.<br />
                <span className="text-verde-bosque font-semibold">Fomenta el trabajo en equipo, la sana competencia y el bienestar físico.</span>
              </p>
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">⚽</span>Fútbol 11</span>
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">🥅</span>Fútbol 5</span>
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">🏀</span>Baloncesto</span>
                <span className="inline-flex items-center gap-2 bg-azul-cielo/10 text-azul-cielo px-4 py-2 rounded-lg font-medium text-base shadow-sm border border-azul-cielo/20"><span className="text-xl">🏐</span>Voleibol</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-verde-bosque"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity=".12"/><path d="M8.5 12.5l2 2 5-5" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <div>
                    <span className="font-semibold text-verde-bosque">¿Quieres inscribirte?</span> Puedes solicitar este servicio desde tu <b>Dashboard</b> en la sección de solicitudes.<br />
                    <span className="font-semibold text-verde-bosque">Importante:</span> En la descripción de la solicitud debes indicar el <b>deporte</b> al que deseas inscribirte. Si no lo especificas, tu inscripción no será tenida en cuenta.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-azul-cielo"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity=".12"/><path d="M12 8v4m0 4h.01" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <div>
                    <span className="font-semibold text-azul-cielo">Nota:</span> Primero se realizarán veedurías para observar el talento deportivo de los inscritos y determinar si pueden clasificar a la competencia oficial.
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-azul-cielo to-verde-bosque text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md"
                >
                  <span className="text-xl">📝</span> Solicitar desde el Dashboard
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/logo-bienestar.jpeg"
                  alt="Torneo Intercentros SENA"
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
