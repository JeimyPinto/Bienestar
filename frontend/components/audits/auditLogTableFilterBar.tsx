import React from "react";

import { Search, Eraser } from "lucide-react";

interface AuditLogTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
  actionFilter: string;
  setActionFilter: (value: string) => void;
  entityFilter: string;
  setEntityFilter: (value: string) => void;
}

export default function AuditLogTableFilterBar({
  filter,
  setFilter,
  actionFilter,
  setActionFilter,
  entityFilter,
  setEntityFilter
}: AuditLogTableFilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Búsqueda General */}
        <div className="md:col-span-2">
          <label htmlFor="audit-filter" className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Búsqueda General
          </label>
          <div className="relative">
            <input
              id="audit-filter"
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="ID, Entidad, Acción o Usuario..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
          </div>
        </div>

        {/* Filtro Entidad */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Entidad
          </label>
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white"
          >
            <option value="all">Todas las entidades</option>
            <option value="User">Usuario</option>
            <option value="Service">Servicio</option>
            <option value="Group">Ficha (Grupo)</option>
            <option value="Request">Solicitud</option>
            <option value="Remission">Remisión</option>
          </select>
        </div>

        {/* Filtro Acción */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Acción
          </label>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white"
          >
            <option value="all">Todas las acciones</option>
            <option value="CREATE">CREAR (CREATE)</option>
            <option value="UPDATE">ACTUALIZAR (UPDATE)</option>
            <option value="DELETE">ELIMINAR (DELETE)</option>
          </select>
        </div>
      </div>

      {(filter || actionFilter !== "all" || entityFilter !== "all") && (
        <div className="flex justify-end mt-3 border-t pt-2 border-gray-100">
          <button
            onClick={() => {
              setFilter("");
              setActionFilter("all");
              setEntityFilter("all");
            }}
            className="text-xs font-medium text-primary hover:text-azul-claro flex items-center gap-1.5 transition-colors"
          >
            <Eraser size={14} /> Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
