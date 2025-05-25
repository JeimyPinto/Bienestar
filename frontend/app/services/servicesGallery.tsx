import Image from "next/image"
import { areaColors } from "../lib/areaColors"
import { Service } from "../types/service"
import ErrorMessage from "../ui/errorMessage"
import {formatDate} from "../lib/formateDate"

export default function ServicesGallery({ services, message }: { services?: Service[]; message?: string }) {
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <ErrorMessage message={message || "Servicios no disponibles."} />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight text-center">
        Estos son nuestros servicios
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl border border-gray-100 flex flex-col"
          >
            <div className="relative w-full h-48">
              <Image
                src={
                  service.image
                    ? `/images/services/${service.id}/${service.image}`
                    : "/images/logo-sena.png"
                }
                alt={`Imagen del servicio ${service.name}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority={true}
                style={{ borderBottom: "4px solid blanco" }}
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-1 text-gray-900 break-words">{service.name}</h2>
              <div
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${areaColors[service.area]}`}
              >
                {service.area}
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{service.description}</p>
              <div className="mt-auto flex flex-col gap-1 text-xs text-gray-500">
                <span>
                  <span className="font-medium">Actualizado:</span> {formatDate(service.updatedAt)}
                </span>
                <span>
                  <span className="font-medium">Publicado:</span> {formatDate(service.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

