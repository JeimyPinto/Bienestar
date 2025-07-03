"use client"

import React from "react"
import  AuditLogTable  from "../../components/audits/auditLogTable"
import  SuccessMessage  from "../../ui/successMessage"
import  ErrorMessage  from "../../ui/errorMessage"
import  SectionHeader  from "../../ui/sectionHeader"
import { useAuth } from "../../hooks/useAuth";
import { useAudit } from "../../hooks/useAudit";
import { useMessages } from "../../hooks/useMessages";

export default function AuditPage() {
    const { token } = useAuth();
    const { successMessage, errorMessage, setErrorMessage, clearSuccess } = useMessages();
    const { auditLogs, loading } = useAudit({
        token,
        onError: (message) => setErrorMessage(message || "Error al cargar auditorías")
    });

    return (
        <>
            <SectionHeader
                title="Registro de Auditorías"
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <SuccessMessage message={successMessage} onClose={() => clearSuccess()} />
            )}
            <AuditLogTable
                auditLogs={auditLogs}
                loading={loading}
            />
        </>
    );
}