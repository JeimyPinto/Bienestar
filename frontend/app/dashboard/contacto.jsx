import React from "react";
import Image from "next/image";

export default function Contacto() {
  return (
    <div className="flex justify-around items-center bg-gray-500 text-blanco w-6/12 rounded-lg p-10 shadow-lg shadow-black">
      <Image
        src="/images/qr-contacto.png"
        alt="QR contacto"
        width={500}
        height={500}
        className="shadow-lg shadow-black"
      />
      <div className="flex items-center text-2xl px-2">
        <Image
          src="/images/ico-cellphone.svg"
          alt="Icon cellphone"
          width={100}
          height={100}
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
  );
}
