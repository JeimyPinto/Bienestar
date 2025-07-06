"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DeporteRecreacionDetallePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-claro/10 via-white to-verde-bosque/5">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-verde-claro/20">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-verde-bosque hover:text-verde-claro transition-colors">
              🏠 Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-verde-bosque hover:text-verde-claro transition-colors">
              🛠️ Servicios
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services/deporte-recreacion" className="text-verde-bosque hover:text-verde-claro transition-colors">
              ⚽ Deporte y Recreación
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Torneo Intercentros</span>
          </nav>
        </div>
      </div>

      {/* Detalle del Servicio */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-verde-claro/10 rounded-full border border-verde-claro/20">
                <span className="text-verde-bosque font-medium">⚽ Torneo Intercentros</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-azul-oscuro leading-tight">
                Torneo Intercentros de Deportes
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Participa en el torneo intercentros y representa a tu centro en diferentes disciplinas deportivas. Fomenta el trabajo en equipo, la sana competencia y el bienestar físico.
              </p>
              <ul className="space-y-2 text-base text-gray-600">
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Fútbol</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Baloncesto</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Voleibol</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Atletismo</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Y más disciplinas</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/requests"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-verde-claro to-verde-bosque text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  📝 Inscribirse al Torneo
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-verde-claro text-verde-bosque font-semibold rounded-xl hover:bg-verde-claro/10 transition-all duration-300">
                  📞 Contactar Coordinación
                </button>
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
