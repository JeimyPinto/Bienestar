import React, { useEffect, useRef, useState } from "react";
import { Request, RequestTableProps } from "../types/index";
import RequestForm from "./requestForm";
import isTokenExpired from "../lib/isTokenExpired";
import getToken from "../lib/getToken";
import RequestTableDesktop from "./requestTableDesktop";
import RequestCardMobile from "./requestCardMobile";
import RequestTableFilterBar from "./requestTableFilterBar";

export default function RequestTable({
  requests,
  setRequests,
  setErrorMessage,
  setSuccessMessage,
  loading = false,
}: RequestTableProps) {
  const [token, setToken] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  // Obtener token solo una vez
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isFormOpen && selectedRequest && requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }, [isFormOpen, selectedRequest]);

  function handleRowClick(request: Request) {
    setSelectedRequest(request);
    setIsFormOpen(true);
  }

  // Filtrado local por solicitante, servicio o descripción
  const filteredRequests = filter.trim()
    ? requests.filter(request =>
        (request.applicant?.firstName?.toLowerCase().includes(filter.toLowerCase()) ||
         request.applicant?.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
         request.service?.name?.toLowerCase().includes(filter.toLowerCase()) ||
         request.description?.toLowerCase().includes(filter.toLowerCase()))
      )
    : requests;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <RequestTableFilterBar filter={filter} setFilter={setFilter} />
        <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <RequestTableDesktop
              requests={filteredRequests}
              loading={loading}
              handleRowClick={handleRowClick}
            />
          </div>
          {/* Mobile view */}
          <div className="block sm:hidden">
            <RequestCardMobile
              requests={filteredRequests}
              loading={loading}
              handleRowClick={handleRowClick}
            />
          </div>
          {(isFormOpen && selectedRequest) && (
            <RequestForm
              dialogRef={requestEditFormRef}
              onClose={() => setIsFormOpen(false)}
              mode="edit"
              requestToEdit={selectedRequest}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          )}
        </div>
      </div>
    </section>
  );
}

