import React from "react";
import { ProgramType, FichaStatus } from "../../interface/group";

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
}) => (
  <header className="flex flex-col gap-6 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-premium border border-azul-cielo/20">
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Buscador principal */}
      <div className="flex-1 relative group">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Buscar por número de ficha o nombre del programa..."
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-azul-cielo/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 shadow-sm group-hover:border-azul-claro placeholder-azul-marino/30"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl opacity-50 group-focus-within:opacity-100 transition-opacity">
          🔍
        </span>
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-neutral/10 rounded-full transition-colors"
          >
            ❌
          </button>
        )}
      </div>

      {/* Selectores de filtro */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Filtro de Tipo */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-azul-marino/60 uppercase tracking-wider ml-1">Tipo:</span>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-azul-cielo/20 rounded-xl focus:outline-none focus:border-primary transition-all cursor-pointer text-sm font-semibold text-azul-oscuro"
          >
            <option value="all">💎 Todos los tipos</option>
            <option value="tecnico">📘 Técnico</option>
            <option value="tecnologia">📙 Tecnología</option>
            <option value="complementaria">📗 Complementaria</option>
          </select>
        </div>

        {/* Filtro de Estado */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-azul-marino/60 uppercase tracking-wider">Estado:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border-2 border-azul-cielo/20 rounded-xl focus:outline-none focus:border-primary transition-all cursor-pointer text-sm font-semibold text-azul-oscuro"
          >
            <option value="all">🌈 Todos los estados</option>
            <option value="etapa lectiva">📖 Etapa Lectiva</option>
            <option value="etapa practica">🛠️ Etapa Práctica</option>
            <option value="certificados">🎓 Certificados</option>
          </select>
        </div>

        {/* Límite de página */}
        <div className="flex items-center gap-2 border-l border-azul-cielo/30 pl-4 ml-2">
          <span className="text-sm font-bold text-azul-marino/60">Ver:</span>
          <select
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
            className="px-3 py-2 bg-neutral/5 border border-azul-cielo/20 rounded-lg focus:outline-none text-sm font-bold text-azul-oscuro"
          >
            {[10, 25, 50].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  </header>
);

export default GroupTableFilterBar;
