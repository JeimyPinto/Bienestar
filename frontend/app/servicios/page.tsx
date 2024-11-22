"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../ui/header";

interface Servicio {
  id: number;
  nombre: string;
  imagen: string;
}

export default function Page() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/servicios`
        );
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <>
      {pathname !== "/" && <Header />}
      <h2>
        Estos son nuestros servicios {pathname !== "/" && `en ${pathname}`}
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="text-center">
            <img
              src={servicio.imagen || "/images/logo-sena.png"}
              alt={servicio.nombre}
              className="w-full h-auto"
            />
            <p>{servicio.nombre}</p>
          </div>
        ))}
      </div>
    </>
  );
}
