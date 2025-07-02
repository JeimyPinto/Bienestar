import React from "react";
import { RemissionTableDesktopProps } from "../../interface/remission";

export default function RemissionTableDesktop({ remissions, loading, handleRowClick }: RemissionTableDesktopProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-azul bg-blanco">
      <table className="min-w-full divide-y divide-cian">
        <thead className="bg-cian text-azul">
          <tr>
            <th className="px-2 py-3 text-xs font-semibold">ID</th>
            <th className="px-2 py-3 text-xs font-semibold">Usuario remitido</th>
            <th className="px-2 py-3 text-xs font-semibold">Encargado</th>
            <th className="px-2 py-3 text-xs font-semibold">Servicio</th>
            <th className="px-2 py-3 text-xs font-semibold">Fecha inicio</th>
            <th className="px-2 py-3 text-xs font-semibold">Fecha fin</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} className="text-center py-6">Cargando...</td></tr>
          ) : remissions.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-6">No hay remisiones registradas.</td></tr>
          ) : (
            remissions.map(rem => (
              <tr key={rem.id} className="hover:bg-cian/10 cursor-pointer" onClick={() => handleRowClick(rem)}>
                <td className="px-2 py-2 text-center">{rem.id}</td>
                <td className="px-2 py-2">
                  {rem.referredUser 
                    ? `${rem.referredUser.firstName} ${rem.referredUser.lastName}`
                    : `Usuario #${rem.referredUserId}`
                  }
                </td>
                <td className="px-2 py-2">
                  {rem.assignedUser 
                    ? `${rem.assignedUser.firstName} ${rem.assignedUser.lastName}`
                    : rem.assignedUserId ? `Usuario #${rem.assignedUserId}` : "-"
                  }
                </td>
                <td className="px-2 py-2">
                  {rem.service?.name || `Servicio #${rem.serviceId}`}
                </td>
                <td className="px-2 py-2">{rem.startDate ? new Date(rem.startDate).toLocaleDateString() : "-"}</td>
                <td className="px-2 py-2">{rem.endDate ? new Date(rem.endDate).toLocaleDateString() : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
