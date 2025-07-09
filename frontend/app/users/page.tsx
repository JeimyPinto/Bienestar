"use client"

import React, { useState } from "react"
import UserTable from "../../components/users/userTable"
import UserForm from "../../components/users/userForm"
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import SectionHeader from "../../ui/sectionHeader";
import PageLayout from "../../components/layout/pageLayout";
import { useModal } from "../../hooks/useModal";
import { useMessages } from "../../hooks/useMessages";
import { useUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../contexts/authContext";
import { User } from "../../interface/user";
import BulkUploadSection from "../../components/users/bulkUploadSection"
import BulkUploadInstructionsModal from "../../components/users/bulkUploadInstructionsModal"
import BulkUploadReportCard from "../../components/users/bulkUploadReportCard"

// Tipo para el reporte de carga masiva
type BulkUploadReport = {
    summary: {
        total: number;
        created: number;
        duplicates: number;
        errors: number;
        successRate: string;
    };
    details?: {
        successful: Array<{ row: number; userId: number; email: string; password: string }>;
        duplicates: Array<{ row: number; email: string; documentNumber: string }>;
        errors: Array<{ row: number; error: string; data: object }>;
    };
};

export default function UsersPage() {
    const { token } = useAuthContext();
    const [isUploading, setIsUploading] = useState(false);
    const [bulkUploadReport, setBulkUploadReport] = useState<BulkUploadReport | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);
    
    const {
        successMessage,
        errorMessage,
        clearMessages,
        setSuccessMessage,
        setErrorMessage
    } = useMessages();

    // Hook de usuarios para las funciones de carga masiva
    const { bulkUploadUsers, downloadTemplate } = useUsers({
        token,
        mode: 'paginated',
        onError: setErrorMessage
    });

    // Referencia para la función de refresh de usuarios
    const refreshUsersRef = React.useRef<(() => void) | null>(null);

    // Hook para manejo de modales
    const {
        dialogRef,
        isFormOpen,
        mode,
        itemToEdit: userToEdit,
        openCreateDialog,
        openEditDialog,
        closeDialog
    } = useModal<User>();

    // Handler para éxito en UserForm
    const handleUserFormSuccess = () => {
        if (refreshUsersRef.current) {
            refreshUsersRef.current();
        }
        setTimeout(() => {
            closeDialog();
        }, 1000);
    };

    // Handlers con limpieza de mensajes
    const handleOpenCreate = () => {
        openCreateDialog(clearMessages);
    };

    const handleEditUser = (user: User) => {
        openEditDialog(user, clearMessages);
    };

    // Callback para recibir la función de refresh
    const handleRefreshUsers = (refreshFn: () => void) => {
        refreshUsersRef.current = refreshFn;
    };

    // Funciones para carga masiva
    const handleDownloadTemplate = async () => {
        try {
            const result = await downloadTemplate();
            if (!result.error) {
                setSuccessMessage("Plantilla descargada exitosamente");
            }
        } catch {
            setErrorMessage("Error al descargar la plantilla");
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validar que sea un archivo Excel
        const allowedTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage("Por favor selecciona un archivo Excel (.xls o .xlsx)");
            return;
        }

        setIsUploading(true);
        clearMessages();

        try {
            const result = await bulkUploadUsers(file);
            
            if (!result.error && result.report) {
                setBulkUploadReport(result.report);
                setSuccessMessage(
                    `Carga masiva completada: ${result.report.summary.created} usuarios creados de ${result.report.summary.total} registros`
                );
                
                // Refresh de la tabla de usuarios
                if (refreshUsersRef.current) {
                    refreshUsersRef.current();
                }
            }
        } catch {
            setErrorMessage("Error durante la carga masiva");
        } finally {
            setIsUploading(false);
            // Limpiar el input file
            event.target.value = '';
        }
    };

    return (
        <PageLayout>
            {/* Header de la página */}
            <SectionHeader
                title="Gestión de Usuarios"
                description="Administra los usuarios del sistema de bienestar"
                icon="👥"
                backHref="/dashboard"
                buttonText="Añadir Usuario"
                buttonShortText="Añadir"
                onButtonClick={handleOpenCreate}
            />


            {/* Sección de Carga Masiva */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
            <BulkUploadSection
                isUploading={isUploading}
                onDownloadTemplate={handleDownloadTemplate}
                onFileUpload={async (event) => {
                    await handleFileUpload(event);
                    // handleFileUpload ya maneja el estado y retorna el reporte
                    // pero ahora debe retornar el reporte para que BulkUploadSection lo muestre
                    const file = event.target.files?.[0];
                    if (!file) return null;
                    const allowedTypes = [
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    ];
                    if (!allowedTypes.includes(file.type)) return null;
                    setIsUploading(true);
                    clearMessages();
                    try {
                        const result = await bulkUploadUsers(file);
                        setIsUploading(false);
                        event.target.value = '';
                        if (!result.error && result.report) {
                            setBulkUploadReport(result.report);
                            setSuccessMessage(
                                `Carga masiva completada: ${result.report.summary.created} usuarios creados de ${result.report.summary.total} registros`
                            );
                            if (refreshUsersRef.current) {
                                refreshUsersRef.current();
                            }
                            return result.report;
                        }
                    } catch {
                        setIsUploading(false);
                        setErrorMessage("Error durante la carga masiva");
                    }
                    return null;
                }}
            />
                </div>
                {/* Reporte de carga masiva */}
                {bulkUploadReport && (
                    <BulkUploadReportCard
                        report={bulkUploadReport}
                        onHide={() => setBulkUploadReport(null)}
                    />
                )}
            </div>

            {/* Mensajes */}
            {errorMessage && (
                <div className="mb-6">
                    <ErrorMessage message={errorMessage} />
                </div>
            )}
            {successMessage && (
                <div className="mb-6">
                    <SuccessMessage
                        message={successMessage}
                        onClose={() => setSuccessMessage("")}
                    />
                </div>
            )}

            {/* Tabla de usuarios */}
            <UserTable
                onEditUser={handleEditUser}
                onError={setErrorMessage}
                onRefreshUsers={handleRefreshUsers}
            />

            {/* Modal de formulario */}
            {isFormOpen && (
                <>
                    <div className="fixed inset-0 bg-azul-marino/60 backdrop-blur-md z-[90] transition-all duration-300"></div>
                    <UserForm
                        dialogRef={dialogRef}
                        onClose={handleUserFormSuccess}
                        userToEdit={userToEdit}
                        mode={mode}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </>
            )}

            {/* Modal de instrucciones para carga masiva */}
            <BulkUploadInstructionsModal
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
                onDownloadTemplate={handleDownloadTemplate}
            />
        </PageLayout>
    );
}