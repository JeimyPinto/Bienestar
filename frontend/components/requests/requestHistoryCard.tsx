import React from 'react';
import { areaColors } from '../../styles/areaColors';
import { Request } from '../../interface/request';
import Spinner from '../../ui/spinner';
import {
    User,
    Briefcase,
    FileText,
    MessageSquare,
    UserCheck,
    Calendar,
    RefreshCcw,
    Clock,
    CheckCircle2,
    XCircle,
    Check,
    X,
    Filter
} from 'lucide-react';

interface RequestHistoryCardProps {
    requests: Request[];
    loading?: boolean;
}

const RequestHistoryCard: React.FC<RequestHistoryCardProps> = ({ requests, loading = false }) => {

    const getStatusColor = (responseStatus: string) => {
        switch (responseStatus) {
            case 'pendiente':
                return 'bg-amber-100 text-amber-700 border border-amber-200';
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
                <p className="text-azul-marino/70 font-medium animate-pulse">Cargando solicitudes...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-azul-cielo/30">
                <div className="flex flex-col items-center">
                    <div className="bg-azul-cielo/5 p-4 rounded-full mb-4">
                        <FileText className="w-12 h-12 text-azul-marino/20" />
                    </div>
                    <span className="text-azul-marino font-bold text-lg mb-1">No hay solicitudes</span>
                    <span className="text-azul-marino/50 text-sm font-sans px-8">Explora más opciones o ajusta los filtros de búsqueda</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((request, idx) => (
                <div key={request.id} className="bg-white border border-azul-cielo/20 shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

                    {/* Header with request number and status */}
                    <div className="flex justify-between items-start mb-4 gap-2">
                        <div className="flex items-center space-x-2 flex-wrap">
                            <span className="bg-azul-marino/5 text-azul-marino/40 px-3 py-1 rounded-lg text-xs font-bold border border-azul-marino/5">
                                #{idx + 1}
                            </span>
                            <span
                                className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm ${areaColors[request.service?.area ?? "default"]}`}
                            >
                                {request.service?.area || "Sin área"}
                            </span>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-1.5 ${getStatusColor(request.responseStatus)}`}>
                                {request.responseStatus === 'pendiente' ? <Clock size={10} /> :
                                    request.responseStatus === 'aprobada' ? <CheckCircle2 size={10} /> :
                                        <XCircle size={10} />}
                                {request.responseStatus}
                            </span>
                        </div>
                    </div>

                    {/* Solicitante */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                            <User size={14} className="text-primary/60" />
                            <span className="text-xs font-bold text-azul-marino/50 uppercase tracking-widest">Solicitante</span>
                        </div>
                        <div className="ml-6">
                            <span className="text-base text-azul-oscuro font-bold leading-tight block">
                                {request.applicant ?
                                    `${request.applicant.firstName} ${request.applicant.lastName}` :
                                    "Usuario no registrado"
                                }
                            </span>
                            {request.applicant?.email && (
                                <div className="text-[11px] text-azul-marino/40 font-medium break-all">{request.applicant.email}</div>
                            )}
                        </div>
                    </div>

                    {/* Service name */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                            <Briefcase size={14} className="text-primary/60" />
                            <span className="text-xs font-bold text-azul-marino/50 uppercase tracking-widest">Servicio</span>
                        </div>
                        <h3 className="ml-6 text-base font-bold text-azul-oscuro leading-tight">
                            {request.service?.name || "Servicio sin nombre"}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                            <FileText size={14} className="text-primary/60" />
                            <span className="text-xs font-bold text-azul-marino/50 uppercase tracking-widest">Descripción</span>
                        </div>
                        <div className="ml-6 bg-azul-cielo/5 p-3 rounded-xl border border-azul-cielo/10">
                            <p className="text-sm text-azul-marino/80 leading-relaxed italic font-sans font-medium">
                                &quot;{request.description || "Sin descripción proporcionada..."}&quot;
                            </p>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="h-px w-full bg-azul-cielo/10 my-4" />

                    {/* Footer Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <UserCheck size={12} className="text-azul-marino/30" />
                                    <span className="text-[10px] font-bold text-azul-marino/40 uppercase">Creado por</span>
                                </div>
                                <span className="text-xs font-bold text-azul-marino/70 block ml-4">
                                    {request.creator ? `${request.creator.firstName}` : "Sistema"}
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className={`w-2 h-2 rounded-full ${request.status ? 'bg-success ripple' : 'bg-amber-400'}`} />
                                    <span className="text-[10px] font-bold text-azul-marino/40 uppercase tracking-wider">Estado App</span>
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ml-4 ${request.status ? 'text-success' : 'text-amber-600'}`}>
                                    {request.status ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 border-l border-azul-cielo/10 pl-4">
                            <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Calendar size={12} className="text-azul-marino/30" />
                                    <span className="text-[10px] font-bold text-azul-marino/40 uppercase">Fecha</span>
                                </div>
                                <div className="ml-4">
                                    <span className="text-[11px] font-bold text-azul-marino/70 block">
                                        {request.createdAt ? new Date(request.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                                    </span>
                                    <span className="text-[10px] text-azul-marino/40 font-medium block">
                                        {request.createdAt ? new Date(request.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ""}
                                    </span>
                                </div>
                            </div>
                            {request.responseMessage && (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <MessageSquare size={12} className="text-primary/40" />
                                        <span className="text-[10px] font-bold text-primary/60 uppercase">Respuesta</span>
                                    </div>
                                    <p className="text-[10px] text-azul-marino/70 ml-4 line-clamp-2 italic" title={request.responseMessage}>
                                        {request.responseMessage}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestHistoryCard;
