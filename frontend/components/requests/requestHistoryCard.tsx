import React from 'react';
import { areaColors } from '../../styles/areaColors';
import { Request } from '../../interface/request';
import Spinner from '../../ui/spinner';

interface RequestHistoryCardProps {
    requests: Request[];
    loading?: boolean;
}

const RequestHistoryCard: React.FC<RequestHistoryCardProps> = ({ requests, loading = false }) => {

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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Spinner className="mb-4" />
                <p className="text-azul-marino font-medium">Cargando solicitudes...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex flex-col items-center">
                    <span className="text-6xl mb-4 opacity-50">📋</span>
                    <span className="text-azul-marino font-medium text-lg mb-2">No hay solicitudes</span>
                    <span className="text-azul-marino/60 text-sm">Las solicitudes aparecerán aquí cuando se creen</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 sm:space-y-4">
            {requests.map((request, idx) => (
                <div key={request.id} className="bg-gradient-card backdrop-blur-sm border border-azul-cielo/20 shadow-lg rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300">
                    {/* Header with request number and status */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                            <span className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                                #{idx + 1}
                            </span>
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${areaColors[request.service?.area ?? "default"]}`}
                            >
                                {request.service?.area || "Sin área"}
                            </span>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.responseStatus)} flex-shrink-0`}>
                            {request.responseStatus === 'pendiente' ? '⏳ Pendiente' :
                             request.responseStatus === 'aprobada' ? '✅ Aprobada' :
                             request.responseStatus === 'rechazada' ? '❌ Rechazada' :
                             '📝 ' + (request.responseStatus || 'Sin estado')}
                        </span>
                    </div>

                    {/* Solicitante */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm font-medium text-azul-marino/80">👤 Solicitante:</span>
                        </div>
                        <div className="ml-4 sm:ml-6">
                            <span className="text-sm sm:text-base text-azul-oscuro font-semibold break-words">
                                {request.applicant ? 
                                    `${request.applicant.firstName} ${request.applicant.lastName}` : 
                                    "Usuario eliminado"
                                }
                            </span>
                            {request.applicant?.email && (
                                <div className="text-xs text-azul-marino/60 break-words">{request.applicant.email}</div>
                            )}
                        </div>
                    </div>

                    {/* Service name */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm font-medium text-azul-marino/80">🛠️ Servicio:</span>
                        </div>
                        <h3 className="ml-4 sm:ml-6 text-base sm:text-lg font-semibold text-azul-oscuro break-words">
                            {request.service?.name || "Sin servicio"}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm font-medium text-azul-marino/80">📝 Descripción:</span>
                        </div>
                        <p className="ml-4 sm:ml-6 text-xs sm:text-sm text-azul-marino leading-relaxed break-words">
                            {request.description || "Sin descripción"}
                        </p>
                    </div>

                    {/* Estado de la solicitud */}
                    <div className="mb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-xs sm:text-sm font-medium text-azul-marino/80">Estado de solicitud:</span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto ${
                                request.status ? 
                                    "bg-success/10 text-success border border-success/30" : 
                                    "bg-danger/10 text-danger border border-danger/30"
                            }`}>
                                {request.status ? "Activa" : "Inactiva"}
                            </span>
                        </div>
                    </div>

                    {/* Mensaje de respuesta */}
                    {request.responseMessage && (
                        <div className="mb-3">
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="text-xs sm:text-sm font-medium text-azul-marino/80">💬 Respuesta:</span>
                            </div>
                            <div className="ml-4 sm:ml-6 bg-azul-cielo/10 border border-azul-cielo/30 rounded-lg p-2 sm:p-3">
                                <p className="text-xs sm:text-sm text-azul-marino leading-relaxed break-words">
                                    {request.responseMessage}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Creado por */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs sm:text-sm font-medium text-azul-marino/80">👨‍💼 Creado por:</span>
                        </div>
                        <div className="ml-4 sm:ml-6">
                            <span className="text-xs sm:text-sm text-azul-oscuro">
                                {request.creator ? 
                                    `${request.creator.firstName} ${request.creator.lastName}` : 
                                    request.createdBy ? `Usuario ID: ${request.createdBy}` : "Sistema"
                                }
                            </span>
                            {request.creator?.role && (
                                <div className="text-xs text-azul-marino/60 capitalize">{request.creator.role}</div>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 gap-2 text-xs text-azul-marino/60 bg-beige-claro/30 rounded-lg p-2 sm:p-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium flex items-center">
                                <span className="mr-1">📅</span>Creación:
                            </span>
                            <span className="text-right sm:text-left">{request.createdAt ? new Date(request.createdAt).toLocaleString('es-ES', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : "-"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                            <span className="font-medium flex items-center">
                                <span className="mr-1">🔄</span>Actualización:
                            </span>
                            <span className="text-right sm:text-left">{request.updatedAt ? new Date(request.updatedAt).toLocaleString('es-ES', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : "-"}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestHistoryCard;