import React from "react";
import { AuditLog } from "../../interface/auditLog";
import Spinner from "../../ui/spinner";

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
  const getActionVariant = (action: string) => {
    switch (action) {
      case 'CREATE': return 'success';
      case 'UPDATE': return 'warning';
      case 'DELETE': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="overflow-hidden border border-azul-cielo/30 rounded-lg shadow-md bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-azul-cielo/20">
          {/* Header */}
          <thead className="bg-gradient-to-r from-primary to-azul-claro">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Entidad
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                ID Entidad
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Acción
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Datos Anteriores
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Datos Nuevos
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-azul-cielo/10">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Spinner className="w-8 h-8 text-primary" />
                    <span className="text-primary font-medium">Cargando auditorías...</span>
                  </div>
                </td>
              </tr>
            ) : auditLogs.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span className="text-6xl">📋</span>
                    <div>
                      <h3 className="text-lg font-bold text-azul-oscuro mb-2">Sin registros</h3>
                      <p className="text-azul-marino/70">No hay registros de auditoría disponibles.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              auditLogs.map((auditLog) => (
                <tr
                  key={auditLog.id}
                  className="hover:bg-gradient-to-r hover:from-azul-cielo/10 hover:to-beige-claro/20 cursor-pointer transition-all duration-300 hover:shadow-md"
                  onClick={() => handleRowClick(auditLog)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    #{auditLog.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-oscuro font-medium">
                    {auditLog.entity_type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                      {auditLog.entity_id}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      getActionVariant(auditLog.action) === 'success' ? 'bg-green-100 text-green-800' :
                      getActionVariant(auditLog.action) === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      getActionVariant(auditLog.action) === 'danger' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {auditLog.action}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-azul-marino max-w-xs">
                    {auditLog.old_data ? (
                      <details className="cursor-pointer">
                        <summary className="text-primary hover:text-azul-claro font-medium">
                          Ver datos 📤
                        </summary>
                        <pre className="mt-2 text-xs bg-neutral/20 p-2 rounded border border-neutral/30 max-h-24 overflow-auto whitespace-pre-wrap font-mono">
                          {JSON.stringify(auditLog.old_data, null, 2)}
                        </pre>
                      </details>
                    ) : (
                      <span className="italic text-azul-marino/50">Sin datos</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-azul-marino max-w-xs">
                    {auditLog.new_data ? (
                      <details className="cursor-pointer">
                        <summary className="text-info hover:text-azul-cielo font-medium">
                          Ver datos 📥
                        </summary>
                        <pre className="mt-2 text-xs bg-info/10 p-2 rounded border border-info/30 max-h-24 overflow-auto whitespace-pre-wrap font-mono">
                          {JSON.stringify(auditLog.new_data, null, 2)}
                        </pre>
                      </details>
                    ) : (
                      <span className="italic text-azul-marino/50">Sin datos</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    {auditLog.changed_by ? (
                      <div className="flex items-center gap-1">
                        <span>👤</span>
                        <span>{auditLog.changed_by}</span>
                      </div>
                    ) : (
                      <span className="italic text-azul-marino/50">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    {auditLog.changed_at ? (
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{new Date(auditLog.changed_at).toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="italic text-azul-marino/50">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
