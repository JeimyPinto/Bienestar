import React from 'react';
import Image from 'next/image';

export const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center md:items-end space-y-4">
      <div className="group">
        <Image
          src="/images/icono.png"
          alt="Bienestar al Aprendiz"
          width={120}
          height={120}
          className="transition-transform duration-300 group-hover:scale-105 drop-shadow-lg hover-lift"
          priority={false}
          style={{ height: "auto" }}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl">📞</span>
          <h4 className="text-lg font-semibold text-white">Contacto</h4>
        </div>
        
        <div className="flex items-center space-x-3 group">
          <div className="p-2 bg-white/10 rounded-lg group-hover:bg-success/20 transition-colors duration-200">
            <Image
              src="/images/ico-email.svg"
              alt="Correo electrónico"
              width={20}
              height={20}
              priority={false}
              style={{ height: "auto" }}
            />
          </div>
          <a
            href="mailto:bienestarregionalcaldascpic@gmail.com"
            className="
              text-sm text-azul-cielo hover:text-warning 
              transition-colors duration-200 
              underline underline-offset-2 hover:underline-offset-4 
              break-all font-medium
              focus-visible-custom
            "
          >
            bienestarregionalcaldascpic@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};
