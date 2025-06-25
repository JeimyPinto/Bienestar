import React from "react";
import { AuditLog } from "../types/auditLog";
import Spinner from "../ui/spinner";

interface AuditLogTableDesktopProps {
  auditLogs: AuditLog[];
  loading: boolean;
  handleRowClick: (auditLog: AuditLog) => void;
}

export default function AuditLogTableDesktop({
  auditLogs,
  loading,
  handleRowClick,
}: AuditLogTableDesktopProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-cian bg-blanco">
      <table className="min-w-full divide-y divide-cian">
        <thead className="bg-cian text-white">
          <tr>
            <th className="px-3 py-3 text-xs font-semibold text-left">#</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Tipo de Entidad</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">ID Entidad</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Acción</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Antes</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Después</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Modificado por</th>
            <th className="px-3 py-3 text-xs font-semibold text-left">Fecha de Cambio</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cian bg-white">
          {loading ? (
            <tr>
              <td colSpan={8} className="py-10 text-center text-azul font-medium">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Spinner className="w-8 h-8 mx-auto" />
                  <span>Cargando auditorías...</span>
                </div>
              </td>
            </tr>
          ) : auditLogs.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-10 text-center text-azul font-medium">
                No hay registros de auditoría.
              </td>
            </tr>
          ) : (
            auditLogs.map((auditLog, idx) => (
              <tr
                key={auditLog.id}
                className="hover:bg-cian/20 hover:scale-[1.01] transition-all duration-150 cursor-pointer"
                onClick={() => handleRowClick(auditLog)}
              >
                <td className="px-3 py-4 text-sm text-gray-700">{idx + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{auditLog.entity_type}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{auditLog.entity_id}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{auditLog.action}</td>
                <td className="px-3 py-4 text-xs text-gray-700 whitespace-pre-wrap max-w-xs">
                  {auditLog.old_data ? (
                    <pre className="overflow-x-auto text-xs bg-gray-50 p-2 rounded-md border border-gray-200 max-h-32">{JSON.stringify(auditLog.old_data, null, 2)}</pre>
                  ) : (
                    <span className="italic text-gray-400">-</span>
                  )}
                </td>
                <td className="px-3 py-4 text-xs text-gray-700 whitespace-pre-wrap max-w-xs">
                  {auditLog.new_data ? (
                    <pre className="overflow-x-auto text-xs bg-gray-50 p-2 rounded-md border border-gray-200 max-h-32">{JSON.stringify(auditLog.new_data, null, 2)}</pre>
                  ) : (
                    <span className="italic text-gray-400">-</span>
                  )}
                </td>
                <td className="px-3 py-4 text-sm text-gray-700">{auditLog.changed_by || "-"}</td>
                <td className="px-3 py-4 text-sm text-gray-700">{auditLog.changed_at ? new Date(auditLog.changed_at).toLocaleString() : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
