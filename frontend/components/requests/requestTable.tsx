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
        </div>
      </div>
    </section>
  );
}
