import React from "react";
import { FilterProps } from "../../interface/user";

const UserTableFilterBar: React.FC<FilterProps> = ({
  limit,
  setLimit,
  setCurrentPage,
  filter,
  setFilter,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      {/* Control de cantidad por página */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-azul-oscuro flex items-center">
          <span className="mr-2">📊</span>
          Mostrar
        </span>
        <select
          value={limit}
          onChange={e => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="
            border-2 border-azul-cielo/30 rounded-lg px-3 py-2 text-sm 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
            bg-white text-azul-oscuro transition-all duration-300 hover:border-primary/50
          "
        >
          {[10, 25, 50, 100].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="text-sm text-azul-marino/70">por página</span>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-80">
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="🔍 Buscar por nombre, apellido o documento"
            className="
              w-full border-2 border-azul-cielo/30 rounded-lg px-4 py-2.5 text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
              bg-white text-azul-oscuro placeholder-azul-marino/50
              transition-all duration-300 hover:border-primary/50
              pr-12
            "
          />
          {filter && (
            <button
              onClick={() => setFilter("")}
              className="
                absolute right-3 top-1/2 transform -translate-y-1/2
                w-6 h-6 rounded-full bg-azul-marino/20 hover:bg-danger/20
                text-azul-marino hover:text-danger transition-all duration-300
                flex items-center justify-center text-xs font-bold
              "
              title="Limpiar filtro"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
        
        {filter && (
          <div className="hidden sm:flex items-center text-xs text-azul-marino/60 bg-info/10 px-3 py-2 rounded-lg border border-info/20">
            <span className="mr-1">🔍</span>
            Filtrando
          </div>
        )}
      </div>
    </div>
  </div>
);

export default UserTableFilterBar;
