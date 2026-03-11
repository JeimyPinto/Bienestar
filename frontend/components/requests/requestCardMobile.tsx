import React from "react";
import Spinner from "../../ui/spinner";
import { areaColors } from "../../styles/areaColors";
import { Request } from "../../interface/request";
import { Clock, CheckCircle2, XCircle, ClipboardList, LayoutGrid, Calendar, User as UserIcon } from "lucide-react";

interface RequestCardMobileProps {
  requests: Request[];
  loading: boolean;
  handleRowClick: (request: Request) => void;
}

export default function RequestCardMobile({
  requests,
  loading,
  handleRowClick,
}: RequestCardMobileProps) {

  const getResponseStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 uppercase tracking-tighter flex items-center gap-1"><Clock size={10} /> Pendiente</span>;
      case "aprobada":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-tighter flex items-center gap-1"><CheckCircle2 size={10} /> Aprobada</span>;
      case "rechazada":
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-tighter flex items-center gap-1"><XCircle size={10} /> Rechazada</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-tighter">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 px-1">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Spinner className="w-10 h-10 text-primary animate-spin" />
          <span className="text-azul-oscuro/40 font-bold uppercase text-[10px] tracking-widest text-center">Sincronizando solicitudes...</span>
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 opacity-30 text-center">
          <ClipboardList size={60} className="text-azul-marino" />
          <span className="text-azul-oscuro font-bold uppercase text-[10px] tracking-widest">No hay registros con estos criterios</span>
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="group relative bg-white/80 backdrop-blur-sm border border-azul-cielo/20 rounded-3xl shadow-lg p-5 hover:bg-white transition-all duration-300 active:scale-[0.98] overflow-hidden"
            onClick={() => handleRowClick(request)}
          >
            {/* Indicador lateral de estado */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${request.status ? "bg-emerald-500" : "bg-rose-500"}`} />

            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-azul-marino/30 uppercase tracking-widest mb-0.5">#{request.id}</span>
                <h3 className="text-sm font-bold text-azul-oscuro group-active:text-primary transition-colors leading-tight">
                  {request.applicant?.firstName} {request.applicant?.lastName}
                </h3>
              </div>
              {getResponseStatusBadge(request.responseStatus)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-azul-oscuro/70">
                  <LayoutGrid size={12} className="text-primary/50" />
                  {request.service?.name}
                </div>
                <div className="pl-5">
                  <span className={`px-2 py-0.5 text-[8px] font-black rounded-md uppercase tracking-wider shadow-sm ${areaColors[request.service?.area ?? "default"]}`}>
                    {request.service?.area || "General"}
                  </span>
                </div>
              </div>

              {request.description && (
                <div className="flex flex-col gap-1.5 bg-azul-cielo/5 p-3 rounded-2xl">
                  <span className="text-[9px] font-black text-azul-oscuro/30 uppercase tracking-widest px-1">Descripción</span>
                  <p className="text-[11px] leading-relaxed text-azul-marino/70 italic line-clamp-2 pr-4">
                    &quot;{request.description}&quot;
                  </p>
                </div>
              )}

              {request.responseMessage && (
                <div className="flex flex-col gap-1.5 bg-primary/5 p-3 rounded-2xl border border-primary/10">
                  <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest px-1">Detalle de Respuesta</span>
                  <p className="text-[11px] leading-relaxed text-azul-oscuro/70 italic">
                    {request.responseMessage}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-azul-cielo/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-azul-cielo/20 flex items-center justify-center text-primary text-[10px]">
                  <UserIcon size={10} />
                </div>
                <span className="text-[10px] font-bold text-azul-oscuro/50 tracking-tight">
                  {request.creator ? `${request.creator.firstName.split(' ')[0]} ${request.creator.lastName[0]}.` : "Sistema"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-bold text-azul-marino/40 uppercase tracking-tighter">
                <Calendar size={10} />
                {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "-"}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
