import React from 'react';
import Image from 'next/image';

export interface ContactInfoProps {
  email?: string;
  iconSrc?: string;
  iconAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ContactInfo({
  email = "bienestarregionalcaldascpic@gmail.com",
  iconSrc = "/images/ico-email.svg",
  iconAlt = "Correo electrónico",
  imageSrc = "/images/icono.png",
  imageAlt = "Bienestar al Aprendiz",
}: ContactInfoProps) {
  return (
    <div className="flex flex-col items-center md:items-end space-y-6">
      <div className="relative group">
        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={100}
          height={100}
          className="relative transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
          priority={false}
          style={{ height: "auto" }}
        />
      </div>

      <div className="space-y-4 w-full flex flex-col items-center md:items-end">
        <div className="flex items-center gap-3 md:flex-row-reverse">
          <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
            <span className="text-xl">📞</span>
          </div>
          <h4 className="text-lg font-display font-bold text-white tracking-tight">Contacto</h4>
        </div>

        <a
          href={`mailto:${email}`}
          className="
            group flex items-center gap-3 p-3 rounded-2xl
            bg-white/5 hover:bg-white/10
            border border-white/10 hover:border-primary/30
            transition-all duration-300
            focus-visible-custom
            md:flex-row-reverse
          "
        >
          <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 p-2">
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={16}
              height={16}
              priority={false}
              className="brightness-0 invert"
            />
          </div>
          <span className="text-xs font-sans text-white/70 group-hover:text-white transition-colors duration-300 break-all text-center md:text-right">
            {email}
          </span>
        </a>
      </div>
    </div>
  );
}
