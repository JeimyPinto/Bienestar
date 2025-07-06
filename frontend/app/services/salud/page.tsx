"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SaludPage() {
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
            <span className="text-gray-600 font-medium">💊 Salud</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-verde-claro/10 rounded-full border border-verde-claro/20">
                <span className="text-verde-bosque font-medium">💊 Servicio de Salud</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-azul-oscuro leading-tight">
                Cuidamos tu 
                <span className="text-verde-bosque"> Bienestar</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Ofrecemos servicios integrales de salud para garantizar el bienestar físico y mental 
                de todos nuestros aprendices durante su formación en el SENA.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/requests"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-verde-claro to-verde-bosque text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  📋 Solicitar Cita Médica
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-verde-claro text-verde-bosque font-semibold rounded-xl hover:bg-verde-claro/10 transition-all duration-300">
                  📞 Contactar Enfermería
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/servicios/salud-hero.jpg"
                  alt="Servicio de Salud SENA"
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

      {/* Servicios Disponibles */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-azul-oscuro mb-4">
              🏥 Servicios Disponibles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contamos con un equipo médico especializado y equipos modernos para atender tus necesidades de salud
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Consulta Médica */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-verde-claro/20">
              <div className="w-16 h-16 bg-verde-claro/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🩺</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Consulta Médica General</h3>
              <p className="text-gray-600 mb-4">Atención médica integral para diagnóstico y tratamiento de patologías comunes.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Consulta presencial</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Expedición de certificados</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Valoraciones médicas</li>
              </ul>
            </div>

            {/* Enfermería */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-verde-claro/20">
              <div className="w-16 h-16 bg-verde-claro/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💉</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Servicios de Enfermería</h3>
              <p className="text-gray-600 mb-4">Procedimientos y cuidados especializados por personal de enfermería calificado.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Toma de signos vitales</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Curaciones y vendajes</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Aplicación de medicamentos</li>
              </ul>
            </div>

            {/* Primeros Auxilios */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-verde-claro/20">
              <div className="w-16 h-16 bg-verde-claro/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚑</span>
              </div>
              <h3 className="text-xl font-bold text-azul-oscuro mb-3">Primeros Auxilios</h3>
              <p className="text-gray-600 mb-4">Atención inmediata en situaciones de emergencia médica dentro de las instalaciones.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Atención de emergencias</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Estabilización de pacientes</li>
                <li className="flex items-center"><span className="text-verde-claro mr-2">✓</span>Coordinación con EPS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios y Contacto */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-verde-claro/20">
              <h3 className="text-2xl font-bold text-azul-oscuro mb-6 flex items-center">
                <span className="mr-3">🕐</span>
                Horarios de Atención
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-azul-oscuro">Lunes a Viernes</span>
                  <span className="text-verde-bosque font-semibold">7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-azul-oscuro">Sábados</span>
                  <span className="text-verde-bosque font-semibold">8:00 AM - 12:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-azul-oscuro">Emergencias</span>
                  <span className="text-coral font-semibold">24/7 disponible</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-verde-claro/20">
              <h3 className="text-2xl font-bold text-azul-oscuro mb-6 flex items-center">
                <span className="mr-3">📍</span>
                Ubicación y Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-verde-claro mt-1">📍</span>
                  <div>
                    <p className="font-medium text-azul-oscuro">Consultorio Médico</p>
                    <p className="text-gray-600">Bloque A - Primer Piso</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-verde-claro mt-1">📞</span>
                  <div>
                    <p className="font-medium text-azul-oscuro">Teléfono</p>
                    <p className="text-gray-600">(+57) 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-verde-claro mt-1">✉️</span>
                  <div>
                    <p className="font-medium text-azul-oscuro">Email</p>
                    <p className="text-gray-600">salud@sena.edu.co</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-verde-claro to-verde-bosque">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Necesitas Atención Médica?
          </h2>
          <p className="text-verde-cielo text-lg mb-8 max-w-2xl mx-auto">
            No esperes más. Solicita tu cita médica o consulta de enfermería de forma rápida y sencilla.
          </p>
          <Link
            href="/requests"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-verde-bosque font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            📋 Solicitar Servicio de Salud
          </Link>
        </div>
      </section>
    </div>
  );
}
