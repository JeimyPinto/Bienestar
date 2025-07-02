import React from "react"
import { RequestTableFilterBarProps } from "../../interface/index"


export default function RequestTableFilterBar({ filter, setFilter }: RequestTableFilterBarProps) {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 bg-white/80 p-4 rounded-lg shadow border border-cian">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="🔍 Buscar por solicitante, servicio o descripción"
          className="border border-cian rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cian min-w-[250px] w-full md:w-72 bg-white transition shadow-sm hover:border-azul placeholder-gray-400"
        />
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="ml-1 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs font-semibold transition"
            title="Limpiar filtro"
          >
            Limpiar
          </button>
        )}
      </div>
    </header>
  );
}
