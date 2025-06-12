"use client";

import { useEffect, useState, useRef } from "react";
import Header from "../ui/header";
import UserCard from "../users/userCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import RequestForm from "../requests/requestForm";
import RequestHistory from "../requests/requestHistory"
import { User } from "../types/user";
import { Request } from "../types/request";
import { ENABLED_ROLES } from "../lib/enabledRoles";
import { getById } from "../services/services/request"
import extractUserFromToken from "../lib/extractUserFromToken";

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
      let tokenValue: string | null = null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
        tokenValue = localStorage.getItem("token");
      } else {
        const cookie = document.cookie;
        tokenValue = cookie.split("; ").find((row) =>
          row.startsWith("token="))?.split("=")[1] || null;
      }

      if (tokenValue) {
        const userPayload = extractUserFromToken(tokenValue);
        setUser(userPayload);

        // Obtener todas las requests del token y hacer getById a cada una
        const requestIds = userPayload?.requests?.map((req: Request) => req.id) || []; const requestsData = await Promise.all(
          requestIds.map((id: string) => getById(Number(id), tokenValue).then(res => res.request).catch(() => null))
        );
        setRequests(requestsData.filter((req): req is Request => req !== null));
      } else {
        setUser(null);
        setRequests([]);
      }
      setLoading(false);
    };

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
              (ENABLED_ROLES.includes(user.role) ? (
                <DashboardAdmin />
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
