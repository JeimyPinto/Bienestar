"use client";

export default function Footer() {

  return (
    <footer className="flex justify-around items-center px-6 bg-azul w-full h-30 text-xl text-white">
        <div className="flex justify-center items-center">
            <ul className="flex flex-col gap-3 p-2">
            <li className="text-foreground">Regional Caldas</li>
            <li className="text-foreground">Manizales</li>
            <li className="text-foreground">Centro de Procesos Industriales y Contrucción</li>
            </ul>
        </div>
        <div className="flex justify-center items-center">
            <p className="text-foreground">© 2024 - Todos los derechos reservados</p>
        </div>
        <div className="flex justify-center items-center">
            <ul className="flex flex-col gap-3 p-2">
            <li className="text-foreground">Contacto</li>
            <li className="text-foreground">Preguntas Frecuentes</li>
            <li className="text-foreground">Términos y Condiciones</li>
            </ul>
        </div>
    </footer>
  );
}
