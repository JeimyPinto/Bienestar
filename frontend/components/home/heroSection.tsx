import React from 'react';
import { Wrench, Star } from "lucide-react";
import { useServices } from "../../hooks/useServices";

export interface HeroSectionProps {
  title?: string;
  subtitle?: React.ReactNode;
}

export default function HeroSection({
  title = "Bienestar al Aprendiz",
  subtitle = (
    <>
      Este espacio está diseñado para apoyar a aprendices, instructores y administrativos del{" "}
      <span className="font-semibold text-warning bg-white/10 px-2 py-0.5 rounded-md shadow-sm">
        Centro de Procesos Industriales y Construcción
      </span>{" "}
      de la Regional Caldas.
    </>
  ),
}: HeroSectionProps) {
  const { services, loading, errorMessage } = useServices({
    mode: 'allActive'
  });

  // Si hay error al cargar los datos dinámicos, mejor no renderizar para evitar inconsistencias
  if (errorMessage && !loading) {
    return null;
  }

  const stats = [
    {
      icon: <Wrench size={32} className="text-white/80" />,
      value: loading ? "..." : `${services.length}+`,
      label: "Servicios Disponibles",
      valueClassName: "text-azul-cielo"
    },
    {
      icon: <Star size={32} className="text-white/80" />,
      value: "24/7",
      label: "Apoyo Continuo",
      valueClassName: "text-success"
    }
  ];

  return (
    <div className="relative bg-gradient-corporate text-white py-20 overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-azul-cielo/20 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-success/10 rounded-full blur-2xl"></div>
        <div className="absolute top-16 right-1/4 w-32 h-32 bg-warning/10 rounded-full blur-xl animate-pulse-soft"></div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto flex flex-col items-center justify-center text-center relative z-10 px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white to-azul-cielo bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-warning to-amarillo rounded-full mb-8 animate-shimmer"></div>

          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex justify-center items-center mb-2">
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold ${stat.valueClassName ?? ''}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
