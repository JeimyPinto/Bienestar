"use client";

import { useEffect, useState, useRef } from "react";
import UserCard from "../users/userCard";
import DashboardAdmin from "./dashboardAdmin";
import RequestForm from "../requests/requestForm";
import RequestHistory from "../requests/requestHistory";
import SuccessMessage from "../ui/successMessage";
import { Request } from "../types";
import { ROLES } from "../lib/roles";
import { useAuth } from "../hooks/useAuth";
import { getByUserId as getRequestsByUserId } from "../services/services/request";

export default function DashboardPage() {
  const { user, token, isExpired } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (token && user?.id && !isExpired) {
        // Obtener requests del usuario desde la API
        const data = await getRequestsByUserId(user.id, token);
        if(data.requests) {
          setRequests(data.requests);
          setErrorMessage("");
          setSuccessMessage(data.message);
        }else{
          setRequests([]);
          setErrorMessage(data.message);
          setSuccessMessage("");
        }
      } else {
        setRequests([]);
        setSuccessMessage("");
      }
      setLoading(false);
    }
    fetchData();
  }, [token, user, isExpired]);

  const openRequestForm = () => {
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const closeRequestForm = () => {
    setIsFormOpen(false);
    dialogRef.current?.close();
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
          onClose={() => setSuccessMessage("")}
        />
      )}
      <main className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-0">
        <div className="container mx-auto max-w-8xl px-2 sm:px-4">
          <UserCard user={user} />
          <RequestHistory
            requests={requests}
            loading={loading}
            errorMessage={errorMessage}
            successMessage={successMessage}
            onCreateRequest={openRequestForm}
          />
          {user && [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role) && (
            <div className="mt-6">
              <DashboardAdmin />
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
