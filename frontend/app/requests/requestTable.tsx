import React, { useEffect, useState, useRef } from "react";
import { Request } from "../types/request"
import ErrorMessage from "../ui/errorMessage";
import RequestForm from "./requestForm"
import { getAll } from "../services/services/request"
import { areaColors } from "../lib/areaColors";

export default function RequestPage() {
  const [token, setToken] = useState<string | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let tokenValue: string | null = null;
    if (
      process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
      process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
    ) {
      tokenValue = localStorage.getItem("token");
    } else {
      const cookie = document.cookie;
      tokenValue =
        cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1] || null;
    }
    if (tokenValue) setToken(tokenValue);
  }, []);


  useEffect(() => {
    if (!token) {
      setError("No authentication token found / No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }
    const loadRequests = async () => {
      try {
        setLoading(true);
        const response = await getAll(token);
        if (response.error) {
          setError(response.message || "Error al cargar las solicitudes / Error loading requests.");
          return;
        }
        setRequests(response.requests);
      } catch (err) {
        setError("Error al cargar las solicitudes / Error loading requests. (" + err + ")");
      }
      setLoading(false);
    };
    loadRequests();
  }, [token]);

  function handleRowClick(request: Request) {
    setSelectedRequest(request);
    setIsFormOpen(true);
    if (requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {error && <ErrorMessage message={error} />}
        <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cian">
              <thead className="bg-cian text-white sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-3 text-xs font-semibold text-left">#</th>
                  <th className="px-3 py-3 text-xs font-semibold text-left">Solicitante</th>
                  <th className="px-3 py-3 text-xs font-semibold text-left">Servicio</th>
                  <th className="px-3 py-3 text-xs font-semibold text-left">Descripción</th>
                  <th className="px-3 py-3 text-xs font-semibold text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cian bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-azul font-medium">
                      Cargando solicitudes / Loading requests...
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-azul font-medium">
                      No hay solicitudes / No requests found.
                    </td>
                  </tr>
                ) : (
                  requests.map((request, idx) => (
                    <tr
                      key={request.id}
                      className="hover:bg-cian/10 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(request)}
                    >
                      <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        {request.userId}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        {request.serviceId}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        {request.description || "Sin descripción / No description"}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        {request.status ? "Activo / Active" : "Inactivo / Inactive"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {isFormOpen && selectedRequest && (
            <RequestForm
              dialogRef={requestEditFormRef}
              closeDialog={() => setIsFormOpen(false)}
              onClose={() => setIsFormOpen(false)}
              mode="edit"
              requestToEdit={selectedRequest}
            />
          )}
        </div>
      </div>
    </section>
  );
};

