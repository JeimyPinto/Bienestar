import React from "react";
import { Input } from "../../ui";

interface AuditLogTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function AuditLogTableFilterBar({ filter, setFilter }: AuditLogTableFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-4">
      <div className="w-full sm:w-auto sm:min-w-[320px]">
        <Input
          type="text"
          placeholder="Buscar por entidad, acción o usuario..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          icon="🔍"
          helperText="Filtra los registros de auditoría por cualquier campo"
        />
      </div>
      
      {filter && (
        <div className="flex items-center gap-2 text-sm text-azul-marino">
          <span>📊</span>
          <span>Mostrando resultados filtrados</span>
        </div>
      )}
    </div>
  );
}
