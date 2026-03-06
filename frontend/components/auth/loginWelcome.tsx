import Image from "next/image";
import { Info, MapPin, GraduationCap } from "lucide-react";

interface LoginWelcomeProps {
  title?: string;
  message?: string;
}

export default function LoginWelcome({
  title = "Bienvenido al Portal de Bienestar",
  message = "Inicia sesión para acceder a todos los servicios de bienestar del aprendiz.",
}: LoginWelcomeProps) {
  return (
    <div className="flex flex-col justify-center h-full p-6 sm:p-10 lg:p-16 text-white max-w-2xl">
      {/* Logos */}
      <div className="flex items-center gap-6 mb-10 animate-fade-in">
        <div className="relative group">
          <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <Image
            src="/images/icono.png"
            alt="Icono institucional"
            width={80}
            height={80}
            className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg transform transition-transform duration-500 hover:scale-110"
            priority
          />
        </div>
        <div className="h-10 w-[1px] bg-white/20"></div>
        <div className="relative group">
          <Image
            src="/images/logo-sena.png"
            alt="Logo SENA"
            width={120}
            height={80}
            className="w-24 h-16 sm:w-28 sm:h-20 object-contain drop-shadow-lg transform transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight mb-4 drop-shadow-sm">
            {title}
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-azul-cielo rounded-full"></div>
        </div>

        <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light max-w-md">
          {message}
        </p>

        <div className="space-y-6 mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-primary/20 rounded-2xl group-hover:bg-primary/30 transition-colors">
              <Info className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Registro Previo</p>
              <p className="text-xs text-white/70">Asegúrate de haber sido registrado por el Área de Bienestar del Aprendiz.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-azul-cielo/20 rounded-2xl group-hover:bg-azul-cielo/30 transition-colors">
              <GraduationCap className="w-6 h-6 text-azul-cielo" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Exclusividad</p>
              <p className="text-xs text-white/70">Uso exclusivo para Aprendices del CPIC, Regional Caldas.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 group">
            <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
              <MapPin className="w-6 h-6 text-white/80" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Sede Manizales</p>
              <p className="text-xs text-white/70">Centro de Procesos Industriales y Construcción.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
