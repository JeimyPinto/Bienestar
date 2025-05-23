import Image from "next/image";
import ErrorMessage from "../ui/errorMessage";
import { areaColors } from "../lib/areaColors";
import { Service } from "../types/service";

export default function ServicesGallery({ services }: { services?: Service[] }) {
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <ErrorMessage message="Servicios no disponibles." />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Estos son nuestros servicios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <Image
              src={
                service.image
                  ? `/images/services/${service.id}/${service.image}`
                  : "/images/logo-sena.png"
              }
              alt={`Imagen del servicio ${service.name}`}
              className="w-full h-48 object-cover"
              width={400}
              height={200}
              priority={true}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 line-clamp-2">{service.description}</p>
              <div
                className={`inline-block px-3 py-1 text-white rounded-full ${areaColors[service.area]}`}
              >
                {service.area}
              </div>
              <p className="text-gray-600">Publicado: {service.createdAt}</p>
              <p className="text-gray-600">Actualizado: {service.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}