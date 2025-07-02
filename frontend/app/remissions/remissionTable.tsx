import React, { useRef, useState } from "react";
import { Remission, RemissionTableProps } from "../../types/remission";
import RemissionForm from "./remissionForm";
import RemissionTableDesktop from "./remissionTableDesktop";
import RemissionCardMobile from "./remissionCardMobile";
import RemissionTableFilterBar from "./remissionTableFilterBar";

export default function RemissionTable({
  remissions,
  setSuccessMessages,
  loading = false,
  onRemissionUpdate,
}: RemissionTableProps) {
  const [selectedRemission, setSelectedRemission] = useState<Remission | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const remissionEditFormRef = useRef<HTMLDialogElement>(null);

  // Mostrar el modal cuando se selecciona una remisión
  React.useEffect(() => {
    if (isFormOpen && selectedRemission && remissionEditFormRef.current) {
      remissionEditFormRef.current.showModal();
    }
  }, [isFormOpen, selectedRemission]);

  function handleRowClick(remission: Remission) {
    setSelectedRemission(remission);
    setIsFormOpen(true);
  }

  // Filtrado local por usuario, encargado o servicio
  const filteredRemissions = filter.trim()
    ? remissions.filter(remission => {
        const referred = remission.referredUser ? `${remission.referredUser.firstName} ${remission.referredUser.lastName}`.toLowerCase() : "";
        const assigned = remission.assignedUser ? `${remission.assignedUser.firstName} ${remission.assignedUser.lastName}`.toLowerCase() : "";
        const service = remission.service ? remission.service.name.toLowerCase() : "";
        return (
          referred.includes(filter.toLowerCase()) ||
          assigned.includes(filter.toLowerCase()) ||
          service.includes(filter.toLowerCase())
        );
      })
    : remissions;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <RemissionTableFilterBar filter={filter} setFilter={setFilter} />
        <div className="bg-white border border-cian shadow-lg rounded-xl overflow-hidden">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <RemissionTableDesktop
              remissions={filteredRemissions}
              loading={loading}
              handleRowClick={handleRowClick}
            />
          </div>
          {/* Mobile view */}
          <div className="block sm:hidden">
            <RemissionCardMobile
              remissions={filteredRemissions}
              loading={loading}
              handleRowClick={handleRowClick}
            />
          </div>
          {(isFormOpen && selectedRemission) && (
            <RemissionForm
              dialogRef={remissionEditFormRef}
              onClose={() => {
                setIsFormOpen(false);
                if (onRemissionUpdate) onRemissionUpdate();
              }}
              mode="edit"
              remissionToEdit={selectedRemission}
              setSuccessMessages={setSuccessMessages}
            />
          )}
        </div>
      </div>
    </section>
  );
}

