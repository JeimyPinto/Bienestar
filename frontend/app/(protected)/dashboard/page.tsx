"use client";

import { useState } from "react";
import { ROLES } from "../../../constants/roles";
import { Request } from "../../../interface/request";
import UserCard from "../../../components/users/userCard";
import DashboardRoleActions from "../../../components/dashboard/dashboardRoleActions";
import RequestForm from "../../../components/requests/requestForm";
import SuccessMessage from "../../../ui/successMessage";
import ServicesGallery from "../../../components/services/servicesGallery"
import { useAuthContext } from "../../../contexts/authContext";
import { useMessages } from "../../../hooks/useMessages";
import { useModal } from "../../../hooks/useModal";
import RoleGate from "../../../components/auth/RoleGate";
import { Target, Plus, List, FolderOpen } from "lucide-react";

export default function DashboardPage() {
  const { successMessage, clearSuccess, showSuccess, errorMessage, setErrorMessage } = useMessages();
  const { user } = useAuthContext();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Hook para manejo del modal de solicitudes
  const {
    dialogRef,
    isFormOpen,
    mode,
    itemToEdit: requestToEdit,
    openCreateDialog,
    closeDialog
  } = useModal<Request>();

  // Función para limpiar mensajes
  const clearMessages = () => {
    setErrorMessage("");
    clearSuccess();
  };

  const handleRequestFormSuccess = (createdRequest?: Request) => {
    closeDialog();
    // Si se creó una request exitosamente, mostrar mensaje y actualizar dashboard
    if (createdRequest) {
      showSuccess("Solicitud creada exitosamente");
      setRefreshTrigger(prev => prev + 1);
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
          <UserCard />

          {/* Sección de acciones rápidas para crear solicitudes (Solo Aprendices e Instructores) */}
          <RoleGate allowedRoles={[ROLES.USER, ROLES.INSTRUCTOR, ROLES.SUPERADMIN]}>
            <div className="my-6 lg:my-8">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-azul-oscuro mb-2 flex items-center">
                      <Target className="mr-2 text-primary" size={24} />
                      <span>Acciones Rápidas</span>
                    </h2>
                    <p className="text-sm sm:text-base text-azul-marino/70">
                      Gestiona tus solicitudes de manera eficiente
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => openCreateDialog(clearMessages)}
                      className="
                  bg-success hover:bg-verde-bosque text-white 
                  px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
                  transition-all duration-300 hover:shadow-lg hover:scale-105 
                  flex items-center justify-center space-x-2
                  border border-success/30 w-full sm:w-auto
                  focus:outline-none focus:ring-4 focus:ring-success/20
                "
                    >
                      <Plus size={20} />
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
                      <List size={20} />
                      <span>Ver Mis Solicitudes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </RoleGate>

          {/* Sección Administrativa (Instructores, Admins y SuperAdmins) */}
          <RoleGate allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR]}>
            <div className="mt-6">
              <DashboardRoleActions refreshTrigger={refreshTrigger} />
            </div>
          </RoleGate>

          {isFormOpen && (
            <RequestForm
              dialogRef={dialogRef}
              onClose={handleRequestFormSuccess}
              mode={mode}
              requestToEdit={requestToEdit}
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
            />
          )}

          {/* Catálogo de servicios */}
          <div className="mt-10 mb-6">
            <h2 className="text-2xl font-bold text-azul-oscuro mb-2 flex items-center">
              <FolderOpen className="mr-2 text-primary" size={28} />
              Catálogo de Servicios Disponibles
            </h2>
            <p className="text-base text-azul-marino/70 mb-4">
              Aquí puedes consultar todos los servicios que tenemos disponibles para ti.
            </p>
          </div>
          <ServicesGallery />
        </div>
      </main>
    </>
  );
}

