import React from "react";

interface AuditLogTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function AuditLogTableFilterBar({ filter, setFilter }: AuditLogTableFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full mb-2">
      <input
        type="text"
        className="w-full sm:w-80 px-3 py-2 border border-cian rounded-md focus:outline-none focus:ring-2 focus:ring-cian/50 text-sm"
        placeholder="Buscar por entidad, acción o usuario..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        aria-label="Buscar auditoría"
      />
    </div>
  );
}
