"use client";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-azul w-full text-white">
      <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
        <ul className="flex flex-col gap-2">
          <li className="text-lg font-semibold">Regional Caldas</li>
          <li className="text-base">Manizales</li>
          <li className="text-base">Centro de Procesos Industriales y Construcción</li>
        </ul>
      </div>
      <div className="flex flex-col items-center mb-4 md:mb-0">
        <p className="text-base">© 2024 - Todos los derechos reservados</p>
      </div>
      <div className="flex flex-col items-center md:items-end">
        <ul className="flex flex-col gap-2">
          <li className="text-lg font-semibold">Contacto</li>
          <li className="text-base">Preguntas Frecuentes</li>
          <li className="text-base">Términos y Condiciones</li>
        </ul>
      </div>
    </footer>
  );
}