import { useEffect, useState, useMemo } from "react";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import { Request } from "../../interface/request"
import RequestHistoryTable from "./requestHistoryTable";
import RequestHistoryCard from "./requestHistoryCard";
import RequestHistoryFilterBar from "./requestHistoryFilterBar";
import { ClipboardList, Rocket, Search } from "lucide-react";

interface RequestHistoryProps {
  requests: Request[];
  loading: boolean;
  errorMessage?: string;
  successMessage?: string;
  onCreateRequest: () => void;
}

export default function RequestHistory({
  requests,
  loading,
  errorMessage,
  successMessage,
  onCreateRequest,
}: RequestHistoryProps) {
  const [showSuccess, setShowSuccess] = useState(!!successMessage);
  const [isMobile, setIsMobile] = useState(false);

  // Estados de filtrado y ordenamiento
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [responseFilter, setResponseFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc'
  });

  // Detectar si la vista es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mostrar mensaje de éxito si existe
  useEffect(() => {
    setShowSuccess(!!successMessage);
  }, [successMessage]);

  // Lista única de áreas para el filtro
  const areas = useMemo(() => {
    const uniqueAreas = new Set<string>();
    requests.forEach(r => {
      if (r.service?.area) uniqueAreas.add(r.service.area);
    });
    return Array.from(uniqueAreas).sort();
  }, [requests]);

  // Lógica de filtrado y ordenamiento
  const filteredAndSortedRequests = useMemo(() => {
    let result = [...requests];

    // Filtrado por texto (búsqueda)
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(r =>
        (r.service?.name?.toLowerCase().includes(lowerFilter)) ||
        (r.description?.toLowerCase().includes(lowerFilter)) ||
        (r.responseMessage?.toLowerCase().includes(lowerFilter))
      );
    }

    // Filtrado por área
    if (areaFilter !== "all") {
      result = result.filter(r => r.service?.area === areaFilter);
    }

    // Filtrado por estado de respuesta
    if (responseFilter !== "all") {
      result = result.filter(r => r.responseStatus === responseFilter);
    }

    // Filtrado por estado activo/inactivo (si existiera en la UI, por ahora lo dejamos extensible)
    if (statusFilter !== "all") {
      const isActive = statusFilter === "activo";
      result = result.filter(r => r.status === isActive);
    }

    // Ordenamiento
    result.sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (sortConfig.key) {
        case 'createdAt':
          valA = new Date(a.createdAt || 0).getTime();
          valB = new Date(b.createdAt || 0).getTime();
          break;
        case 'service.name':
          valA = a.service?.name || "";
          valB = b.service?.name || "";
          break;
        case 'service.area':
          valA = a.service?.area || "";
          valB = b.service?.area || "";
          break;
        case 'responseStatus':
          valA = a.responseStatus || "";
          valB = b.responseStatus || "";
          break;
        default:
          valA = a.id || 0;
          valB = b.id || 0;
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [requests, filter, areaFilter, responseFilter, statusFilter, sortConfig]);

  return (
    <section className="bg-white shadow-lg rounded-xl md:rounded-2xl p-4 md:p-6 mt-4 md:mt-6 border border-azul-cielo/20 transition-all">
      {showSuccess && successMessage && (
        <div className="mb-4 md:mb-6">
          <SuccessMessage
            message={successMessage}
            duration={5000}
            onClose={() => setShowSuccess(false)}
          />
        </div>
      )}

      {/* Header de la sección */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-azul-oscuro flex items-center">
              <ClipboardList className="mr-2 text-primary" size={24} />
              Mis Solicitudes
            </h2>
            <p className="text-sm md:text-base text-azul-marino/70 mt-1">
              {loading ? "Cargando..." : (
                <>
                  <span className="font-semibold text-primary">{filteredAndSortedRequests.length}</span>
                  {` solicitud${filteredAndSortedRequests.length !== 1 ? 'es' : ''} encontrada${filteredAndSortedRequests.length !== 1 ? 's' : ''}`}
                  {requests.length !== filteredAndSortedRequests.length && ` (filtrado de ${requests.length})`}
                </>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-xs md:text-sm text-azul-marino/60 bg-azul-cielo/10 px-2 md:px-3 py-1 rounded-full border border-azul-cielo/20">
              {isMobile ? "Vista móvil" : "Vista escritorio"}
            </div>
          </div>
        </div>
      </div>


      {/* Barra de filtros */}
      {(requests.length > 0 || loading) && (
        <RequestHistoryFilterBar
          filter={filter}
          setFilter={setFilter}
          areaFilter={areaFilter}
          setAreaFilter={setAreaFilter}
          responseFilter={responseFilter}
          setResponseFilter={setResponseFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          areas={areas}
        />
      )}

      {/* Mensaje informativo cuando no hay solicitudes (Totalmente vacío) */}
      {!loading && !errorMessage && requests.length === 0 && (
        <div className="bg-azul-cielo/10 border border-azul-cielo/30 rounded-xl p-8 text-center animate-fade-in">
          <div className="flex flex-col items-center">
            <ClipboardList className="text-azul-marino/20 mb-4" size={80} />
            <h3 className="text-xl font-semibold text-azul-oscuro mb-2">
              No tienes solicitudes aún
            </h3>
            <p className="text-azul-marino/70 mb-6 max-w-md font-sans">
              Cuando crees tu primera solicitud de remisión, aparecerá aquí.
              Puedes empezar haciendo clic en &quot;Nueva Solicitud&quot;.
            </p>
            <button
              onClick={onCreateRequest}
              className="
                bg-primary hover:bg-azul-cielo text-white 
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                hover:shadow-lg hover:scale-105 flex items-center space-x-2
                border border-primary/20
              "
            >
              <Rocket size={20} />
              <span>Crear mi primera solicitud</span>
            </button>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay resultados después de filtrar */}
      {!loading && requests.length > 0 && filteredAndSortedRequests.length === 0 && (
        <div className="bg-white border border-azul-cielo/20 rounded-xl p-12 text-center animate-fade-in shadow-inner">
          <Search className="mx-auto text-azul-marino/20 mb-4" size={60} />
          <h3 className="text-lg font-semibold text-azul-oscuro mb-2">No se encontraron resultados</h3>
          <p className="text-azul-marino/60 text-sm mb-4">Ajusta tus filtros o busca otro término</p>
          <button
            onClick={() => {
              setFilter("");
              setAreaFilter("all");
              setResponseFilter("all");
            }}
            className="text-primary font-bold hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Mostrar tabla/cards solo si hay solicitudes o está cargando */}
      {(loading || filteredAndSortedRequests.length > 0) && (
        <div className="animate-fade-in-up">
          {isMobile ? (
            <RequestHistoryCard requests={filteredAndSortedRequests} loading={loading} />
          ) : (
            <RequestHistoryTable
              requests={filteredAndSortedRequests}
              loading={loading}
              sortConfig={sortConfig}
              onSort={(key) => {
                setSortConfig({
                  key,
                  direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
                });
              }}
            />
          )}
        </div>
      )}
    </section>
  );
}
