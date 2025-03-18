"use client";

import Header from "../../ui/header";
import ProfileCard from "../../profile/profileCard";

/**
 * Componente que representa la página de inicio de sesión.
 * @returns {JSX.Element} Página de inicio de sesión.
 * @constructor 
 * @version 18/03/2025
 * @autor Jeimy Pinto
 */
const DashboardPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <ProfileCard />
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Solicitudes de Referencia Pendientes</h2>
          <div>
            <p>No hay solicitudes pendientes.</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardPage;