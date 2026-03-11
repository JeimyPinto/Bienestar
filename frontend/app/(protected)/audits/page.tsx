"use client"

import React from "react"
import AuditLogTable from "../../../components/audits/auditLogTable"
import SuccessMessage from "../../../ui/successMessage"
import ErrorMessage from "../../../ui/errorMessage"
import SectionHeader from "../../../ui/sectionHeader"
import PageLayout from "../../../components/layout/pageLayout";
import { useAuthContext } from "../../../contexts/authContext";
import { useAudit } from "../../../hooks/useAudit";
import { useMessages } from "../../../hooks/useMessages";
import RoleGate from "../../../components/auth/RoleGate";
import { ROLES } from "../../../constants/roles";

export default function AuditPage() {
    const { token } = useAuthContext();
    const { successMessage, errorMessage, setErrorMessage, clearSuccess } = useMessages();
    const { auditLogs, loading } = useAudit({
        token,
        onError: (message) => setErrorMessage(message || "Error al cargar auditorías")
    });

    return (
        <PageLayout>
            <RoleGate allowedRoles={[ROLES.SUPERADMIN]} fallback={
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-danger/20">
                    <h2 className="text-2xl font-bold text-danger mb-4">Acceso Denegado</h2>
                    <p className="text-azul-marino/70">Solo el Superadministrador tiene acceso a los registros de auditoría.</p>
                </div>
            }>
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
            </RoleGate>
        </PageLayout>
    );
}

