"use client";

import { useEffect, useState, useRef } from "react";
import UserCard from "../users/userCard";
import DashboardRoleActions from "./dashboardRoleActions";
import RequestForm from "../requests/requestForm";
import RequestHistory from "../requests/requestHistory";
import SuccessMessage from "../ui/successMessage";
import { ROLES } from "../lib/roles";
import { useAuth } from "../hooks/useAuth";
import { useRequests } from "../hooks/useRequests";
import { useMessages } from "../hooks/useMessages";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { successMessage, errorMessage, clearSuccess, setErrorMessage, showSuccess } = useMessages();
  const { requests, loading, refreshRequests } = useRequests({
    token,
    userId: user?.id,
    onError: (message) => setErrorMessage(message)
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  const openRequestForm = () => {
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const closeRequestForm = (createdRequest?: unknown) => {
    setIsFormOpen(false);
    dialogRef.current?.close();

    // Si se creó una request exitosamente, actualizar la lista y mostrar mensaje
    if (createdRequest) {
      refreshRequests();
      showSuccess("Solicitud creada exitosamente");
    }
  };

  useEffect(() => {
    if (isFormOpen && requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }, [isFormOpen]);

  return (
    <>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => clearSuccess()}
        />
      )}
      <main className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-4 sm:py-8 px-2 sm:px-0">
        <div className="container mx-auto max-w-8xl px-2 sm:px-4">
          <UserCard user={user} />
          <RequestHistory
            requests={requests}
            loading={loading}
            errorMessage={errorMessage}
            onCreateRequest={openRequestForm}
          />
          {user && [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role) && (
            <div className="mt-6">
              <DashboardRoleActions />
            </div>
          )}
          {isFormOpen && (
            <RequestForm
              dialogRef={dialogRef}
              onClose={closeRequestForm}
              mode="create"
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </main>
    </>
  );
}
