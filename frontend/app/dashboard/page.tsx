"use client";

import { useEffect, useState, useRef } from "react";
import Header from "../ui/header";
import UserCard from "../users/userCard";
import DashboardAdmin from "./dashboardAdmin";
import RequestForm from "../requests/requestForm";
import RequestHistory from "../requests/requestHistory";
import SuccessMessage from "../ui/successMessage";
import { User } from "../types";
import { Request } from "../types/request";
import { ROLES } from "../lib/roles";
import isTokenExpired from "../lib/isTokenExpired";
import getUserToken from "../lib/getUserToken";
import getToken from "../lib/getToken";
import { getByUserId as getRequestsByUserId } from "../services/services/request";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
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
      const tokenValue = getToken();
      let userValue = null;
      if (tokenValue) {
        try {
          userValue = getUserToken(tokenValue);
        } catch (e) {
          userValue = null;
        }
      }
      if (tokenValue && userValue?.id) {
        if (isTokenExpired(tokenValue)) {
          localStorage.removeItem("token");
          setUser(null);
          setRequests([]);
        } else {
          setUser(userValue as User);
          // Obtener requests del usuario desde la API
          const data = await getRequestsByUserId(userValue.id, tokenValue);
          if(data.requests) {
            setRequests(data.requests);
            setErrorMessage("");
            setSuccessMessage(data.message);
          }else{
            setRequests([]);
            setErrorMessage(data.message);
            setSuccessMessage("");
          }
        }
      } else {
        setUser(null);
        setRequests([]);
        setSuccessMessage("");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

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
      <Header />
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
          <div className="mt-6">
            {user &&
              ([ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role) ? (
                <DashboardAdmin role={user.role} />
              ) : null)}
          </div>
          {isFormOpen && (
            <RequestForm
              dialogRef={dialogRef}
              closeDialog={closeRequestForm}
              onClose={closeRequestForm}
              mode="create"
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </main >
    </>
  );
}
