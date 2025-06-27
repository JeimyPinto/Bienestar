import React from 'react';
import { areaColors } from '../styles/areaColors';
import { Request } from '../types/request';

interface RequestHistoryCardProps {
    requests: Request[];
    loading?: boolean;
}

const RequestHistoryCard: React.FC<RequestHistoryCardProps> = ({ requests, loading = false }) => {

    const Spinner = ({ className }: { className?: string }) => (
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 ${className}`}></div>
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <Spinner className="mb-4" />
                <p className="text-azul font-medium">Cargando solicitudes...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-azul font-medium">No hay solicitudes.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((request, idx) => (
                <div key={request.id} className="bg-white border border-cian/30 shadow rounded-lg p-4">
                    {/* Header with request number and status */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-600">#{idx + 1}</span>
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${areaColors[request.service?.area ?? "default"]}`}
                            >
                                {request.service?.area || "Sin área"}
                            </span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${request.responseStatus === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                request.responseStatus === 'aprobada' ? 'bg-green-100 text-green-700' :
                                    request.responseStatus === 'rechazada' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                            }`}>
                            {request.responseStatus || 'Sin estado'}
                        </span>
                    </div>

                    {/* Service name */}
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold text-azul">
                            {request.service?.name || "Sin servicio"}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {request.description || "Sin descripción"}
                        </p>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                        <div className="flex justify-between">
                            <span className="font-medium">Creación:</span>
                            <span>{request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Actualización:</span>
                            <span>{request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestHistoryCard;