import React from 'react';
import Accordion from '../../accordion';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full bg-gradient-card rounded-2xl shadow-xl p-6 md:p-8 hover-lift border border-primary/20 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-azul-oscuro flex items-center justify-center mb-4">
          <span className="text-4xl mr-4 animate-pulse-soft">👥</span>
          Sobre Nosotros
        </h2>
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-primary to-azul-cielo rounded-full"></div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-primary/10">
          <Accordion
            title="¿Quiénes somos?"
            content="Somos el área de Bienestar al Aprendiz del Centro de Procesos Industriales y Construcción de la Regional Caldas. Nuestra misión es apoyar a los aprendices, instructores y administrativos en su trayectoria con nosotros. Ofrecemos un completo portafolio de servicios enfocados en el bienestar de los aprendices, que pueden ser utilizados directamente por ellos o ser remitidos por los instructores y administrativos."
          />
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-success/10">
          <Accordion
            title="Objetivo general"
            content="Nuestro objetivo es proporcionar un ambiente constructivo y estimulante para todos nuestros miembros. Ya sea que necesiten orientación académica, asesoramiento personal o simplemente alguien con quien hablar, estamos aquí para ayudar. Buscamos crear un espacio seguro donde cada persona pueda desarrollarse integralmente."
          />
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-warning/10">
          <Accordion
            title="Compromiso con la excelencia"
            content="Esperamos que esta página sea un recurso valioso para explorar todo lo que tenemos para ofrecer. Estamos comprometidos con su éxito y bienestar, y esperamos contribuir positivamente a su experiencia en el Centro de Procesos Industriales y Construcción del SENA. Trabajamos continuamente para mejorar nuestros servicios."
          />
        </div>
      </div>
    </section>
  );
};
