"use client"

import React, { useState } from "react"
import { AuditLogTable } from "../components/audits"
import { ErrorMessage, SuccessMessage } from "../../ui"
import { SectionHeader } from "../components"
import { AuditLog } from "../../types/auditLog"
import { getAll } from "../services/services/auditLog";
import { useAuth } from "../hooks/useAuth";

export default function AuditPage() {
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    React.useEffect(() => {
        const fetchAuditLogs = async () => {
            setLoading(true);
            if (!token) {
                setErrorMessage("No se pudo obtener el token de autenticación.");
                setLoading(false);
                return;
            }
            const res = await getAll(token);
            if (res.error) {
                setErrorMessage(res.message);
                setAuditLogs([]);
            } else {
                setSuccessMessage(res.message || "");
                setErrorMessage("");
                setAuditLogs(res.logs || []);
            }
            setLoading(false);
        };
        fetchAuditLogs();
    }, [token]);

    return (
        <>
            <SectionHeader
                title="Registro de Auditorías"
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
            )}
            <AuditLogTable
                auditLogs={auditLogs}
                loading={loading}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
            />
        </>
    );
}