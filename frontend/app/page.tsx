"use client";

import ServiciosGallery from "./servicios/gallery";
import Footer from "./ui/footer";
import Header from "./ui/header";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col items-center gap-12 py-12">
        <p className="text-lg">
          Bienvenidos al portal de servicios del área de Bienestar al Aprendiz.
          Este espacio está diseñado para apoyar a aprendices, instructores y
          administrativos en su trayectoria con nosotros. Aquí encontrarán un
          completo portafolio de servicios enfocados en el bienestar de los
          aprendices, los cuales pueden ser utilizados directamente por ellos o
          ser remitidos por los instructores y administrativos. Nuestro objetivo
          es proporcionar un ambiente constructivo y estimulante para todos
          nuestros miembros. Ya sea que necesiten orientación académica,
          asesoramiento personal o simplemente alguien con quien hablar, estamos
          aquí para ayudar. Esperamos que esta página sea un recurso valioso
          para explorar todo lo que tenemos para ofrecer. Estamos comprometidos
          con su éxito y bienestar, y esperamos contribuir positivamente a su
          experiencia en el Centro de Procesos Industriales y Construcción del
          SENA.
        </p>
        <strong>¡Bienvenidos a nuestra comunidad!</strong>
        <div className="flex flex-col md:flex-row justify-around items-center bg-gray-500 text-blanco rounded-lg p-10 shadow-lg shadow-black">
          <Image
            src="/images/qr-contacto.png"
            alt="QR contacto"
            width={500}
            height={500}
            className="shadow-lg shadow-black"
            priority={false}
          />
          <div className="flex items-center text-2xl px-2">
            <Image
              src="/images/ico-cellphone.svg"
              alt="Icon cellphone"
              width={100}
              height={100}
              priority={false}
            />
            <strong>
              Contacta de manera directa a los profesionales de bienestar al
              aprendiz.{" "}
              <a
                href="https://linktr.ee/rutascpic?utm_source=linktree_profile_share"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amarillo underline animate-pulse"
              >
                Haz click aquí
              </a>{" "}
              o escanea el código QR
            </strong>
          </div>
        </div>
        <ServiciosGallery />
      </main>
      <Footer />
    </>
  );
}
