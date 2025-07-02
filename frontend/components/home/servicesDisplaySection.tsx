import React from 'react';
import ServicesGallery from '../../app/services/servicesGallery';
import LoadingState from './loadingState';
import ErrorState from './errorState';
import EmptyState from './emptyState';
import { Service } from '../../interface/service';

type ServicesDisplaySectionProps = {
  services: Service[];
  loading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
};

export default function ServicesDisplaySection({
  services,
  loading,
  errorMessage,
  onRetry
}: ServicesDisplaySectionProps) {
  return (
    <section className="py-8 w-full">
      {/* Header de la sección */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary via-success to-warning bg-clip-text text-transparent">
            Nuestros Servicios
          </span>
        </h2>
        
        <div className="flex justify-center mb-6">
          <div className="w-32 h-2 bg-gradient-to-r from-primary via-success to-warning rounded-full animate-shimmer"></div>
        </div>

        <p className="text-lg md:text-xl text-azul-marino/80 max-w-3xl mx-auto leading-relaxed">
          Descubre todo lo que tenemos preparado para acompañarte en tu crecimiento personal y académico
        </p>
      </div>

      {/* Contenedor del contenido */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-gradient-card rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-info/20 backdrop-blur-sm">
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
        </div>
      </div>
    </section>
  );
}
