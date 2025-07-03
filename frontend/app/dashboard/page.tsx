"use client";

import { useState, useRef } from "react";
import { ROLES } from "../../constants/roles";
import UserCard from "../../components/users/userCard";
import DashboardRoleActions from "../../components/dashboard/dashboardRoleActions";
import RequestForm from "../../components/requests/requestForm";
import SuccessMessage from "../../ui/successMessage";
import { useAuth } from "../../hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";
import { useMessages } from "../../hooks/useMessages";

export default function DashboardPage() {
  const { successMessage, clearSuccess, showSuccess } = useMessages();
  const { token } = useAuth();
  
  // Obtener el usuario completo desde la base de datos
  const { users: [currentUser], loading: userLoading } = useUsers({
    token,
    mode: 'myProfile'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openRequestForm = () => {
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const closeRequestForm = (createdRequest?: unknown) => {
    setIsFormOpen(false);
    dialogRef.current?.close();

    // Si se creó una request exitosamente, mostrar mensaje
    if (createdRequest) {
      showSuccess("Solicitud creada exitosamente");
    }
  };

  return (
    <>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => clearSuccess()}
        />
      )}
      <main className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
        <div className="container mx-auto max-w-8xl">
          {userLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-azul-cielo/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-azul-cielo/20 rounded mb-2"></div>
                  <div className="h-3 bg-azul-cielo/10 rounded mb-1"></div>
                  <div className="h-3 bg-azul-cielo/10 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <UserCard user={currentUser || null} />
          )}
          {/* Sección de acciones rápidas para crear solicitudes */}
            <div className="my-6 lg:my-8">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-azul-oscuro mb-2 flex items-center">
                    <span className="mr-2 text-xl sm:text-2xl">🎯</span>
                    <span>Acciones Rápidas</span>
                  </h2>
                  <p className="text-sm sm:text-base text-azul-marino/70">
                    Gestiona tus solicitudes de manera eficiente
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={openRequestForm}
                    className="
                      bg-success hover:bg-verde-bosque text-white 
                      px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
                      transition-all duration-300 hover:shadow-lg hover:scale-105 
                      flex items-center justify-center space-x-2
                      border border-success/30 w-full sm:w-auto
                      focus:outline-none focus:ring-4 focus:ring-success/20
                    "
                  >
                    <span className="text-lg">➕</span>
                    <span>Nueva Solicitud</span>
                  </button>

                  <button
                    onClick={() => (window.location.href = "/requests")}
                    className="
                      bg-primary hover:bg-azul-cielo text-white 
                      px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
                      transition-all duration-300 hover:shadow-lg hover:scale-105 
                      flex items-center justify-center space-x-2
                      border border-primary/30 w-full sm:w-auto
                      focus:outline-none focus:ring-4 focus:ring-primary/20
                    "
                  >
                    <span className="text-lg">📋</span>
                    <span>Ver Historial</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {!userLoading && currentUser &&
            [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(
              currentUser.role
            ) && (
              <div className="mt-6">
                <DashboardRoleActions />
              </div>
            )}
          {isFormOpen && (
            <RequestForm
              dialogRef={dialogRef}
              onClose={closeRequestForm}
              mode="create"
            />
          )}
        </div>
      </main>
    </>
  );
}
