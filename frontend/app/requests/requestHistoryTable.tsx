import React from 'react';
import { areaColors } from '../styles/areaColors';
import { RequestHistoryTableProps } from '../types/request';

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({ requests, loading = false }) => {

    const Spinner = ({ className }: { className?: string }) => (
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-primary ${className}`}></div>
    );

    const getStatusColor = (responseStatus: string) => {
        switch (responseStatus) {
            case 'pendiente':
                return 'bg-warning/10 text-warning border border-warning/30';
            case 'aprobada':
            case 'completada':
                return 'bg-success/10 text-success border border-success/30';
            case 'rechazada':
                return 'bg-danger/10 text-danger border border-danger/30';
            default:
                return 'bg-neutral/10 text-azul-marino border border-neutral/30';
        }
    };

    return (
        <div className="bg-white border border-azul-cielo/30 shadow-lg rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gradient-corporate text-white">
                        <tr>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">#</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Solicitante</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Servicio</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Área</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Descripción</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Estado Solicitud</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Estado Respuesta</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Mensaje Respuesta</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Creado Por</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Fecha Creación</th>
                            <th scope="col" className="px-3 py-4 font-semibold text-left">Última Actualización</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-azul-cielo/20 bg-white">
                        {loading ? (
                            <tr>
                                <td colSpan={11} className="py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <Spinner className="mb-3" />
                                        <span className="text-azul-marino font-medium">Cargando solicitudes...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan={11} className="py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl mb-4 opacity-50">📋</span>
                                        <span className="text-azul-marino font-medium text-lg mb-2">No hay solicitudes</span>
                                        <span className="text-azul-marino/60 text-sm">Las solicitudes aparecerán aquí cuando se creen</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            requests.map((request, idx) => (
                                <tr key={request.id} className="hover:bg-azul-cielo/5 transition-colors duration-200">
                                    <td className="px-3 py-4 font-medium text-azul-oscuro">{idx + 1}</td>
                                    
                                    {/* Solicitante */}
                                    <td className="px-3 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-azul-oscuro">
                                                {request.applicant ? 
                                                    `${request.applicant.firstName} ${request.applicant.lastName}` : 
                                                    "Usuario eliminado"
                                                }
                                            </span>
                                            {request.applicant?.email && (
                                                <span className="text-xs text-azul-marino/60">{request.applicant.email}</span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    {/* Servicio */}
                                    <td className="px-3 py-4">
                                        <span className="font-medium text-azul-oscuro">
                                            {request.service?.name || "Sin servicio"}
                                        </span>
                                    </td>
                                    
                                    {/* Área */}
                                    <td className="px-3 py-4">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${areaColors[request.service?.area ?? "default"]}`}
                                        >
                                            {request.service?.area || "Sin área"}
                                        </span>
                                    </td>
                                    
                                    {/* Descripción */}
                                    <td className="px-3 py-4 max-w-xs">
                                        <div className="text-azul-marino truncate" title={request.description || "Sin descripción"}>
                                            {request.description || "Sin descripción"}
                                        </div>
                                    </td>
                                    
                                    {/* Estado de la solicitud */}
                                    <td className="px-3 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            request.status ? 
                                                "bg-success/10 text-success border border-success/30" : 
                                                "bg-danger/10 text-danger border border-danger/30"
                                        }`}>
                                            {request.status ? "Activa" : "Inactiva"}
                                        </span>
                                    </td>
                                    
                                    {/* Estado de respuesta */}
                                    <td className="px-3 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.responseStatus)}`}>
                                            {request.responseStatus === 'pendiente' ? '⏳ Pendiente' :
                                             request.responseStatus === 'aprobada' ? '✅ Aprobada' :
                                             request.responseStatus === 'completada' ? '🎉 Completada' :
                                             request.responseStatus === 'rechazada' ? '❌ Rechazada' :
                                             '📝 ' + (request.responseStatus || 'Sin estado')}
                                        </span>
                                    </td>
                                    
                                    {/* Mensaje de respuesta */}
                                    <td className="px-3 py-4 max-w-xs">
                                        {request.responseMessage ? (
                                            <div className="text-azul-marino text-sm truncate" title={request.responseMessage}>
                                                {request.responseMessage}
                                            </div>
                                        ) : (
                                            <span className="text-azul-marino/40 text-sm italic">Sin mensaje</span>
                                        )}
                                    </td>
                                    
                                    {/* Creado por */}
                                    <td className="px-3 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-azul-marino text-sm">
                                                {request.creator ? 
                                                    `${request.creator.firstName} ${request.creator.lastName}` : 
                                                    request.createdBy ? `Usuario ID: ${request.createdBy}` : "Sistema"
                                                }
                                            </span>
                                            {request.creator?.role && (
                                                <span className="text-xs text-azul-marino/60 capitalize">{request.creator.role}</span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    {/* Fecha de creación */}
                                    <td className="px-3 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-azul-marino text-sm">
                                                {request.createdAt ? new Date(request.createdAt).toLocaleDateString('es-ES') : "-"}
                                            </span>
                                            <span className="text-xs text-azul-marino/60">
                                                {request.createdAt ? new Date(request.createdAt).toLocaleTimeString('es-ES') : ""}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    {/* Fecha de actualización */}
                                    <td className="px-3 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-azul-marino text-sm">
                                                {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString('es-ES') : "-"}
                                            </span>
                                            <span className="text-xs text-azul-marino/60">
                                                {request.updatedAt ? new Date(request.updatedAt).toLocaleTimeString('es-ES') : ""}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestHistoryTable;