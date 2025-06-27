import React from 'react';
import { areaColors } from '../styles/areaColors';
import { Request } from '../types/request';

interface RequestHistoryTableProps {
    requests: Request[];
    loading?: boolean;
}

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({ requests, loading = false }) => {

    const Spinner = ({ className }: { className?: string }) => (
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 ${className}`}></div>
    );

    return (
        <div className="bg-white border border-cian/30 shadow rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead className="bg-cian text-white">
                    <tr>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">#</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Servicio</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Área</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Descripción</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Estado</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Creación</th>
                        <th scope="col" className="px-2 py-3 font-semibold text-left">Actualización</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-cian/10 bg-white">
                    {loading ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-azul font-medium">
                                <Spinner className="mx-auto mb-2" />
                                Cargando solicitudes...
                            </td>
                        </tr>
                    ) : requests.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-azul font-medium">
                                No hay solicitudes.
                            </td>
                        </tr>
                    ) : (
                        requests.map((request, idx) => (
                            <tr key={request.id}>
                                <td className="px-2 py-3">{idx + 1}</td>
                                <td className="px-2 py-3">{request.service?.name || "Sin servicio"}</td>
                                <td className="px-2 py-3">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${areaColors[request.service?.area ?? "default"]}`}
                                    >
                                        {request.service?.area || "Sin área"}
                                    </span>
                                </td>
                                <td className="px-2 py-3">{request.description || "Sin descripción"}</td>
                                <td className="px-2 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {request.status ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-2 py-3">{request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}</td>
                                <td className="px-2 py-3">{request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RequestHistoryTable;