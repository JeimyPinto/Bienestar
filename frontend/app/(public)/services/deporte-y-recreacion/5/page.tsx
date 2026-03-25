"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TorneosIntercentrosPage() {
  const deportesEquipo = [
    { nombre: "Baloncesto", min: 5, icono: "🏀" },
    { nombre: "Fútbol", min: 8, icono: "⚽" },
    { nombre: "Microfútbol", min: 8, icono: "🥅" },
    { nombre: "Voleibol", min: 6, icono: "🏐" },
  ];

  const deportesIndividuales = [
    { nombre: "Ajedrez", icono: "♟️" },
    { nombre: "Ping Pong", icono: "🏓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Breadcrumb */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-emerald-800 hover:text-emerald-600 transition-colors">
              🏠 Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-emerald-800 hover:text-emerald-600 transition-colors">
              🛠️ Servicios
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services/deporte-y-recreacion" className="text-emerald-800 hover:text-emerald-600 transition-colors">
              ⚽ Deporte y Recreación
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-emerald-950 font-bold">Torneo Intercentros</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                    Inscripciones Abiertas
                  </span>
                  <span className="px-4 py-1.5 bg-white text-emerald-600 border border-emerald-200 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                    Deporte y Recreación
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-emerald-950 leading-tight">
                  Torneos <span className="text-emerald-600">Intercentros</span> 2024
                </h1>
                <p className="text-xl text-emerald-800/80 leading-relaxed max-w-xl">
                  Competencias deportivas diseñadas para fomentar la integración, la sana convivencia y el talento de nuestros aprendices.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-emerald-100 w-fit px-5 py-3 rounded-2xl shadow-sm">
                <div className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="font-semibold text-emerald-900">Servicio Disponible</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-emerald-200/50 shadow-lg flex items-center gap-2"
                >
                  📝 Inscribirme Ahora
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 bg-white text-emerald-900 border-2 border-emerald-100 font-bold rounded-2xl hover:bg-emerald-50 transition-all duration-300 flex items-center gap-2"
                >
                  ← Ver más Servicios
                </Link>
              </div>
            </div>

            {/* Visual Column */}
            <div className="relative animate-in zoom-in duration-1000">
              <div className="absolute -inset-4 bg-emerald-400/20 rounded-[3rem] blur-3xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/logo-bienestar.jpeg"
                  alt="Torneos Deportivos"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-emerald-200 font-medium mb-1">Copa Bienestar</p>
                    <h2 className="text-2xl font-bold italic">¡Desafía tus límites!</h2>
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-emerald-50 max-w-[200px] hidden sm:block">
                <p className="text-3xl font-black text-emerald-600 mb-1">+6</p>
                <p className="text-sm font-bold text-emerald-900 leading-tight">Disciplinas Deportivas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-16 bg-emerald-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black text-white">Disciplinas a las que puedes inscribirte</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Sports */}
            {deportesEquipo.map((sport) => (
              <div key={sport.nombre} className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                  {sport.icono}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{sport.nombre}</h3>
                <p className="text-emerald-100/70 mb-4 italic">Categoría por Equipos</p>
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 w-fit px-4 py-2 rounded-xl text-emerald-300 font-bold">
                  <span className="text-xs uppercase tracking-wide">Mínimo</span>
                  <span className="text-lg">{sport.min} integrantes</span>
                </div>
              </div>
            ))}

            {/* Individual Sports */}
            {deportesIndividuales.map((sport) => (
              <div key={sport.nombre} className="group bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                  {sport.icono}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{sport.nombre}</h3>
                <p className="text-blue-100/70 mb-4 italic">Categoría Individual</p>
                <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 w-fit px-4 py-2 rounded-xl text-blue-300 font-bold">
                  <span className="text-xs uppercase tracking-wide">Participación</span>
                  <span className="text-lg">Individual</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-emerald-900">Reglas de Inscripción</h2>
                  <p className="text-lg text-emerald-800/70">Es indispensable cumplir con los siguientes puntos para formalizar el registro.</p>
                </div>

                <div className="space-y-6">
                  {/* Rule 1 */}
                  <div className="flex gap-6 p-6 rounded-3xl bg-emerald-50 border border-emerald-100/50 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">👥</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-emerald-950 tracking-tight">Inscripción por Grupos</h4>
                      <p className="text-emerald-900/70 leading-relaxed">
                        Los integrantes deben pertenecer a la misma <span className="font-bold text-emerald-700">Ficha</span> y estar registrados previamente en la plataforma de Bienestar.
                      </p>
                    </div>
                  </div>

                  {/* Rule 2 */}
                  <div className="flex gap-6 p-6 rounded-3xl bg-amber-50 border border-amber-100/50 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">⭐</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-amber-950 tracking-tight">Capitán del Equipo</h4>
                      <p className="text-amber-900/70 leading-relaxed">
                        En deportes de equipo, se requiere identificar un <span className="font-bold">Capitán</span>. Él será el único contacto oficial para confirmar o rechazar la inscripción.
                      </p>
                    </div>
                  </div>

                  {/* Rule 3 */}
                  <div className="flex gap-6 p-6 rounded-3xl bg-emerald-600 text-white shadow-xl shadow-emerald-200/50 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">📝</div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold tracking-tight">Proceso de Solicitud</h4>
                      <p className="text-emerald-50 leading-relaxed">
                        Inicia sesión, ve a tu Dashboard y solicita el servicio de Deporte y Recreación adjuntando el listado del equipo y los datos del capitán.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="lg:sticky lg:top-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
                
                <h3 className="text-3xl font-black mb-8 relative z-10">¿Listo para competir?</h3>
                
                <div className="space-y-6 relative z-10">
                  <p className="text-emerald-50 text-lg">
                    Representa a tu centro y demuestra tu talento deportivo en la próxima jornada Intercentros.
                  </p>
                  
                  <div className="pt-6">
                    <Link
                      href="/dashboard"
                      className="w-full py-5 bg-white text-emerald-700 font-black rounded-2xl text-center block hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-900/20"
                    >
                      IR AL DASHBOARD
                    </Link>
                    <p className="text-center text-emerald-200 mt-4 text-sm font-medium">Requerido: Estar logueado como aprendiz</p>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm relative z-10">
                  <div className="flex gap-3 items-center">
                    <span className="text-2xl text-emerald-300">💡</span>
                    <p className="text-sm font-medium">Recuerda que si el deporte es individual, no requieres capitán ni grupo previo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <footer className="py-12 bg-emerald-50 border-t border-emerald-100">
        <div className="container mx-auto px-4 text-center">
            <p className="text-emerald-900/40 text-sm font-medium uppercase tracking-widest leading-loose">
              Bienestar al Aprendiz <br />
              SENA Regional Caldas - CPIC
            </p>
        </div>
      </footer>
    </div>
  );
}
