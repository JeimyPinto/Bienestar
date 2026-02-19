"use client";

import React from "react";
import { useFooter } from "../../hooks/useFooter";
import { REGIONAL_INFO } from "../../constants/regionalInfo";
import RegionalInfo from "../../components/footer/RegionalInfo"
import CentralLogo from "../../components/footer/CentralLogo";
import ContactInfo from "../../components/footer/ContactInfo";
import ScrollTopButton from "../../components/footer/ScrollTopButton";
import FooterDivider from "../../components/footer/FooterDivider";
import FooterBottom from "../../components/footer/FooterBottom";

export default function Footer() {
  const { showScrollTop, scrollToTop } = useFooter();

  return (
    <footer className="bg-azul-oscuro border-t border-white/10 relative overflow-hidden transition-all duration-500">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse-soft"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-azul-cielo/5 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-success/5 rounded-full blur-[60px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 animate-fade-in-up">
          <RegionalInfo
            regionName={REGIONAL_INFO.regionName}
            centerName={REGIONAL_INFO.centerName}
            address={REGIONAL_INFO.address}
            scheduleTitle={REGIONAL_INFO.scheduleTitle}
            schedule={REGIONAL_INFO.schedule}
          />
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
