import React from "react";

interface AuditLogTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function AuditLogTableFilterBar({ filter, setFilter }: AuditLogTableFilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <label htmlFor="audit-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar registros de auditoría
          </label>
          <div className="relative">
            <input
              id="audit-filter"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por entidad, acción o usuario..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-colors"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Filtra los registros de auditoría por cualquier campo
          </p>
        </div>
        
        {filter && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setFilter("")}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Limpiar
            </button>
            <div className="flex items-center gap-2 text-sm text-azul-marino">
              <span>📊</span>
              <span>Resultados filtrados</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
