import React from 'react';

export const HeroSection: React.FC = () => {
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
              Bienestar al Aprendiz
            </span>
          </h1>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-warning to-amarillo rounded-full mb-8 animate-shimmer"></div>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto font-medium leading-relaxed mb-8">
            Este espacio está diseñado para apoyar a aprendices, instructores y administrativos del{" "}
            <span className="font-bold text-warning bg-azul-marino/30 px-3 py-1 rounded-lg backdrop-blur-sm border border-warning/20">
              Centro de Procesos Industriales y Construcción
            </span>{" "}
            de la Regional Caldas.
          </p>

          {/* Estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl mb-2">🛠️</div>
              <div className="text-2xl font-bold text-azul-cielo">15+</div>
              <div className="text-sm text-white/80">Servicios Disponibles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-success">24/7</div>
              <div className="text-sm text-white/80">Apoyo Continuo</div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};
