import React from "react";
import { RemissionCardMobileProps } from "../types/remission";



export default function RemissionCardMobile({ remissions, loading, handleRowClick }: RemissionCardMobileProps) {
    if (loading) return <div className="py-6 text-center">Cargando...</div>;
    if (remissions.length === 0) return <div className="py-6 text-center">No hay remisiones registradas.</div>;
    return (
        <div className="flex flex-col gap-4">
            {remissions.map(rem => (
                <div key={rem.id} className="bg-white border border-cian rounded-lg shadow-md p-4" onClick={() => handleRowClick(rem)}>
                    <div className="font-bold text-cian mb-1">Remisión #{rem.id}</div>
                    <div><span className="font-semibold">Usuario remitido:</span> {rem.referredUser?.name || rem.referredUserName || rem.referredUserId}</div>
                    <div><span className="font-semibold">Encargado:</span> {rem.assignedUser?.name || rem.assignedUserName || rem.assignedUserId || "-"}</div>
                    <div><span className="font-semibold">Servicio:</span> {rem.service?.name || rem.serviceName || rem.serviceId}</div>
                    <div><span className="font-semibold">Inicio:</span> {rem.startDate ? new Date(rem.startDate).toLocaleDateString() : "-"}</div>
                    <div><span className="font-semibold">Fin:</span> {rem.endDate ? new Date(rem.endDate).toLocaleDateString() : "-"}</div>
                </div>
            ))}
        </div>
    );
}
