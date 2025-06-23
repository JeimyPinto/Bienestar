import React, { useRef, useState } from "react";
import ErrorMessage from "../ui/errorMessage";
import ServiceForm from "./serviceForm";
import { Service,ServiceTableProps } from "../types/service";
import ServiceTableDesktop from "./serviceTableDesktop";
import ServiceCardMobile from "./serviceCardMobile";

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  loading,
  setErrorMessage,
  setSuccessMessage,
  setServices,
  onEditService,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceEditFormRef = useRef<HTMLDialogElement>(null);

  // Handler para abrir el formulario de edición desde la tabla
  function handleRowClick(service: Service) {
    if (onEditService) {
      onEditService(service);
    } else {
      setSelectedService(service);
      setIsFormOpen(true);
      setTimeout(() => {
        serviceEditFormRef.current?.showModal();
      }, 0);
    }
  }

  // Handler para cerrar el formulario de edición (solo si se usa localmente)
  function handleFormClose() {
    setIsFormOpen(false);
    serviceEditFormRef.current?.close();
  }

  return (
    <section className="w-full max-w-8xl mx-auto px-2 sm:px-6 py-4 sm:py-10">
      <div className="flex flex-col gap-6">
        {/* Puedes mostrar mensajes de error globales aquí si lo deseas */}
        <ServiceTableDesktop
          services={services}
          loading={loading}
          onRowClick={handleRowClick}
        />
        <ServiceCardMobile
          services={services}
          loading={loading}
          onCardClick={handleRowClick}
        />
        {/* Si no se usa onEditService del padre, se usa el modal local */}
        {isFormOpen && selectedService && !onEditService && (
          <ServiceForm
            dialogRef={serviceEditFormRef}
            closeDialog={handleFormClose}
            onClose={handleFormClose}
            mode="edit"
            serviceToEdit={selectedService}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </div>
    </section>
  );
};

export default ServiceTable;

