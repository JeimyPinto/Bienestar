export default function LoginWelcome() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-azul-oscuro drop-shadow-lg animate-fade-in-up">
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
