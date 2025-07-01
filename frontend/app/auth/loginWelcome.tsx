import Image from "next/image";

export default function LoginWelcome() {
  return (
    <>
      {/* Logos institucionales */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 mb-4 sm:mb-6 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <Image
            src="/images/icono.png"
            alt="Icono institucional"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo-sena.png"
            alt="Logo SENA"
            width={120}
            height={80}
            className="w-20 h-14 sm:w-28 sm:h-20 md:w-32 md:h-22 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </div>
      
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-white drop-shadow-lg animate-fade-in-up">
        Bienvenido al Portal de Bienestar del Aprendiz
      </h1>
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-5 md:p-6 shadow-lg border border-azul-cielo/20 w-full max-w-lg mt-2 sm:mt-4 hover:shadow-xl transition-all duration-300">
        <p className="text-sm sm:text-base md:text-lg text-azul-marino text-center mb-2">
          ¡Hola! Para iniciar sesión, asegúrate de haber sido{" "}
          <strong className="text-azul-oscuro font-bold">registrado previamente</strong>{" "}
          por el Área de Bienestar del Aprendiz.
        </p>
      </div>
    </>
  );
}
