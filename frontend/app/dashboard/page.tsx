"use client";

import { useEffect, useState, useRef } from "react";
import Header from "../ui/header";
import UserCard from "../users/userCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import RequestForm from "../requests/requestForm";
import RequestHistory from "../requests/requestHistory"
import { User } from "../types";
import { Request } from "../types/request";
import { ROLES } from "../lib/roles";
import isTokenExpired from "../lib/isTokenExpired"
import getUserToken from "../lib/getUserToken"
import getToken from "../lib/getToken"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const tokenValue = getToken();
      const userValue = getUserToken();
      if (tokenValue) {
        if (isTokenExpired(tokenValue)) {
          localStorage.removeItem("token");
          setUser(null);
          setRequests([]);
        } else {
          setUser(userValue as User);
          setRequests(userValue?.requests || []);
        }
      } else {
        setUser(null);
        setRequests([]);
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
      <main className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-0">
        <div className="container mx-auto max-w-8xl px-2 sm:px-4">
          <UserCard user={user} />
          <RequestHistory
            requests={requests}
            loading={loading}
            errorMessage={errorMessage}
            onCreateRequest={openRequestForm}
          />
          <div className="mt-6">
            {user &&
              ([ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role) ? (
                <DashboardAdmin role={user.role} />
              ) : (
                <DashboardUser />
              ))}
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
