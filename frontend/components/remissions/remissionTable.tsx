import React from "react";
import { Remission } from "../../interface/remission";
import { useFilter } from "../../hooks/useFilter";
import { useModal } from "../../hooks/useModal";
import RemissionForm from "./remissionForm";
import RemissionTableDesktop from "./remissionTableDesktop";
import RemissionCardMobile from "./remissionCardMobile";
import RemissionTableFilterBar from "./remissionTableFilterBar";

export interface RemissionTableProps {
  remissions: Remission[];
  setRemissions?: (remissions: Remission[]) => void;
  setSuccessMessages: (msgs: string[] | ((prev: string[]) => string[])) => void;
  loading?: boolean;
  onRemissionUpdate?: () => void;
}

export default function RemissionTable({
  remissions,
  setSuccessMessages,
  loading = false,
  onRemissionUpdate,
}: RemissionTableProps) {
  // Hook para manejo del modal de remisiones
  const { 
    dialogRef, 
    isFormOpen, 
    mode, 
    itemToEdit: selectedRemission, 
    openEditDialog, 
    closeDialog 
  } = useModal<Remission>();

  // Función de filtrado para remisiones
  const filterRemissions = (remissions: Remission[], filter: string) => {
    if (!filter.trim()) return remissions;
    
    return remissions.filter(remission => {
      const referred = remission.referredUser 
        ? `${remission.referredUser.firstName} ${remission.referredUser.lastName}`.toLowerCase() 
        : "";
      const assigned = remission.assignedUser 
        ? `${remission.assignedUser.firstName} ${remission.assignedUser.lastName}`.toLowerCase() 
        : "";
      const service = remission.service 
        ? remission.service.name.toLowerCase() 
        : "";
      
      const filterLower = filter.toLowerCase();
      return (
        referred.includes(filterLower) ||
        assigned.includes(filterLower) ||
        service.includes(filterLower)
      );
    });
  };

  // Hook de filtrado
  const { filter, setFilter, filteredItems: filteredRemissions } = useFilter({
    items: remissions,
    filterFn: filterRemissions,
    initialFilter: ""
  });

  function handleRowClick(remission: Remission) {
    openEditDialog(remission);
  }

  const handleRemissionFormClose = () => {
    closeDialog();
    if (onRemissionUpdate) onRemissionUpdate();
  };

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
              dialogRef={dialogRef}
              onClose={handleRemissionFormClose}
              mode={mode}
              remissionToEdit={selectedRemission}
              setSuccessMessages={setSuccessMessages}
            />
          )}
        </div>
      </div>
    </section>
  );
}
