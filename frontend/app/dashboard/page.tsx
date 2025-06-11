"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../ui/header";
import UserCard from "../users/userCard";
import DashboardAdmin from "./admin/page";
import DashboardUser from "./user/page";
import RequestForm from "../requests/requestForm";
import ErrorMessage from "../ui/errorMessage";
import { User } from "../types/user";
import { Request } from "../types/request";
import { getAll } from "../services/services/request";
import { ENABLED_ROLES } from "../lib/enabledRoles";
import { areaColors } from "../styles/areaColors";

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  useEffect(() => {
    let tokenValue: string | null = null;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const extractUserFromToken = (token: string) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
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

    setToken(tokenValue);

    if (tokenValue) {
      setUser(extractUserFromToken(tokenValue));
      setRequests(extractUserFromToken(tokenValue));
    } else {
      setUser(null);
    }
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
      <main className="container mx-auto p-6">
        <UserCard user={user} />
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Solicitudes de Remisión Pendientes
          </h2>
          <button
            className="bg-azul text-white py-2 px-4 rounded hover:bg-cian transition duration-300"
            onClick={openRequestForm}
          >
            Crear una solicitud
          </button>
          {errorMessage && (
            <div className="mt-4">
              <ErrorMessage message={errorMessage} />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {errorMessage && (
              <ErrorMessage message={errorMessage} />
            )}
            <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-cian">
                  <thead className="bg-cian text-white sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-3 text-xs font-semibold text-left">#</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Solicitante</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Servicio</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Área del servicio</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Descripción</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Estado</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Fecha de creación</th>
                      <th className="px-3 py-3 text-xs font-semibold text-left">Fecha de actualización</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cian bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan={11} className="py-10 text-center text-azul font-medium">
                          Cargando solicitudes / Loading requests...
                        </td>
                      </tr>
                    ) : requests.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="py-10 text-center text-azul font-medium">
                          No hay solicitudes / No requests found.
                        </td>
                      </tr>
                    ) : (
                      requests.map((request, idx) => (
                        <tr
                          key={request.id}
                          className="hover:bg-cian/20 hover:scale-[1.01] transition-all duration-150 cursor-pointer"
                          onClick={() => handleRowClick(request)}
                        >
                          <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                          <td className="px-3 py-4 text-sm text-gray-700">
                            {request.applicant?.firstName} {request.applicant?.lastName}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700">
                            {request.service?.name}
                          </td>
                          <td>
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-md mb-2 ${areaColors[request.service?.area ?? "default"]}`}
                            >
                              {request.service?.area || "Sin área"}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700">
                            {request.description || "Sin descripción / No description"}
                          </td>
                          <td className="px-3 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {request.status ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700">
                            {request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700">
                            {request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {user &&
              (ENABLED_ROLES.includes(user.role) ? (
                <DashboardAdmin />
              ) : (
                <DashboardUser />
              ))}
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
        </section>
      </main>
    </>
  );
}
