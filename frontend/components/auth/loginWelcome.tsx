import Image from "next/image";

interface LoginWelcomeProps {
  title?: string;
  message?: string;
}

export default function LoginWelcome({
  title = "Bienvenido al Portal de Bienestar del Aprendiz",
  message = "¡Hola! Para iniciar sesión, asegúrate de haber sido registrado previamente por el Área de Bienestar del Aprendiz.",
}: LoginWelcomeProps) {
  return (
    <>
      {/* Logo Container */}
      <div className="flex items-center justify-center gap-8 mb-8 animate-fade-in-up">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-azul-cielo rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src="/images/icono.png"
            alt="Icono institucional"
            width={100}
            height={100}
            className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain transition-transform duration-500 hover:rotate-6"
            priority
          />
        </div>
        <div className="h-12 w-[1px] bg-white/30 hidden sm:block"></div>
        <div className="relative group">
          <Image
            src="/images/logo-sena.png"
            alt="Logo SENA"
            width={140}
            height={100}
            className="w-24 h-16 sm:w-32 sm:h-22 object-contain drop-shadow-2xl transition-transform duration-500 hover:-rotate-6"
            priority
          />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 text-center text-white leading-tight animate-fade-in-up">
        {title}
      </h1>

      <div className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-xl mt-4 animate-fade-in-up hover:shadow-primary/10 transition-all duration-500">
        <p className="text-base sm:text-lg md:text-xl text-azul-marino leading-relaxed text-center">
          {message.split("registrado previamente").map((part, idx, arr) =>
            idx < arr.length - 1 ? (
              <span key={idx} className="inline">
                {part}
                <span className="text-primary font-bold relative inline-block mx-1">
                  registrado previamente
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/30 rounded-full"></span>
                </span>
              </span>
            ) : (
              part
            )
          )}
        </p>
      </div>
    </>
  );
}
