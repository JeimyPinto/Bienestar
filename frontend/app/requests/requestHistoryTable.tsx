import React, { useState, useEffect } from 'react';
import { areaColors } from '../styles/areaColors';
import { RequestHistoryTableProps } from '../types/request';
import Spinner from '../ui/spinner';

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({ requests, loading = false }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const getStatusColor = (responseStatus: "pendiente" | "aprobada" | "rechazada") => {
        switch (responseStatus) {
            case "pendiente":
                return "bg-warning/10 text-warning border border-warning/30";
            case "aprobada":
                return "bg-success/10 text-success border border-success/30";
            case "rechazada":
                return "bg-danger/10 text-danger border border-danger/30";
            default:
                return "bg-neutral/10 text-azul-marino border border-neutral/30";
        }
    };

    const getAreaColorClass = (area: string) => {
        const areaColor = areaColors[area];
        if (areaColor) {
            return areaColor;
        }
        return 'bg-gray-100 text-gray-600';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 md:py-16">
                <Spinner className="mb-4" />
                <span className="text-azul-marino font-medium text-sm md:text-base">Cargando solicitudes...</span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
                <span className="text-4xl md:text-6xl mb-4 opacity-50">📋</span>
                <span className="text-azul-marino font-medium text-base md:text-lg mb-2">No hay solicitudes</span>
                <span className="text-azul-marino/60 text-sm md:text-base px-4">
                    Las solicitudes aparecerán aquí cuando se creen
                </span>
            </div>
        );
    }

    // Vista móvil - Cards
    if (isMobile) {
        return (
            <div className="space-y-3">
                {requests.map((request) => (
                    <div 
                        key={request.id} 
                        className="bg-gradient-card border border-azul-cielo/20 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {/* Header del card */}
                        <div className="flex items-center justify-between mb-3 gap-2">
                            <div className="flex items-center space-x-2 flex-wrap">
                                <span className="text-xs font-medium text-azul-marino/60 bg-azul-cielo/10 px-2 py-1 rounded-full">
                                    #{request.id}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.responseStatus)}`}>
                                    {request.responseStatus}
                                </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${request.status ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                {request.status ? '✅ Activa' : '⏸️ Inactiva'}
                            </span>
                        </div>

                        {/* Servicio */}
                        <div className="mb-3">
                            <h3 className="font-semibold text-azul-oscuro text-sm mb-1 flex items-center break-words">
                                <span className="mr-2 flex-shrink-0">🛠️</span>
                                <span className="break-words">{request.service?.name || 'Servicio no disponible'}</span>
                            </h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${request.service?.area ? getAreaColorClass(request.service.area) : 'bg-gray-100 text-gray-600'}`}>
                                {request.service?.area || 'Sin área'}
                            </span>
                        </div>

                        {/* Descripción */}
                        <div className="mb-3">
                            <p className="text-azul-marino/80 text-sm line-clamp-3 break-words">
                                {request.description}
                            </p>
                        </div>

                        {/* Mensaje de respuesta */}
                        {request.responseMessage && (
                            <div className="mb-3 p-2 bg-azul-cielo/5 rounded-lg border border-azul-cielo/20">
                                <p className="text-xs text-azul-marino/70 mb-1 font-medium">Respuesta:</p>
                                <p className="text-sm text-azul-marino/80 break-words">{request.responseMessage}</p>
                            </div>
                        )}

                        {/* Footer del card */}
                        <div className="text-xs text-azul-marino/60 space-y-1">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className="flex-shrink-0">Creado:</span>
                                    <span className="text-right break-words">{new Date(request.createdAt || '').toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="flex-shrink-0">Por:</span>
                                    <span className="text-right break-words">{request.createdBy || 'N/A'}</span>
                                </div>
                            </div>
                            {request.updatedAt && (
                                <div className="flex justify-between">
                                    <span className="flex-shrink-0">Actualizado:</span>
                                    <span className="text-right break-words">{new Date(request.updatedAt).toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Vista desktop - Tabla
    return (
        <div className="bg-white border border-azul-cielo/30 shadow-lg rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gradient-corporate text-white">
                        <tr>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">#</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Usuario</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Servicio</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Área</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Descripción</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Estado</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Respuesta</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Mensaje</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Creado Por</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Fecha</th>
                            <th scope="col" className="px-3 lg:px-4 py-3 lg:py-4 font-semibold text-left">Actualizado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-azul-cielo/20 bg-white">
                        {requests.map((request) => (
                            <tr key={request.id} className="hover:bg-azul-cielo/5 transition-colors duration-200">
                                <td className="px-3 lg:px-4 py-3 lg:py-4 font-medium text-azul-oscuro">
                                    #{request.id}
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <div className="flex items-center">
                                        <span className="text-azul-marino font-medium break-words">
                                            {request.creator?.firstName} {request.creator?.lastName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <div>
                                        <span className="text-azul-oscuro font-medium break-words">
                                            {request.service?.name || 'No disponible'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${request.service?.area ? getAreaColorClass(request.service.area) : 'bg-gray-100 text-gray-600'}`}>
                                        {request.service?.area || 'Sin área'}
                                    </span>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4 max-w-xs">
                                    <p className="text-azul-marino/80 truncate break-words" title={request.description}>
                                        {request.description}
                                    </p>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${request.status ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                                        {request.status ? '✅ Activa' : '⏸️ Inactiva'}
                                    </span>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.responseStatus)}`}>
                                        {request.responseStatus}
                                    </span>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4 max-w-xs">
                                    {request.responseMessage ? (
                                        <p className="text-azul-marino/80 truncate break-words" title={request.responseMessage}>
                                            {request.responseMessage}
                                        </p>
                                    ) : (
                                        <span className="text-azul-marino/40 text-xs">Sin respuesta</span>
                                    )}
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className="text-azul-marino/70 text-xs break-words">
                                        {request.createdBy || 'N/A'}
                                    </span>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className="text-azul-marino/70 text-xs break-words">
                                        {new Date(request.createdAt || '').toLocaleDateString('es-ES', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                </td>
                                <td className="px-3 lg:px-4 py-3 lg:py-4">
                                    <span className="text-azul-marino/70 text-xs break-words">
                                        {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString('es-ES', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        }) : 'N/A'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestHistoryTable;
