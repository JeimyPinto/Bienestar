import React, { useRef, useState } from "react";
import { Request } from "../../interface/request";
import RequestTableDesktop from "./requestTableDesktop";
import RequestCardMobile from "./requestCardMobile";
import RequestTableFilterBar from "./requestTableFilterBar";

interface RequestTableProps {
  requests: Request[];
  setErrorMessage: (msg: string) => void;
  setSuccessMessage: (msg: string) => void;
  loading?: boolean;
  onRequestUpdate?: () => void;
}

export default function RequestTable({
  requests,
  loading = false,
}: RequestTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [responseStatusFilter, setResponseStatusFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const requestEditFormRef = useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (isFormOpen && selectedRequest && requestEditFormRef.current) {
      requestEditFormRef.current.showModal();
    }
  }, [isFormOpen, selectedRequest]);

  function handleRowClick(request: Request) {
    setSelectedRequest(request);
    setIsFormOpen(true);
  }

  const handleClearFilters = () => {
    setFilter("");
    setResponseStatusFilter("all");
    setStatusFilter("all");
    setAreaFilter("all");
  };

  const filteredRequests = React.useMemo(() => {
    return requests.filter(request => {
      // Filtro de búsqueda general
      const searchTerm = filter.toLowerCase().trim();
      const matchesSearch = !searchTerm || (
        request.applicant?.firstName?.toLowerCase().includes(searchTerm) ||
        request.applicant?.lastName?.toLowerCase().includes(searchTerm) ||
        request.service?.name?.toLowerCase().includes(searchTerm) ||
        request.description?.toLowerCase().includes(searchTerm)
      );

      // Filtro de estado de respuesta
      const matchesResponseStatus = responseStatusFilter === "all" || request.responseStatus === responseStatusFilter;

      // Filtro de estado de la solicitud (Activo/Inactivo)
      const matchesStatus = statusFilter === "all" || (statusFilter === "activo" ? request.status === true : request.status === false);

      // Filtro de área del servicio
      const matchesArea = areaFilter === "all" || request.service?.area === areaFilter;

      return matchesSearch && matchesResponseStatus && matchesStatus && matchesArea;
    });
  }, [requests, filter, responseStatusFilter, statusFilter, areaFilter]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto py-2">
      <RequestTableFilterBar
        filter={filter}
        setFilter={setFilter}
        responseStatusFilter={responseStatusFilter}
        setResponseStatusFilter={setResponseStatusFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        areaFilter={areaFilter}
        setAreaFilter={setAreaFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="bg-white/70 backdrop-blur-md border border-azul-claro/20 shadow-premium rounded-[2.5rem] overflow-hidden transition-all duration-500">
        {/* Desktop view */}
        <div className="hidden lg:block">
          <RequestTableDesktop
            requests={filteredRequests}
            loading={loading}
            handleRowClick={handleRowClick}
          />
        </div>
        {/* Mobile view */}
        <div className="lg:hidden">
          <RequestCardMobile
            requests={filteredRequests}
            loading={loading}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}
