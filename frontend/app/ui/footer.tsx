"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 py-6 bg-[var(--color-azul-oscuro)] w-full text-white gap-6 relative">
      <div className="flex flex-col items-center md:items-start">
        <ul className="flex flex-col gap-1">
          <li className="text-lg font-semibold">Regional Caldas</li>
          <li className="text-base">Centro de Procesos Industriales y Construcción</li>
          <li className="text-base">Dirección: Calle 48 # 26-85, Manizales, Caldas</li>
          <li className="text-base">Horario: 8:00 a.m. - 12:00 m. y 2:00 p.m. - 8:00 p.m.</li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="/images/logo-sena.png"
            alt="Logo SENA"
            width={60}
            height={58.8}
            priority={false}
            style={{ height: "auto" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/ico-copyright.svg"
            alt="Copyright"
            width={20}
            height={20}
            priority={false}
          />
          <p>{new Date().getFullYear()} - Todos los derechos reservados</p>
        </div>
      </div>
      <div className="flex flex-col items-center md:items-end">
        <Image
          src="/images/icono.png"
          alt="Bienestar al Aprendiz"
          width={150}
          height={150}
          className="mb-2"
          priority={false}
          style={{ height: "auto" }}
        />
        <ul className="flex flex-col gap-1">
          <li className="text-lg font-semibold">Contacto</li>
          <li className="flex items-center gap-2">
            <Image
              src="/images/ico-email.svg"
              alt="Correo electrónico"
              width={20}
              height={20}
              priority={false}
            style={{ height: "auto" }}
            />
            <a
              href="mailto:bienestarregionalcaldascpic@gmail.com"
              className="text-base underline underline-offset-2 hover:text-[var(--color-azul-claro)] transition-colors duration-200"
            >
              bienestarregionalcaldascpic@gmail.com
            </a>
          </li>
        </ul>
      </div>
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[var(--color-azul-claro)] text-white rounded-md p-3 shadow-lg hover:bg-[var(--color-magenta)] transition-colors duration-200 z-50 flex items-center justify-center"
          aria-label="Volver arriba"
        >
          <Image
            src="/images/ico-arrow-up.svg"
            alt="Volver arriba"
            width={28}
            height={28}
            priority={false}
            style={{ height: "auto" }}
          />
        </button>
      )}
    </footer>
  );
}