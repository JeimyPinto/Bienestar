import React from "react";
import { AuditLog } from "../../interface/auditLog";
import Spinner from "../../ui/spinner";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  User as UserIcon,
  Calendar,
  ExternalLink,
  Download,
  ClipboardList
} from "lucide-react";

interface AuditLogTableDesktopProps {
  auditLogs: AuditLog[];
  loading: boolean;
  handleRowClick: (auditLog: AuditLog) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  handleSort: (key: string) => void;
}

export default function AuditLogTableDesktop({
  auditLogs,
  loading,
  handleRowClick,
  sortConfig,
  handleSort,
}: AuditLogTableDesktopProps) {
  const getActionVariant = (action: string) => {
    switch (action) {
      case 'CREATE': return 'success';
      case 'UPDATE': return 'warning';
      case 'DELETE': return 'danger';
      default: return 'info';
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return <ChevronsUpDown size={14} className="ml-1 opacity-40" />;
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={14} className="ml-1 text-white" />
      : <ChevronDown size={14} className="ml-1 text-white" />;
  };

  return (
    <div className="overflow-hidden border border-azul-cielo/30 rounded-lg shadow-md bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-azul-cielo/20">
          {/* Header */}
          <thead className="bg-gradient-to-r from-primary to-azul-claro">
            <tr>
              <th
                className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID <SortIcon column="id" />
                </div>
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
              <th
                className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('changed_at')}
              >
                <div className="flex items-center">
                  Fecha <SortIcon column="changed_at" />
                </div>
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
                    <ClipboardList size={48} className="text-gray-300" />
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
                  className="hover:bg-gradient-to-r hover:from-azul-cielo/5 hover:to-beige-claro/10 cursor-pointer transition-all duration-300"
                  onClick={() => handleRowClick(auditLog)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    #{auditLog.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-oscuro font-medium">
                    {auditLog.entity_type}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded border border-gray-200 font-mono">
                      {auditLog.entity_id}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getActionVariant(auditLog.action) === 'success' ? 'bg-green-100 text-green-800' :
                        getActionVariant(auditLog.action) === 'warning' ? 'bg-orange-100 text-orange-800' :
                          getActionVariant(auditLog.action) === 'danger' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                      }`}>
                      {auditLog.action}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-azul-marino max-w-xs">
                    {auditLog.old_data ? (
                      <details className="cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                        <summary className="text-primary hover:text-azul-claro font-medium list-none flex items-center gap-1.5 transition-colors">
                          Ver datos <ExternalLink size={12} className="group-open:rotate-180 transition-transform" />
                        </summary>
                        <pre className="mt-2 text-[10px] bg-neutral/10 p-2 rounded border border-neutral/20 max-h-32 overflow-auto whitespace-pre-wrap font-mono">
                          {JSON.stringify(auditLog.old_data, null, 2)}
                        </pre>
                      </details>
                    ) : (
                      <span className="italic text-azul-marino/30">Sin datos</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-azul-marino max-w-xs">
                    {auditLog.new_data ? (
                      <details className="cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                        <summary className="text-info hover:text-azul-cielo font-medium list-none flex items-center gap-1.5 transition-colors">
                          Ver datos <Download size={12} className="group-open:rotate-180 transition-transform" />
                        </summary>
                        <pre className="mt-2 text-[10px] bg-info/5 p-2 rounded border border-info/20 max-h-32 overflow-auto whitespace-pre-wrap font-mono">
                          {JSON.stringify(auditLog.new_data, null, 2)}
                        </pre>
                      </details>
                    ) : (
                      <span className="italic text-azul-marino/30">Sin datos</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    <div className="flex flex-col">
                      {auditLog.user ? (
                        <>
                          <span className="font-bold text-azul-oscuro flex items-center gap-1">
                            <UserIcon size={14} className="text-azul-claro" />
                            {auditLog.user.firstName} {auditLog.user.lastName}
                          </span>
                          <span className="text-xs text-gray-400 ml-5">ID: {auditLog.changed_by}</span>
                        </>
                      ) : auditLog.changed_by ? (
                        <div className="flex items-center gap-1.5">
                          <UserIcon size={14} className="text-gray-400" />
                          <span>ID: {auditLog.changed_by}</span>
                        </div>
                      ) : (
                        <span className="italic text-azul-marino/40">Sistema</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-azul-marino">
                    {auditLog.changed_at ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-azul-oscuro flex items-center gap-1">
                          <Calendar size={14} className="text-azul-claro" />
                          {new Date(auditLog.changed_at).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] text-gray-400 ml-5">{new Date(auditLog.changed_at).toLocaleTimeString()}</span>
                      </div>
                    ) : (
                      <span className="italic text-azul-marino/40">-</span>
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
