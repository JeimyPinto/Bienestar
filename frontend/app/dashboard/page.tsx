"use client";

import Header from "../ui/header";
import ProfileCard from "../profile/profileCard";

const DashboardPage = () => {
  return (
    <>
      <Header />
      <ProfileCard />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Solicitudes de Remisión Pendientes
        </h2>
        <div>
          <p>No hay solicitudes pendientes.</p>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
