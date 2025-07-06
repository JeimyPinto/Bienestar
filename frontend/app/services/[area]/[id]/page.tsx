"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { slugToArea } from '../../../../helpers/serviceUrlHelpers';
import SaludPage from '../../salud/page';
import ArteCulturaPage from '../../arte-cultura/page';
// Import other service pages as you create them

export default function ServiceDetailPage() {
  const params = useParams();
  const { area, id } = params;
  
  // Convert slug back to area name
  const areaName = slugToArea(area as string);
  
  // Route to specific service pages based on area
  switch (area) {
    case 'salud':
      return <SaludPage />;
    case 'arte-cultura':
      return <ArteCulturaPage />;
    case 'deporte-recreacion':
      // You can create this page later
      return <ComingSoonPage area={areaName} id={id as string} />;
    case 'apoyo-socioeconomico':
      // You can create this page later
      return <ComingSoonPage area={areaName} id={id as string} />;
    case 'apoyo-psicosocial':
      // You can create this page later
      return <ComingSoonPage area={areaName} id={id as string} />;
    default:
      notFound();
  }
}

// Temporary component for areas that don't have custom pages yet
function ComingSoonPage({ area, id }: { area: string; id: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-azul-cielo/10 via-white to-azul-marino/5 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 bg-azul-claro/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚧</span>
          </div>
          <h1 className="text-4xl font-bold text-azul-oscuro mb-4">
            Página en Construcción
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            La página detallada para <strong>{area}</strong> (ID: {id}) está siendo desarrollada.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Pronto tendrás acceso a contenido específico, multimedia y funcionalidades 
            personalizadas para este servicio.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 bg-azul-claro text-white font-semibold rounded-lg hover:bg-azul-oscuro transition-all duration-300"
          >
            ← Volver a Servicios
          </a>
          <a
            href="/requests"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-azul-claro text-azul-claro font-semibold rounded-lg hover:bg-azul-claro hover:text-white transition-all duration-300"
          >
            📋 Solicitar Servicio
          </a>
        </div>
      </div>
    </div>
  );
}
