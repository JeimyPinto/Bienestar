import React from "react";
import { Service } from "../../interface/service";
import { useFilter } from "../../hooks/useFilter";
import { useServiceColumnSorter } from "../../lib/useServiceColumnSorter";
import ServiceTableDesktop from "./serviceTableDesktop";
import ServiceCardMobile from "./serviceCardMobile";
import ServiceTableFilterBar from "./serviceTableFilterBar";

interface ServiceTableProps {
  services: Service[];
  loading: boolean;
  setErrorMessage?: (msg: string) => void;
  setSuccessMessage?: (msg: string) => void;
  setServices?: (services: Service[]) => void;
  onServiceUpdate?: () => void;
  onEditService?: (service: Service) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  loading,
  onEditService,
}) => {
  // Hook para filtrado de servicios
  const { filter, setFilter, filteredItems: filteredServices } = useFilter({
    items: services,
    filterFn: (services, filter) => {
      if (!filter || !filter.trim()) {
        return services;
      }
      
      const searchTerm = filter.toLowerCase().trim();
      
      return services.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        (service.description && service.description.toLowerCase().includes(searchTerm)) ||
        (service.area && service.area.toLowerCase().includes(searchTerm)) ||
        (service.creator && 
          `${service.creator.firstName} ${service.creator.lastName || ""}`.toLowerCase().includes(searchTerm)
        )
      );
    }
  });

  // Hook para sorting de servicios
  const { sortedData: sortedFilteredServices, handleSort, sortColumn, sortOrder } = 
    useServiceColumnSorter(filteredServices, "name");

  // Handler para abrir el formulario de edición desde la tabla
  function handleRowClick(service: Service) {
    if (onEditService) {
      onEditService(service);
    }
  }

  return (
    <section className="w-full max-w-full mx-auto">
      <div className="flex flex-col gap-6">
        {/* Barra de filtros */}
        <ServiceTableFilterBar
          filter={filter}
          setFilter={setFilter}
        />
        
        {/* Vista de escritorio */}
        <div className="hidden lg:block">
          <ServiceTableDesktop
            services={sortedFilteredServices}
            loading={loading}
            onRowClick={handleRowClick}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        </div>
        
        {/* Vista móvil/tablet */}
        <div className="lg:hidden">
          <ServiceCardMobile
            services={sortedFilteredServices}
            loading={loading}
            onCardClick={handleRowClick}
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceTable;

