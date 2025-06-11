"use client";

import { useEffect, useState, useRef } from "react";
import Header from "../ui/header";
import UserCard from "../users/userCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import RequestForm from "../requests/requestForm";
import ErrorMessage from "../ui/errorMessage";
import { User } from "../types/user";
import { Request } from "../types/request";
import { ENABLED_ROLES } from "../lib/enabledRoles";
import { areaColors } from "../styles/areaColors";
import { getById } from "../services/services/request"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      let tokenValue: string | null = null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      const extractUserFromToken = (token: string) => {
        try {
          const base64Url = token.split(".")[1];
          let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          while (base64.length % 4 !== 0) {
            base64 += "=";
          }
          return JSON.parse(atob(base64));
        } catch {
          return null;
        }
      };

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
        const requestIds = userPayload?.requests?.map((req: any) => req.id) || [];
        const requestsData = await Promise.all(
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
    if (isFormOpen && selectedRequest && requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }, [isFormOpen, selectedRequest]);

  function handleRowClick(request: Request) {
    setSelectedRequest(request);
    setIsFormOpen(true);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-0">
        <div className="container mx-auto max-w-5xl px-2 sm:px-4">
          <UserCard user={user} />
          <section className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 overflow-x-auto sm:max-w-[1100px] sm:mx-auto">
            <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Historial de Solicitudes de Remisión
              </h2>
              <button
                className="bg-azul text-white py-2 px-6 rounded-lg shadow hover:bg-cian transition duration-200 font-semibold"
                onClick={openRequestForm}
              >
                + Crear solicitud
              </button>
            </div>
            {errorMessage && (
              <div className="mb-4">
                <ErrorMessage message={errorMessage} />
              </div>
            )}
            <div className="bg-white border border-cian/30 shadow rounded-lg overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-cian text-white">
                  <tr>
                    <th className="px-2 py-3 font-semibold text-left">#</th>
                    <th className="px-2 py-3 font-semibold text-left">Servicio</th>
                    <th className="px-2 py-3 font-semibold text-left">Área</th>
                    <th className="px-2 py-3 font-semibold text-left">Descripción</th>
                    <th className="px-2 py-3 font-semibold text-left">Estado</th>
                    <th className="px-2 py-3 font-semibold text-left">Creación</th>
                    <th className="px-2 py-3 font-semibold text-left">Actualización</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cian/10 bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-azul font-medium">
                        Cargando solicitudes...
                      </td>
                    </tr>
                  ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-azul font-medium">
                        No hay solicitudes.
                      </td>
                    </tr>
                  ) : (
                    requests.map((request, idx) => (
                      <tr
                        key={request.id}
                        className="hover:bg-cian/10 transition cursor-pointer"
                        onClick={() => handleRowClick(request)}
                      >
                        <td className="px-2 py-3">{idx + 1}</td>
                        <td className="px-2 py-3">{request.service?.name || "Sin servicio"}</td>
                        <td className="px-2 py-3">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${areaColors[request.service?.area ?? "default"]}`}
                          >
                            {request.service?.area || "Sin área"}
                          </span>
                        </td>
                        <td className="px-2 py-3">{request.description || "Sin descripción"}</td>
                        <td className="px-2 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {request.status ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-2 py-3">{request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}</td>
                        <td className="px-2 py-3">{request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
          </section>
        </div>
      </main>
    </>
  );
}
