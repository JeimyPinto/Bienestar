import React from 'react';
import Image from 'next/image';

export interface ContactSectionProps {
  qrImageSrc?: string;
  qrAlt?: string;
  contactIconSrc?: string;
  contactIconAlt?: string;
  linkUrl?: string;
  linkText?: string;
}

export default function ContactSection({
  qrImageSrc = "/images/QR-contacto.png",
  qrAlt = "QR contacto directo con bienestar",
  contactIconSrc = "/images/ico-cellphone.svg",
  contactIconAlt = "Icono de contacto móvil",
  linkUrl = "https://linktr.ee/rutascpic?utm_source=linktree_profile_share",
  linkText = "Acceder a Enlaces",
}: ContactSectionProps) {
  return (
    <section className="w-full bg-gradient-to-br from-success/10 to-azul-cielo/10 rounded-2xl shadow-xl p-6 md:p-8 hover-lift border border-success/20 backdrop-blur-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-azul-oscuro flex items-center justify-center mb-4">
          <span className="text-4xl mr-4 animate-pulse-soft">📞</span>
          Contacto Directo
        </h2>
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-success to-verde-bosque rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        {/* QR Code */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-success to-azul-cielo rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-white p-4 rounded-2xl shadow-lg">
            <Image
              src={qrImageSrc}
              alt={qrAlt}
              width={240}
              height={240}
              className="rounded-xl transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-success text-white p-2 rounded-full text-xs font-bold shadow-lg">
            📱 Escanea
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
          <div className="bg-success/20 p-6 rounded-full mb-6 border border-success/30">
            <Image
              src={contactIconSrc}
              alt={contactIconAlt}
              width={48}
              height={48}
              className="filter brightness-0 saturate-100"
              style={{ filter: 'invert(22%) sepia(87%) saturate(1352%) hue-rotate(99deg) brightness(96%) contrast(101%)' }}
              priority={false}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-azul-oscuro">
              ¡Estamos aquí para ti!
            </h3>
            
            <p className="text-azul-marino leading-relaxed">
              <strong className="text-azul-oscuro">
                Contacta de manera directa a los profesionales de bienestar al aprendiz.
              </strong>
            </p>
            
            <div className="bg-gradient-to-r from-warning to-amarillo hover:from-amarillo hover:to-warning rounded-xl p-4 transition-all duration-300 hover:scale-105 shadow-lg">
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-azul-oscuro font-bold text-lg hover:text-azul-marino transition-colors focus-visible-custom flex items-center justify-center space-x-2"
              >
                <span>🔗</span>
                <span>{linkText}</span>
                <span>📱</span>
              </a>
            </div>
            
            <p className="text-sm text-azul-marino/70">
              O simplemente escanea el código QR con la cámara de tu móvil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
