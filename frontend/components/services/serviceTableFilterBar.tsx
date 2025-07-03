import React from "react";

interface ServiceTableFilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const ServiceTableFilterBar: React.FC<ServiceTableFilterBarProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <label htmlFor="service-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar servicios
          </label>
          <input
            id="service-filter"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar por nombre, descripción, área o creador..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-colors"
          />
        </div>
        {filter && (
          <button
            onClick={() => setFilter("")}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceTableFilterBar;
