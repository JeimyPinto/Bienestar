import React from "react";
import { Search, Eraser, Filter, CheckCircle2, LayoutGrid, X, Clock, XCircle, Activity, Palette, GraduationCap, Brain } from "lucide-react";

interface RequestTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
  responseStatusFilter: string;
  setResponseStatusFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
  onClearFilters: () => void;
}

const RequestTableFilterBar: React.FC<RequestTableFilterBarProps> = ({
  filter,
  setFilter,
  responseStatusFilter,
  setResponseStatusFilter,
  statusFilter,
  setStatusFilter,
  areaFilter,
  setAreaFilter,
  onClearFilters
}) => {
  const isFiltering = filter !== "" || responseStatusFilter !== "all" || statusFilter !== "all" || areaFilter !== "all";

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-azul-cielo/20 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Barra de búsqueda */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1">
              Búsqueda General
            </label>
            <div className="relative group">
              <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Solicitante, servicio o descripción..."
                className="
                  w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 pl-12 text-sm 
                  focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                  bg-azul-cielo/5 text-azul-oscuro placeholder-azul-marino/30
                  transition-all duration-300 group-hover:bg-white pr-10
                "
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-azul-marino/30 transition-colors group-hover:text-primary">
                <Search size={18} />
              </div>
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-azul-marino/20 hover:text-danger transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filtro por Estado de Respuesta */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <CheckCircle2 size={12} /> Estado Respuesta
            </label>
            <select
              value={responseStatusFilter}
              onChange={e => setResponseStatusFilter(e.target.value)}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="aprobada">Aprobada</option>
              <option value="rechazada">Rechazada</option>
            </select>
          </div>

          {/* Filtro por Estado de la Solicitud */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <Filter size={12} /> Estado Solicitud
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todos</option>
              <option value="activo">Activa</option>
              <option value="inactivo">Inactiva</option>
            </select>
          </div>

          {/* Filtro por Área */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <LayoutGrid size={12} /> Área
            </label>
            <select
              value={areaFilter}
              onChange={e => setAreaFilter(e.target.value)}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todas las áreas</option>
              <option value="Salud">Salud</option>
              <option value="Arte y Cultura">Arte y Cultura</option>
              <option value="Deporte y Recreación">Deporte y Recreación</option>
              <option value="Apoyo Socioeconomico y Reconocimiento a la Excelencia">Apoyo Socioeconómico</option>
              <option value="Apoyo Psicosocial">Apoyo Psicosocial</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-azul-cielo/10 pt-4">
          {/* Botón de limpiar */}
          {isFiltering && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 text-xs font-bold text-primary hover:text-azul-oscuro transition-colors bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:border-primary/30"
            >
              <Eraser size={14} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestTableFilterBar;
