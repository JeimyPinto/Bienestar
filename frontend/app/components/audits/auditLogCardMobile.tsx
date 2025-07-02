import React from "react";
import { AuditLog } from "../../../interface/auditLog";

interface AuditLogCardMobileProps {
  auditLogs: AuditLog[];
  handleRowClick: (auditLog: AuditLog) => void;
  loading: boolean;
}

export default function AuditLogCardMobile({ auditLogs, handleRowClick, loading }: AuditLogCardMobileProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="p-8 border border-azul-cielo/20 bg-white rounded-lg shadow-md text-center max-w-md">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary text-sm font-medium">
            Cargando auditorías...
          </p>
        </div>
      </div>
    );
  }

  if (!auditLogs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="p-8 border border-azul-cielo/20 bg-white rounded-lg shadow-md text-center max-w-md">
          <span className="text-6xl mb-4 block">📋</span>
          <h3 className="text-xl font-bold text-azul-oscuro mb-2">Sin registros</h3>
          <p className="text-azul-marino/70">
            No hay registros de auditoría disponibles.
          </p>
        </div>
      </div>
    );
  }

  const getActionBadgeStyles = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-success/10 text-success border-success/20';
      case 'UPDATE':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'DELETE':
        return 'bg-danger/10 text-danger border-danger/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  return (
    <div className="space-y-4">
      {auditLogs.map((auditLog) => (
        <div
          key={auditLog.id}
          className="p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-azul-cielo/30 bg-white rounded-lg"
          onClick={() => handleRowClick(auditLog)}
        >
          {/* Header del card */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-primary">
              #{auditLog.id}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded border ${getActionBadgeStyles(auditLog.action)}`}>
              {auditLog.action}
            </span>
          </div>

          {/* Información principal */}
          <div className="space-y-2 text-sm text-azul-marino">
            <div className="flex items-center gap-2">
              <span className="text-azul-oscuro font-semibold">🏷️ Entidad:</span>
              <span>{auditLog.entity_type}</span>
              <span className="px-2 py-1 text-xs bg-neutral/10 text-neutral border border-neutral/20 rounded">
                ID: {auditLog.entity_id}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-azul-oscuro font-semibold">👤 Modificado por:</span>
              <span>{auditLog.changed_by || "-"}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-azul-oscuro font-semibold">📅 Fecha:</span>
              <span>{auditLog.changed_at ? new Date(auditLog.changed_at).toLocaleString() : "-"}</span>
            </div>
          </div>

          {/* Detalles de cambio */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-primary font-semibold hover:text-azul-claro transition-colors flex items-center gap-2">
              <span>🔍</span>
              Ver detalles de cambio
            </summary>
            <div className="mt-3 space-y-3">
              <div>
                <span className="text-xs font-bold text-azul-oscuro block mb-1">
                  📤 Datos anteriores:
                </span>
                {auditLog.old_data ? (
                  <pre className="text-xs bg-neutral/20 p-3 rounded-lg border border-neutral/30 max-h-32 overflow-auto whitespace-pre-wrap font-mono">
                    {JSON.stringify(auditLog.old_data, null, 2)}
                  </pre>
                ) : (
                  <span className="italic text-azul-marino/50 text-xs">Sin datos anteriores</span>
                )}
              </div>
              
              <div>
                <span className="text-xs font-bold text-azul-oscuro block mb-1">
                  📥 Datos nuevos:
                </span>
                {auditLog.new_data ? (
                  <pre className="text-xs bg-info/10 p-3 rounded-lg border border-info/30 max-h-32 overflow-auto whitespace-pre-wrap font-mono">
                    {JSON.stringify(auditLog.new_data, null, 2)}
                  </pre>
                ) : (
                  <span className="italic text-azul-marino/50 text-xs">Sin datos nuevos</span>
                )}
              </div>
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
