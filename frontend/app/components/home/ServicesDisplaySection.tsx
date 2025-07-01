import React from 'react';
import ServicesGallery from '../../../services/servicesGallery';
import { ServicesDisplaySectionProps } from '../../../types/components';


export const ServicesDisplaySection: React.FC<ServicesDisplaySectionProps> = ({
  services,
  loading,
  errorMessage,
  onRetry
}) => {
  return (
    <section className="w-full max-w-6xl bg-gradient-card rounded-2xl shadow-2xl p-6 md:p-10 hover-lift border border-info/20 backdrop-blur-sm">
      {/* Header de la sección */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-azul-oscuro tracking-tight">
          <span className="flex items-center justify-center mb-4">
            <span className="text-5xl mr-4 animate-pulse-soft">🛠️</span>
            <span className="bg-gradient-to-r from-azul-oscuro to-primary bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </span>
        </h1>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-2 bg-gradient-to-r from-primary via-success to-warning rounded-full animate-shimmer"></div>
        </div>

        <p className="text-lg md:text-xl text-azul-marino/80 max-w-3xl mx-auto leading-relaxed">
          Descubre todo lo que tenemos preparado para acompañarte en tu crecimiento personal y académico
        </p>
      </div>

      {/* Contenido dinámico */}
      {loading ? (
        <LoadingState />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={onRetry} />
      ) : services.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="animate-fade-in-up">
          <ServicesGallery services={services} />
        </div>
      )}
    </section>
  );
};

// Componente para estado de carga
const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative mb-8">
      <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary/20 border-t-primary"></div>
      <div className="animate-ping absolute inset-0 rounded-full h-20 w-20 border-4 border-primary/30"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl animate-pulse-soft">🛠️</span>
      </div>
    </div>
    <h3 className="text-azul-oscuro text-2xl font-bold mb-2">Cargando servicios...</h3>
    <p className="text-azul-marino/60 text-lg">Preparando la mejor experiencia para ti</p>
    <div className="mt-6 flex space-x-2">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-success rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-3 h-3 bg-warning rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

// Componente para estado de error
const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="text-danger text-8xl mb-6 animate-pulse-soft">⚠️</div>
    <h3 className="text-danger text-3xl font-bold mb-4">¡Oops! Algo salió mal</h3>
    <p className="text-danger/80 text-lg mb-8 text-center max-w-md leading-relaxed">{message}</p>
    <button
      onClick={onRetry}
      className="
        px-8 py-4 bg-gradient-to-r from-primary to-azul-cielo 
        hover:from-azul-cielo hover:to-primary
        text-white rounded-xl font-bold text-lg
        transition-all duration-300 
        hover:scale-105 hover:shadow-xl
        border border-primary/30 hover:border-azul-cielo/50
        flex items-center space-x-3
        focus-visible-custom
      "
    >
      <span className="text-xl">🔄</span>
      <span>Reintentar</span>
    </button>
  </div>
);

// Componente para estado vacío
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="text-azul-cielo text-8xl mb-6 animate-pulse-soft">📭</div>
    <h3 className="text-azul-oscuro text-3xl font-bold mb-4">No hay servicios disponibles</h3>
    <p className="text-azul-marino/80 text-lg text-center max-w-md leading-relaxed">
      Actualmente no hay servicios activos para mostrar. Vuelve más tarde para descubrir nuevas opciones.
    </p>
    <div className="mt-8 bg-info/10 border border-info/20 rounded-xl p-6">
      <p className="text-info text-sm flex items-center">
        <span className="mr-2">💡</span>
        Mientras tanto, puedes contactarnos directamente para obtener información
      </p>
    </div>
  </div>
);
