import React, { useEffect, useState, useRef } from "react";
import { Request } from "../types/request";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import RequestForm from "./requestForm";
import { getAll } from "../services/services/request";
import { areaColors } from "../styles/areaColors";
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"

export default function RequestTable() {
  const [token, setToken] = useState<string | null>(null);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const requestEditFormRef = useRef<HTMLDialogElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Obtener token
  useEffect(() => {
    const fetchData = async () => {
      const tokenValue = getToken();
      if (tokenValue) {
        if (isTokenExpired(tokenValue)) {
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(tokenValue);
        }
      } else {
        setToken(null);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!token) return;
    const loadRequests = async () => {
      try {
        setLoading(true);
        const response = await getAll(token);
        if (response.requests) {
          setRequests(response.requests);
          setSuccessMessage("Solicitudes cargadas correctamente.");
        }
      } catch (err) {
        setErrorMessage("Error al cargar las solicitudes / Error loading requests. (" + err + ")");
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [token]);

  useEffect(() => {
    if (isFormOpen && selectedRequest && requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }, [isFormOpen, selectedRequest]);

  useEffect(() => {
    if (successMessage) setShowSuccess(true);
  }, [successMessage]);

  function handleRowClick(request: Request) {
    setSelectedRequest(request);
    setIsFormOpen(true);
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {errorMessage && (
          <ErrorMessage message={errorMessage} />
        )}
        {showSuccess && successMessage && (
          <SuccessMessage message={successMessage} duration={5000} onClose={() => setShowSuccess(false)} />
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
          {(isFormOpen && selectedRequest) && (
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
    </section >
  );
}

