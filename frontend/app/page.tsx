"use client";

import Descripcion from "./dashboard/descripcion";
import ServiciosPage from "./servicios/page";
import Header from "./ui/header";

export default function Page() {
  return (
    <>
      <Header />
      <Descripcion>
        <ServiciosPage/>
      </Descripcion>
    </>
  );
}
