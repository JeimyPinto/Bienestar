import Image from "next/image"
import { areaColors } from "../../styles/areaColors"
import { Service } from "../../interface/service"
import { formatDate } from "../../lib/formateDate"
import EmptyState from "../../components/home/emptyState"

export default function ServicesGallery(props: { services?: Service[]; message?: string }) {
  const { services, message } = props;

  if (!services || services.length === 0) {
    return (
      <EmptyState 
        title="No hay servicios disponibles"
        message={message || "Actualmente no hay servicios disponibles para mostrar."}
        icon="🔍"
      />
    );
  }

  return (
    <section aria-label="Galería de servicios" className="w-full">
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
