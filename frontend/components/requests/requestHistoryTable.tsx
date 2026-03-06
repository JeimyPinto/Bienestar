import React, { useState, useEffect } from 'react';
import { areaColors } from '../../styles/areaColors';
import { Request } from '../../interface/request';
import Spinner from '../../ui/spinner';
import {
    ChevronDown,
    ChevronUp,
    ArrowUpDown,
    Calendar,
    User,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Check,
    X,
    MessageSquare,
    AlertCircle,
    RotateCcw
} from 'lucide-react';

interface RequestHistoryTableProps {
    requests: Request[];
    loading?: boolean;
    sortConfig?: { key: string; direction: 'asc' | 'desc' };
    onSort?: (key: string) => void;
}

const RequestHistoryTable: React.FC<RequestHistoryTableProps> = ({
    requests,
    loading = false,
    sortConfig,
    onSort
}) => {
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
                return "bg-amber-100 text-amber-700 border border-amber-200";
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

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (!onSort || !sortConfig) return null;
        if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="ml-1.5 opacity-30 group-hover:opacity-100 transition-opacity" />;
        return sortConfig.direction === 'asc'
            ? <ChevronUp size={14} className="ml-1.5 text-white" />
            : <ChevronDown size={14} className="ml-1.5 text-white" />;
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
                <FileText className="w-12 h-12 md:w-16 md:h-16 mb-4 text-azul-marino/20" />
                <span className="text-azul-marino font-medium text-base md:text-lg mb-2">No hay solicitudes</span>
                <span className="text-azul-marino/60 text-sm md:text-base px-4 font-sans">
                    Ajusta los filtros o crea una nueva solicitud
                </span>
            </div>
        );
    }

    // Vista móvil - Delegada a RequestHistoryCard (que recibe los filtrados)
    // Pero si por alguna razón renderiza aquí, mantenemos la lógica pero con Lucide
    if (isMobile) {
        return (
            <div className="space-y-3">
                {requests.map((request, idx) => (
                    <div
                        key={request.id}
                        className="bg-white border border-azul-cielo/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-azul-marino/40 bg-azul-cielo/5 px-2 py-0.5 rounded-lg border border-azul-cielo/10">
                                #{idx + 1}
                            </span>
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${request.status ? 'bg-success/10 text-success' : 'bg-amber-100 text-amber-700'}`}>
                                    {request.status ? 'Activa' : 'Inactiva'}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(request.responseStatus)}`}>
                                    {request.responseStatus}
                                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h3 className="font-bold text-azul-oscuro text-sm mb-1">{request.service?.name || 'Servicio no disponible'}</h3>
                            <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-tight ${request.service?.area ? getAreaColorClass(request.service.area) : 'bg-gray-100 text-gray-600'}`}>
                                {request.service?.area || 'Sin área'}
                            </span>
                        </div>

                        <p className="text-azul-marino/70 text-xs line-clamp-2 mb-3 bg-azul-cielo/5 p-2 rounded-lg italic">
                            &quot;{request.description}&quot;
                        </p>

                        <div className="flex justify-between items-center text-[10px] text-azul-marino/40 border-t border-azul-cielo/10 pt-3">
                            <div className="flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(request.createdAt || '').toLocaleDateString('es-ES')}
                            </div>
                            <div className="flex items-center gap-1 font-bold">
                                <User size={10} />
                                {request.creator?.firstName || 'Usuario'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Vista desktop - Tabla
    return (
        <div className="bg-white border border-azul-cielo/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                    <thead className="bg-[#1a3a5a] text-white">
                        <tr>
                            <th className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider">#</th>
                            <th
                                className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors group"
                                onClick={() => onSort?.('creator.firstName')}
                            >
                                <div className="flex items-center">
                                    <User size={14} className="mr-2 opacity-50" />
                                    Solicitante
                                    <SortIcon columnKey="creator.firstName" />
                                </div>
                            </th>
                            <th
                                className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors group"
                                onClick={() => onSort?.('service.name')}
                            >
                                <div className="flex items-center">
                                    <RotateCcw size={14} className="mr-2 opacity-50" />
                                    Servicio
                                    <SortIcon columnKey="service.name" />
                                </div>
                            </th>
                            <th
                                className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors group"
                                onClick={() => onSort?.('service.area')}
                            >
                                <div className="flex items-center">
                                    <AlertCircle size={14} className="mr-2 opacity-50" />
                                    Área
                                    <SortIcon columnKey="service.area" />
                                </div>
                            </th>
                            <th className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider">Descripción</th>
                            <th className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider">Estado</th>
                            <th
                                className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors group"
                                onClick={() => onSort?.('responseStatus')}
                            >
                                <div className="flex items-center">
                                    <CheckCircle2 size={14} className="mr-2 opacity-50" />
                                    Respuesta
                                    <SortIcon columnKey="responseStatus" />
                                </div>
                            </th>
                            <th className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider">Detalles</th>
                            <th
                                className="px-4 py-4 font-bold text-left text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors group"
                                onClick={() => onSort?.('createdAt')}
                            >
                                <div className="flex items-center">
                                    <Calendar size={14} className="mr-2 opacity-50" />
                                    Fecha
                                    <SortIcon columnKey="createdAt" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-azul-cielo/10">
                        {requests.map((request, idx) => (
                            <tr key={request.id} className="hover:bg-azul-cielo/5 transition-colors duration-150 group">
                                <td className="px-4 py-4">
                                    <span className="text-azul-marino/30 font-bold text-xs">#{idx + 1}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-azul-oscuro font-bold">
                                            {request.creator?.firstName} {request.creator?.lastName}
                                        </span>
                                        <span className="text-[10px] text-azul-marino/50 uppercase tracking-tighter">
                                            {request.applicant?.documentNumber || 'Sin ID'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="text-azul-marino font-semibold leading-tight block">
                                        {request.service?.name || 'No disponible'}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${request.service?.area ? getAreaColorClass(request.service.area) : 'bg-gray-100 text-gray-600'}`}>
                                        {request.service?.area || 'Sin área'}
                                    </span>
                                </td>
                                <td className="px-4 py-4 max-w-xs">
                                    <p className="text-azul-marino/70 text-xs truncate max-w-[180px] font-sans italic" title={request.description}>
                                        &quot;{request.description}&quot;
                                    </p>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center">
                                        {request.status ? (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-success uppercase tracking-widest bg-success/5 px-2 py-0.5 rounded-full border border-success/20">
                                                <Check size={10} /> Activa
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                                <X size={10} /> Inactiva
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusColor(request.responseStatus)}`}>
                                        {request.responseStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-4 max-w-[150px]">
                                    {request.responseMessage ? (
                                        <div className="flex items-start gap-1.5 group/msg">
                                            <MessageSquare size={12} className="text-primary/40 mt-0.5 flex-shrink-0" />
                                            <p className="text-azul-marino/60 text-[11px] truncate" title={request.responseMessage}>
                                                {request.responseMessage}
                                            </p>
                                        </div>
                                    ) : (
                                        <span className="text-azul-marino/20 text-[10px] italic">Sin comentarios</span>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-azul-oscuro font-bold text-xs">
                                            {new Date(request.createdAt || '').toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </span>
                                        <span className="text-[10px] text-azul-marino/40">
                                            {new Date(request.createdAt || '').toLocaleTimeString('es-ES', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
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
