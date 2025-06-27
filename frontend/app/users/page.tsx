"use client"

import React from "react"
import UserTable from "./userTable"
import UserForm from "./userForm"
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import SectionHeader from "../ui/sectionHeader"
import { useAuth, useUsers, useModal, useMessages } from "../hooks";

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
        <>
            <SectionHeader
                title="Lista de Usuarios"
                buttonText="Añadir Usuario"
                onButtonClick={handleOpenCreate}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <SuccessMessage
                    message={successMessage}
                    onClose={() => setSuccessMessage("")}
                />
            )}
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
            {isFormOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[90] transition-all"></div>
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
        </>
    );
}