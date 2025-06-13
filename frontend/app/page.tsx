"use client";

import { useEffect, useState } from "react";
import ServicesGallery from "./services/servicesGallery";
import Footer from "./ui/footer";
import Header from "./ui/header";
import Image from "next/image";
import Accordion from "./ui/accordion"
import { getAllActive } from "./services/services/service";
import { Service } from "./types/service";

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { services, message } = await getAllActive();
      if (message) {
        setMessage(message);
      }
      if (services) {
        setServices(services);
        setMessage(message);
      }
    };
    fetchServices();
  }, [setServices, setMessage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="relative bg-gradient-to-r from-cian to-blue-500 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cian/20 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
            Bienestar al Aprendiz
          </h1>
          <div className="w-24 h-1 mx-auto bg-amarillo rounded-full mb-6 animate-grow" />
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Este espacio está diseñado para apoyar a aprendices, instructores y administrativos del <span className="font-bold text-amarillo">Centro de Procesos Industriales y Construcción</span> de la Regional Caldas.
          </p>
        </div>
      </div>
      <main className="container mx-auto flex flex-col items-center gap-12 py-12">
        <div className="w-full flex flex-col md:flex-row gap-8 mb-8">
          <section className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              Sobre Nosotros
            </h2>
            <Accordion
              title="¿Quiénes somos?"
              content="Somos el área de Bienestar al Aprendiz del Centro de Procesos Industriales y Construcción de la Regional Caldas. Nuestra misión es apoyar a los aprendices, instructores y administrativos en su trayectoria con nosotros. Ofrecemos un completo portafolio de servicios enfocados en el bienestar de los aprendices, que pueden ser utilizados directamente por ellos o ser remitidos por los instructores y administrativos. Nuestro objetivo es proporcionar un ambiente constructivo y estimulante para todos nuestros miembros."
            />
            <Accordion
              title="Objetivo general"
              content="Nuestro objetivo es proporcionar un ambiente constructivo y estimulante para todos nuestros miembros. Ya sea que necesiten orientación académica, asesoramiento personal o simplemente alguien con quien hablar, estamos aquí para ayudar."
            />
            <Accordion
              title="Saludo"
              content="Esperamos que esta página sea un recurso valioso para explorar todo lo que tenemos para ofrecer. Estamos comprometidos con su éxito y bienestar, y esperamos contribuir positivamente a su experiencia en el Centro de Procesos Industriales y Construcción del SENA."
            />
          </section>
          <section className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-center">Contacto</h2>
            <div className="flex flex-col md:flex-row justify-around items-center">
              <Image
                src="/images/QR-contacto.png"
                alt="QR contacto"
                width={300}
                height={300}
                className="shadow-lg"
                priority={false}
              />
              <div className="flex flex-col items-center text-center md:text-left md:items-start text-2xl px-2 mt-4 md:mt-0">
                <Image
                  src="/images/ico-cellphone.svg"
                  alt="Icon cellphone"
                  width={50}
                  height={50}
                  priority={false}
                />
                <strong className="mt-4">
                  Contacta de manera directa a los profesionales de bienestar al
                  aprendiz.{" "}
                  <span className="bg-amarillo rounded px-1">
                    <a
                      href="https://linktr.ee/rutascpic?utm_source=linktree_profile_share"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-azul-oscuro underline font-semibold hover:text-blue-800 transition-colors"
                    >
                      Haz click aquí
                    </a>
                  </span>{" "}
                  o escanea el código QR
                </strong>
              </div>
            </div>
          </section>
        </div>
        <section className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight text-center">
            Estos son nuestros servicios
          </h1>
          <ServicesGallery services={services} message={message ?? undefined} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
