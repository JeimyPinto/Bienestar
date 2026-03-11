import React from "react";
import { Request } from "../../interface/request";
import Spinner from "../../ui/spinner";
import { areaColors } from "../../styles/areaColors";
import { ClipboardList, Clock, CheckCircle2, XCircle, User as UserIcon, Calendar, Link2 } from "lucide-react";

interface RequestTableDesktopProps {
  requests: Request[];
  loading: boolean;
  handleRowClick: (request: Request) => void;
}

export default function RequestTableDesktop({
  requests,
  loading,
  handleRowClick,
}: RequestTableDesktopProps) {

  const getResponseStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-tighter">
            <Clock size={12} /> Pendiente
          </span>
        );
      case "aprobada":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-tighter">
            <CheckCircle2 size={12} /> Aprobada
          </span>
        );
      case "rechazada":
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-tighter">
            <XCircle size={12} /> Rechazada
          </span>
        );
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-tighter">{status}</span>;
    }
  };

  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-azul-cielo/20 border-collapse">
        <thead className="bg-gradient-to-r from-azul-cielo/10 to-primary/5">
          <tr>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Solicitante</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Servicio & Área</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em] max-w-xs">Descripción</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Estado Solicitud</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Estado Rpta.</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Mensaje Rpta.</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Fecha Creación</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Fecha Actualización</th>
            <th className="px-6 py-5 text-left text-[10px] font-black text-azul-oscuro uppercase tracking-[0.2em]">Creador</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-azul-cielo/10 bg-white/40 group">
          {loading ? (
            <tr>
              <td colSpan={9} className="py-20 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Spinner className="w-10 h-10 text-primary animate-spin" />
                  <span className="text-azul-oscuro/40 font-bold uppercase text-[10px] tracking-widest">Sincronizando solicitudes...</span>
                </div>
              </td>
            </tr>
          ) : requests.length === 0 ? (
            <tr>
              <td colSpan={9} className="py-20 text-center">
                <div className="flex flex-col items-center justify-center gap-4 opacity-30">
                  <ClipboardList size={60} className="text-azul-marino" />
                  <span className="text-azul-oscuro font-bold uppercase text-[10px] tracking-widest">No hay registros con estos criterios</span>
                </div>
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-azul-cielo/5 transition-all duration-300 cursor-pointer group/row"
                onClick={() => handleRowClick(request)}
              >
                <td className="px-6 py-6 border-l-4 border-transparent group-hover/row:border-primary transition-all duration-300">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-azul-oscuro group-hover/row:text-primary transition-colors">
                      {request.applicant?.firstName} {request.applicant?.lastName}
                    </span>
                    <span className="text-[10px] text-azul-marino/40 font-medium">#{request.id}</span>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="text-sm font-semibold text-azul-oscuro/80">{request.service?.name}</span>
                    <span
                      className={`px-2.5 py-0.5 text-[9px] font-black rounded-md uppercase tracking-wider shadow-sm ${areaColors[request.service?.area ?? "default"]}`}
                    >
                      {request.service?.area || "General"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6 max-w-xs">
                  <p className="text-xs text-azul-marino/60 line-clamp-2 leading-relaxed italic pr-4">
                    &quot;{request.description || "Sin descripción"}&quot;
                  </p>
                </td>

                <td className="px-6 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${request.status ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                    {request.status ? "Activa" : "Inactiva"}
                  </span>
                </td>

                <td className="px-6 py-6 font-medium text-xs text-azul-marino/60 italic max-w-[150px] truncate">
                  {getResponseStatusBadge(request.responseStatus)}
                </td>

                <td className="px-6 py-6 font-medium text-xs text-azul-marino/60 italic max-w-[150px] truncate">
                  {request.responseMessage || "-"}
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1 text-[10px] text-azul-marino/50">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-tight text-azul-oscuro/70">
                      <Calendar size={10} className="text-primary/40" /> {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1 text-[10px] text-azul-marino/50">
                    <span className="flex items-center gap-1.5 font-bold uppercase tracking-tight text-azul-oscuro/40">
                      <Clock size={10} className="text-primary/20" /> {request.updatedAt ? new Date(request.updatedAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6">
                  {request.creator ? (
                    <div className="flex items-center gap-2 group/creator">
                      <div className="w-7 h-7 rounded-full bg-azul-cielo/20 flex items-center justify-center text-primary group-hover/creator:bg-primary group-hover/creator:text-white transition-all duration-300 border border-azul-cielo/20">
                        <UserIcon size={12} />
                      </div>
                      <span className="text-[11px] font-bold text-azul-oscuro/60 group-hover/creator:text-azul-oscuro transition-colors">
                        {request.creator.firstName.split(' ')[0]} {request.creator.lastName.split(' ')[0]}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-azul-marino/30 italic">Automático</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
