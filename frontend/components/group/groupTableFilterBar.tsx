import React from "react";
import { ProgramType, FichaStatus } from "../../interface/group";
import { Search, X, Layers, BookOpen, Eraser } from "lucide-react";

interface GroupTableFilterBarProps {
  limit: number;
  setLimit: (limit: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
}

const GroupTableFilterBar: React.FC<GroupTableFilterBarProps> = ({
  limit,
  setLimit,
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  const isFiltering = filter !== "" || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-azul-cielo/20 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                placeholder="Buscar por número de ficha o nombre del programa..."
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

          {/* Filtro por Tipo */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <BookOpen size={12} /> Tipo
            </label>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todos los tipos</option>
              <option value="tecnico">Técnico</option>
              <option value="tecnologia">Tecnología</option>
              <option value="complementaria">Complementaria</option>
            </select>
          </div>

          {/* Filtro por Estado */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <Layers size={12} /> Estado
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
              <option value="all">Todos los estados</option>
              <option value="etapa lectiva">Etapa Lectiva</option>
              <option value="etapa practica">Etapa Práctica</option>
              <option value="certificados">Certificados</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-azul-cielo/10 pt-4">
          {/* Límite de página */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest">
              Mostrar
            </span>
            <select
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
              className="px-3 py-1.5 bg-white border border-azul-cielo/20 rounded-lg text-xs font-semibold text-azul-oscuro focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {[10, 25, 50].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="text-xs text-azul-marino/60 lowercase">por página</span>
          </div>

          {/* Botón de limpiar */}
          {isFiltering && (
            <button
              onClick={() => {
                setFilter("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
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

export default GroupTableFilterBar;
