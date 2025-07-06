"use client"

import React, { useState } from "react"
import UserTable from "../../components/users/userTable"
import UserForm from "../../components/users/userForm"
import BulkUploadInstructionsModal from "../../components/users/bulkUploadInstructionsModal"
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import SectionHeader from "../../ui/sectionHeader";
import PageLayout from "../../components/layout/pageLayout";
import { useModal } from "../../hooks/useModal";
import { useMessages } from "../../hooks/useMessages";
import { useUsers } from "../../hooks/useUsers";
import { useAuthContext } from "../../contexts/authContext";

import { User } from "../../interface/user";

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
            <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-azul-oscuro mb-2 flex items-center">
                                <span className="mr-2">📂</span>
                                Carga Masiva de Usuarios
                            </h2>
                            <p className="text-sm sm:text-base text-azul-marino/70 mb-4">
                                Sube un archivo Excel con múltiples usuarios para crearlos automáticamente. 
                                Los campos requeridos son: Nombres, Apellidos, Tipo de documento, Número de documento, telefono, correo eléctrónico.
                            </p>
                            
                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleDownloadTemplate}
                                    className="
                                        bg-primary hover:bg-azul-cielo text-white 
                                        px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                                        hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                        border border-primary/30
                                    "
                                >
                                    <span>📥</span>
                                    <span>Descargar Plantilla</span>
                                </button>
                                
                                <button
                                    onClick={() => setShowInstructions(true)}
                                    className="
                                        bg-warning hover:bg-orange-600 text-white 
                                        px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                                        hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                        border border-warning/30
                                    "
                                >
                                    <span>📋</span>
                                    <span>Ver Instrucciones</span>
                                </button>
                                
                                <label className="
                                    bg-success hover:bg-verde-bosque text-white 
                                    px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                    border border-success/30 cursor-pointer
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                ">
                                    <span>📤</span>
                                    <span>{isUploading ? 'Procesando...' : 'Subir Archivo Excel'}</span>
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls"
                                        onChange={handleFileUpload}
                                        disabled={isUploading}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        
                        {/* Reporte de carga masiva */}
                        {bulkUploadReport && (
                            <div className="lg:w-80 bg-gradient-to-br from-verde-claro/10 to-success/10 p-4 rounded-xl border border-success/20">
                                <h3 className="font-bold text-azul-oscuro mb-3 flex items-center">
                                    <span className="mr-2">📊</span>
                                    Último Reporte
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-azul-marino/70">Total procesados:</span>
                                        <span className="font-semibold">{bulkUploadReport.summary.total}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-azul-marino/70">Creados:</span>
                                        <span className="font-semibold text-success">{bulkUploadReport.summary.created}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-azul-marino/70">Duplicados:</span>
                                        <span className="font-semibold text-warning">{bulkUploadReport.summary.duplicates}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-azul-marino/70">Errores:</span>
                                        <span className="font-semibold text-danger">{bulkUploadReport.summary.errors}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-success/30 pt-2 mt-2">
                                        <span className="text-azul-marino/70">Tasa de éxito:</span>
                                        <span className="font-bold text-success">{bulkUploadReport.summary.successRate}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setBulkUploadReport(null)}
                                    className="w-full mt-3 text-xs text-azul-marino/50 hover:text-azul-marino transition-colors"
                                >
                                    Ocultar reporte
                                </button>
                            </div>
                        )}
                    </div>
                </div>
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