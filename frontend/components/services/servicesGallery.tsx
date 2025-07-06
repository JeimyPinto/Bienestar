import Image from "next/image"
import Link from "next/link"
import { areaColors } from "../../styles/areaColors"
import { formatDate } from "../../lib/formateDate"
import { useServices } from "../../hooks/useServices"

interface ServicesGalleryProps {
  token?: string | null;
  userId?: number;
  mode?: 'all' | 'allActive' | 'byId' | 'userServices';
  serviceId?: number;
  onError?: (message?: string) => void;
  showLoadingState?: boolean;
}

export default function ServicesGallery({ 
  token, 
  userId, 
  mode = 'allActive',
  serviceId,
  onError,
  showLoadingState = true
}: ServicesGalleryProps) {
  const { services, loading, errorMessage } = useServices({
    token,
    userId,
    mode,
    serviceId,
    onError
  });

  if (loading && showLoadingState) {
    return (
      <section aria-label="Galería de servicios" className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden border border-azul-cielo/20 animate-pulse">
              <div className="w-full h-48 bg-azul-cielo/20"></div>
              <div className="p-5">
                <div className="h-6 bg-azul-cielo/30 rounded mb-2"></div>
                <div className="h-4 bg-azul-cielo/20 rounded mb-3 w-20"></div>
                <div className="h-4 bg-azul-marino/20 rounded mb-2"></div>
                <div className="h-4 bg-azul-marino/20 rounded mb-2"></div>
                <div className="h-4 bg-azul-marino/20 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    // Función para procesar el mensaje de error y hacerlo más amigable
    const getDisplayMessage = () => {
      if (!errorMessage) {
        return "Actualmente no hay servicios disponibles para mostrar. Los servicios aparecerán aquí una vez que sean publicados.";
      }
      
      // Log del error original para debugging (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error original en ServicesGallery:', errorMessage);
      }
      
      // Detectar diferentes tipos de errores y mostrar mensajes amigables
      if (errorMessage.includes("SyntaxError") || errorMessage.includes("Unexpected token")) {
        return "Temporalmente no podemos cargar los servicios. Por favor, inténtalo de nuevo en unos momentos.";
      }
      
      if (errorMessage.includes("Server error") || errorMessage.includes("Error en el servidor")) {
        return "Estamos experimentando problemas técnicos. Nuestro equipo está trabajando para solucionarlo.";
      }
      
      if (errorMessage.includes("Network") || errorMessage.includes("fetch")) {
        return "Problemas de conexión. Verifica tu conexión a internet e inténtalo nuevamente.";
      }
      
      if (errorMessage.includes("No se encontraron servicios") || errorMessage.includes("No hay servicios")) {
        return "No hay servicios disponibles en este momento.";
      }
      
      // Para otros errores, mostrar un mensaje genérico amigable
      return "No pudimos cargar los servicios en este momento. Por favor, inténtalo más tarde.";
    };

    const displayMessage = getDisplayMessage();
    const hasError = !!errorMessage;

    return (
      <section aria-label="Galería de servicios" className="w-full my-8">
        <div className={`border rounded-2xl p-8 text-center ${
          hasError 
            ? "bg-gradient-to-br from-coral/10 to-amarillo/5 border-coral/30" 
            : "bg-gradient-to-br from-azul-cielo/10 to-azul-oscuro/5 border-azul-cielo/30"
        }`}>
          <div className="flex flex-col items-center space-y-4">
            {/* Icono principal - cambia según si hay error o no */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
              hasError 
                ? "bg-coral/20 border-coral/40" 
                : "bg-azul-cielo/20 border-azul-cielo/40"
            }`}>
              <span className="text-4xl">{hasError ? "⚠️" : "🔍"}</span>
            </div>
            
            {/* Título */}
            <h3 className={`text-2xl font-bold ${hasError ? "text-coral" : "text-azul-oscuro"}`}>
              {hasError ? "Oops! Algo salió mal" : "No hay servicios disponibles"}
            </h3>
            
            {/* Mensaje */}
            <p className="text-azul-marino/70 max-w-md text-base leading-relaxed">
              {displayMessage}
            </p>
            
            {/* Banner informativo adicional - solo si no hay error grave */}
            {!hasError && (
              <div className="bg-amarillo/20 border border-amarillo/40 rounded-lg p-4 max-w-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💡</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-azul-oscuro">
                      ¿Eres instructor o administrador?
                    </p>
                    <p className="text-xs text-azul-marino/80 mt-1">
                      Puedes crear nuevos servicios desde el panel de administración para que aparezcan aquí.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Botón de reintento si hay error */}
            {hasError && (
              <button 
                onClick={() => window.location.reload()}
                className="
                  bg-primary hover:bg-azul-cielo 
                  text-white font-medium px-6 py-3 rounded-lg 
                  transition-colors duration-200 
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                "
              >
                🔄 Intentar de nuevo
              </button>
            )}
            
            {/* Decoración */}
            <div className="flex space-x-2 mt-4">
              <div className={`w-2 h-2 rounded-full animate-pulse ${hasError ? "bg-coral" : "bg-azul-cielo"}`}></div>
              <div className={`w-2 h-2 rounded-full animate-pulse ${hasError ? "bg-amarillo" : "bg-primary"}`} style={{ animationDelay: '0.2s' }}></div>
              <div className={`w-2 h-2 rounded-full animate-pulse ${hasError ? "bg-coral/70" : "bg-success"}`} style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Galería de servicios" className="w-full my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="
              bg-white shadow-lg rounded-2xl overflow-hidden 
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-xl 
              border border-azul-cielo/20 flex flex-col
              group
            "
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={
                  service?.image
                    ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/services/" + service.image
                    : "/images/logo-sena.png"
                }
                alt={`Imagen del servicio ${service.name}`}
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-azul-marino/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-2 text-azul-oscuro break-words group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h2>
              <div
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 w-fit ${areaColors[service.area]}`}
              >
                {service.area}
              </div>
              <p className="text-azul-marino/70 text-sm mb-4 line-clamp-3 flex-1">
                {service.description}
              </p>
              
              {/* Botón de detalle si existe detailUrl */}
              {service.detailUrl && (
                <div className="mb-4">
                  <Link
                    href={`/services${service.detailUrl}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-azul-claro to-azul-oscuro text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    🔍 Ver Detalles Completos
                  </Link>
                </div>
              )}
              
              <div className="mt-auto flex flex-col gap-2 text-xs text-azul-marino/60 border-t border-azul-cielo/20 pt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-primary">📅</span>
                  <span>
                    <span className="font-medium">Actualizado:</span> {formatDate(service.updatedAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-success">✨</span>
                  <span>
                    <span className="font-medium">Publicado:</span> {formatDate(service.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
