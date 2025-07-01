"use client"

import React from "react"
import UserTable from "./userTable"
import UserForm from "./userForm"
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";
import { useModal } from "../hooks/useModal";
import { useMessages } from "../hooks/useMessages";

export default function UsersPage() {
    const { token } = useAuth();

    const {
        successMessage,
        errorMessage,
        clearMessages,
        setSuccessMessage,
        setErrorMessage
    } = useMessages();

    // Hook para manejo de usuarios
    const {
        users,
        currentPage,
        limit,
        totalUsers,
        totalPages,
        loading,
        setUsers,
        setCurrentPage,
        setLimit,
        refreshUsers
    } = useUsers({
        token,
        onError: setErrorMessage
    });

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
        refreshUsers();
        setTimeout(() => {
            closeDialog();
        }, 2000);
    };

    // Handlers con limpieza de mensajes
    const handleOpenCreate = () => {
        openCreateDialog(clearMessages);
    };

    const handleEditUser = (user: typeof users[0]) => {
        openEditDialog(user, clearMessages);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-beige-claro via-white to-azul-cielo/5 py-6">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header de la página */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-azul-oscuro mb-2 flex items-center">
                                    <span className="mr-3">👥</span>
                                    Gestión de Usuarios
                                </h1>
                                <p className="text-azul-marino/70">
                                    Administra los usuarios del sistema de bienestar
                                </p>
                            </div>
                            <button
                                onClick={handleOpenCreate}
                                className="
                                    bg-success hover:bg-verde-bosque text-white 
                                    px-6 py-3 rounded-xl font-semibold transition-all duration-300
                                    hover:shadow-lg hover:scale-105 flex items-center space-x-2
                                    border border-success/30
                                "
                            >
                                <span>➕</span>
                                <span>Añadir Usuario</span>
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
                    users={users}
                    currentPage={currentPage}
                    totalUsers={totalUsers}
                    totalPages={totalPages}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    setLimit={setLimit}
                    loading={loading}
                    token={token}
                    setUsers={setUsers}
                    onEditUser={handleEditUser}
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