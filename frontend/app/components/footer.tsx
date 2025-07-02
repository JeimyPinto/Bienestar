"use client";

import React from "react";
import { useFooter } from "../hooks/useFooter";
import { RegionalInfo } from "./footer/RegionalInfo";
import { CentralLogo } from "./footer/CentralLogo";
import { ContactInfo } from "./footer/ContactInfo";
import { ScrollTopButton } from "./footer/ScrollTopButton";
import { FooterDivider } from "./footer/FooterDivider";
import { FooterBottom } from "./footer/FooterBottom";

export default function Footer() {
  const { showScrollTop, scrollToTop } = useFooter();

  return (
    <footer className="bg-gradient-to-b from-azul-oscuro to-azul-marino border-t border-azul-cielo/20 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-azul-cielo/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-success/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 animate-fade-in-up">
          <RegionalInfo />
          <CentralLogo />
          <ContactInfo />
        </div>

        <FooterDivider />
        <FooterBottom />
      </div>

      {/* Botón de volver arriba */}
      <ScrollTopButton show={showScrollTop} onClick={scrollToTop} />
    </footer>
  );
}
