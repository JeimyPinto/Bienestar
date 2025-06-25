import React from "react";
import { AuditLog } from "../types/auditLog";
import Spinner from "../ui/spinner";

interface AuditLogCardMobileProps {
  auditLogs: AuditLog[];
  handleRowClick: (auditLog: AuditLog) => void;
  loading: boolean;
}

export default function AuditLogCardMobile({ auditLogs, handleRowClick, loading }: AuditLogCardMobileProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Spinner className="w-8 h-8 mb-2" />
        <span className="text-azul font-medium">Cargando auditorías...</span>
      </div>
    );
  }
  if (!auditLogs.length) {
    return (
      <div className="text-center text-azul font-medium py-10">
        No hay registros de auditoría.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {auditLogs.map((auditLog) => (
        <div
          key={auditLog.id}
          className="rounded-lg border border-cian bg-white shadow-md p-4 cursor-pointer hover:bg-cian/10 transition-all"
          onClick={() => handleRowClick(auditLog)}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-cian">#{auditLog.id}</span>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-cian/10 text-cian border border-cian/20">
              {auditLog.action}
            </span>
          </div>
          <div className="mb-1 text-sm">
            <span className="font-semibold">Entidad:</span> {auditLog.entity_type} (ID: {auditLog.entity_id})
          </div>
          <div className="mb-1 text-sm">
            <span className="font-semibold">Modificado por:</span> {auditLog.changed_by || "-"}
          </div>
          <div className="mb-1 text-sm">
            <span className="font-semibold">Fecha de cambio:</span> {auditLog.changed_at ? new Date(auditLog.changed_at).toLocaleString() : "-"}
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-cian font-semibold">Ver detalles de cambio</summary>
            <div className="mt-2">
              <div className="mb-1 text-xs">
                <span className="font-semibold">Antes:</span>
                {auditLog.old_data ? (
                  <pre className="overflow-x-auto text-xs bg-gray-50 p-2 rounded-md border border-gray-200 max-h-32 whitespace-pre-wrap">{JSON.stringify(auditLog.old_data, null, 2)}</pre>
                ) : (
                  <span className="italic text-gray-400 ml-2">-</span>
                )}
              </div>
              <div className="mb-1 text-xs">
                <span className="font-semibold">Después:</span>
                {auditLog.new_data ? (
                  <pre className="overflow-x-auto text-xs bg-gray-50 p-2 rounded-md border border-gray-200 max-h-32 whitespace-pre-wrap">{JSON.stringify(auditLog.new_data, null, 2)}</pre>
                ) : (
                  <span className="italic text-gray-400 ml-2">-</span>
                )}
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
