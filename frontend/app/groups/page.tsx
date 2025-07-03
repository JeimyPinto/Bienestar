"use client";

import React from "react";
import SectionHeader from "../../ui/sectionHeader";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import GroupTable from "../../components/group/groupTable";
import { Group } from "../../interface/group";
import GroupForm from "../../components/group/groupForm";
import PageLayout from "../../components/layout/pageLayout";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGroups } from "../../hooks/useGroups";
import { useModal } from "../../hooks/useModal";
import { useMessages } from "../../hooks/useMessages";

export default function GroupPage() {
    const { token } = useAuthContext();
    const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, clearMessages } = useMessages();

    // Usar el hook useGroups para manejar el estado de grupos
    const { groups, setGroups, refreshGroups } = useGroups({
        token,
        onError: (error: string) => setErrorMessage(error)
    });

    // Hook para manejo del modal de grupos
    const { 
        dialogRef, 
        isFormOpen, 
        mode, 
        itemToEdit: groupToEdit, 
        openCreateDialog, 
        closeDialog 
    } = useModal<Group>();

    function handleFormClose() {
        closeDialog();
        refreshGroups(); // Usar el hook para refrescar
    };

    return (
        <PageLayout>
            <SectionHeader
                title="Lista de Fichas"
                buttonText="Añadir Ficha"
                onButtonClick={() => openCreateDialog(clearMessages)}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
            )}
            <GroupTable
                groups={groups}
                setGroups={setGroups}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
            />
            {isFormOpen && (
                <GroupForm
                    dialogRef={dialogRef}
                    onClose={handleFormClose}
                    mode={mode}
                    groupToEdit={groupToEdit}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </PageLayout>
    );
}
