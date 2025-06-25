export default function LoginWelcome() {
  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 text-center text-azul drop-shadow-lg">
        Bienvenido al Portal de Bienestar del Aprendiz
      </h1>
      <div className="bg-white/90 rounded-lg p-3 sm:p-5 md:p-6 shadow-md w-full max-w-lg mt-2 sm:mt-4">
        <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-2">
          ¡Hola! Para iniciar sesión, asegúrate de haber sido{" "}
          <span className="underline decoration-wavy decoration-cian font-semibold">
            registrado previamente
          </span>{" "}
          por el Área de Bienestar del Aprendiz.
        </p>
      </div>
    </>
  );
}
