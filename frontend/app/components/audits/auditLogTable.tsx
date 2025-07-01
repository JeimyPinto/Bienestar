import React, { useState } from "react"
import { AuditLogTableProps } from "../../types/auditLog"
import AuditLogTableDesktop from "./auditLogTableDesktop"
import AuditLogCardMobile from "./auditLogCardMobile"
import AuditLogTableFilterBar from "./auditLogTableFilterBar"
import { Container } from "../../ui"

export default function AuditLogTable({
    auditLogs,
    loading,
}: AuditLogTableProps) {
    const [filter, setFilter] = useState("");

    // Filtrado local por entidad, acción o usuario
    const filteredAuditLogs = filter.trim()
        ? auditLogs.filter(auditLog =>
            auditLog.entity_type.toLowerCase().includes(filter.toLowerCase()) ||
            auditLog.action.toLowerCase().includes(filter.toLowerCase()) ||
            (auditLog.changed_by?.toLowerCase().includes(filter.toLowerCase()) ?? false)
        )
        : auditLogs;

    return (
        <Container>
            <div className="flex flex-col gap-4">
                <AuditLogTableFilterBar
                    filter={filter}
                    setFilter={setFilter}
                />
                {/* Vista de escritorio */}
                <div className="hidden sm:block">
                    <AuditLogTableDesktop
                        auditLogs={filteredAuditLogs}
                        loading={loading}
                        handleRowClick={() => {}}
                    />
                </div>
                {/* Vista móvil */}
                <div className="sm:hidden flex flex-col gap-4">
                    <AuditLogCardMobile
                        auditLogs={filteredAuditLogs}
                        handleRowClick={() => {}}
                        loading={loading}
                    />
                </div>
            </div>
        </Container>
    );
}
