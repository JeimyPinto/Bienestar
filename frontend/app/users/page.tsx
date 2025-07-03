"use client"

import React from "react"
import UserTable from "../../components/users/userTable"
import UserForm from "../../components/users/userForm"
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import IcoBack from "../../ui/icoBack";
import { useModal } from "../../hooks/useModal";
import { useMessages } from "../../hooks/useMessages";

import { User } from "../../interface/user";

export default function UsersPage() {
    const {
        successMessage,
        errorMessage,
        clearMessages,
        setSuccessMessage,
        setErrorMessage
    } = useMessages();

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
    } = useModal();

    // Handler para éxito en UserForm
    const handleUserFormSuccess = () => {
        if (refreshUsersRef.current) {
            refreshUsersRef.current();
        }
        setTimeout(() => {
            closeDialog();
        }, 2000);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-6">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header de la página */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <IcoBack href="/dashboard" className="flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-azul-oscuro mb-1 sm:mb-2 flex items-center">
                                        <span className="mr-2 sm:mr-3">👥</span>
                                        <span className="truncate">Gestión de Usuarios</span>
                                    </h1>
                                    <p className="text-sm sm:text-base text-azul-marino/70">
                                        Administra los usuarios del sistema de bienestar
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleOpenCreate}
                                className="
                                    bg-success hover:bg-verde-bosque text-white 
                                    px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                                    border border-success/30 flex-shrink-0
                                    text-sm sm:text-base w-full sm:w-auto
                                "
                            >
                                <span>➕</span>
                                <span className="hidden xs:inline sm:hidden">Añadir</span>
                                <span className="xs:hidden sm:inline">Añadir Usuario</span>
                            </button>
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
            </div>
        </div>
    );
}