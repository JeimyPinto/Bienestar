"use client";

import React, { useRef, useState } from "react";
import SectionHeader from "../../ui/sectionHeader";
import ErrorMessage from "../../ui/errorMessage";
import SuccessMessage from "../../ui/successMessage";
import GroupTable from "../../components/group/groupTable";
import { Group } from "../../interface/group";
import GroupForm from "../../components/group/groupForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGroups } from "../../hooks/useGroups";

export default function GroupPage() {
    const { token } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    // Usar el hook useGroups para manejar el estado de grupos
    const { groups, setGroups, refreshGroups } = useGroups({
        token,
        onError: (error: string) => setErrorMessage(error)
    });

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [groupToEdit, setGroupToEdit] = useState<Group | undefined>(undefined);

    function openCreateDialog() {
        setMode("create");
        setGroupToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    }

    function handleFormClose() {
        setIsFormOpen(false);
        dialogRef.current?.close();
        refreshGroups(); // Usar el hook para refrescar
    }

    return (
        <>
            <SectionHeader
                title="Lista de Fichas"
                buttonText="Añadir Ficha"
                onButtonClick={openCreateDialog}
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
        </>
    );
}
