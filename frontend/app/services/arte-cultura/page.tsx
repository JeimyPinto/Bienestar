"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ArteCulturaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-purple-600 hover:text-purple-800 transition-colors">
              🏠 Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-purple-600 hover:text-purple-800 transition-colors">
              🛠️ Servicios
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">🎨 Arte y Cultura</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full border border-purple-200">
                <span className="text-purple-700 font-medium">🎨 Arte y Cultura</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-azul-oscuro leading-tight">
                Expresa tu
                <span className="text-purple-600"> Creatividad</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Descubre y desarrolla tu talento artístico a través de nuestros talleres, eventos 
                culturales y actividades que enriquecen tu formación integral como aprendiz SENA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/requests"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  🎭 Inscribirse a Talleres
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300">
                  📅 Ver Eventos
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/servicios/arte-cultura-hero.jpg"
                  alt="Arte y Cultura SENA"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Talleres Disponibles */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-azul-oscuro mb-4">
              🎨 Talleres y Actividades
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Participa en nuestros talleres artísticos y culturales diseñados para potenciar tu creatividad
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Música */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Taller de Música</h3>
              <p className="text-gray-600 mb-4">Aprende instrumentos, canto y teoría musical en un ambiente colaborativo.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-purple-500 mr-2">♪</span>Guitarra y piano</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">♪</span>Canto y coro</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">♪</span>Composición musical</li>
              </ul>
            </div>

            {/* Danza */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💃</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Danza y Baile</h3>
              <p className="text-gray-600 mb-4">Explora diferentes estilos de danza y expresión corporal.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-purple-500 mr-2">💃</span>Folclor colombiano</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">💃</span>Danza contemporánea</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">💃</span>Bailes urbanos</li>
              </ul>
            </div>

            {/* Teatro */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Teatro y Actuación</h3>
              <p className="text-gray-600 mb-4">Desarrolla habilidades de actuación y expresión dramática.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-purple-500 mr-2">🎭</span>Técnicas de actuación</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">🎭</span>Improvisación</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">🎭</span>Montaje de obras</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Eventos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-azul-oscuro mb-4">
              📸 Galería de Eventos
            </h2>
            <p className="text-lg text-gray-600">
              Revive los mejores momentos de nuestros eventos culturales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Puedes agregar imágenes reales aquí */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <span className="text-4xl opacity-50">🎨</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-semibold">Evento Cultural {item}</h4>
                    <p className="text-sm opacity-80">Descripción del evento</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para Crear?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad artística y descubre tu potencial creativo.
          </p>
          <Link
            href="/requests"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            🎨 Unirme a Arte y Cultura
          </Link>
        </div>
      </section>
    </div>
  );
}
