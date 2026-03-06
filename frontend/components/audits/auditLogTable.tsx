import React, { useState } from "react"
import AuditLogTableDesktop from "./auditLogTableDesktop"
import AuditLogCardMobile from "./auditLogCardMobile"
import AuditLogTableFilterBar from "./auditLogTableFilterBar"
import { AuditLog } from "../../interface/auditLog"

interface AuditLogTableProps {
    auditLogs: AuditLog[];
    loading: boolean;
}

export default function AuditLogTable({
    auditLogs,
    loading,
}: AuditLogTableProps) {
    const [filter, setFilter] = useState("");
    const [actionFilter, setActionFilter] = useState("all");
    const [entityFilter, setEntityFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
        key: 'changed_at',
        direction: 'desc'
    });

    // Filtrado local enriquecido
    const filteredAuditLogs = auditLogs.filter(log => {
        const matchesSearch = filter.trim() === "" ||
            log.entity_type.toLowerCase().includes(filter.toLowerCase()) ||
            log.action.toLowerCase().includes(filter.toLowerCase()) ||
            (log.changed_by?.toString().toLowerCase().includes(filter.toLowerCase()) ?? false) ||
            (log.user?.firstName.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
            (log.user?.lastName.toLowerCase().includes(filter.toLowerCase()) ?? false);

        const matchesAction = actionFilter === "all" || log.action === actionFilter;
        const matchesEntity = entityFilter === "all" || log.entity_type === entityFilter;

        return matchesSearch && matchesAction && matchesEntity;
    });

    // Ordenamiento local
    const sortedAuditLogs = [...filteredAuditLogs].sort((a, b) => {
        let valA: any = a[sortConfig.key as keyof AuditLog];
        let valB: any = b[sortConfig.key as keyof AuditLog];

        // Manejo especial para fechas e IDs numéricos
        if (sortConfig.key === 'changed_at') {
            valA = a.changed_at ? new Date(a.changed_at).getTime() : 0;
            valB = b.changed_at ? new Date(b.changed_at).getTime() : 0;
        } else if (sortConfig.key === 'id') {
            valA = Number(a.id);
            valB = Number(b.id);
        }

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: string) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
                <AuditLogTableFilterBar
                    filter={filter}
                    setFilter={setFilter}
                    actionFilter={actionFilter}
                    setActionFilter={setActionFilter}
                    entityFilter={entityFilter}
                    setEntityFilter={setEntityFilter}
                />
                {/* Vista de escritorio */}
                <div className="hidden sm:block">
                    <AuditLogTableDesktop
                        auditLogs={sortedAuditLogs}
                        loading={loading}
                        handleRowClick={() => { }}
                        sortConfig={sortConfig}
                        handleSort={handleSort}
                    />
                </div>
                {/* Vista móvil */}
                <div className="sm:hidden flex flex-col gap-4">
                    <AuditLogCardMobile
                        auditLogs={sortedAuditLogs}
                        handleRowClick={() => { }}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
