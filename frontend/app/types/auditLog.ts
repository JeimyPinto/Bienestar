export interface AuditLog {
    id?: number;
    entity_type: string;
    entity_id: number;
    action: "CREATE" | "UPDATE" | "DELETE";
    old_data: Record<string, unknown> | null;
    new_data: Record<string, unknown> | null;
    changed_by: string | null;
    changed_at?: string; // ISO date string
}

export interface AuditLogTableProps {
    setSuccessMessage: (msg: string) => void;
    setErrorMessage: (msg: string) => void;
    auditLogs: AuditLog[];
    loading: boolean;
    setAuditLogs?: (logs: AuditLog[]) => void;
    onFormSuccess?: () => void;
    onEditAuditLog?: (auditLog: AuditLog) => void;
}
