"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../ui/header";
import SectionHeader from "../ui/sectionHeader";
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import GroupTable from "./groupTable";
import { getAllGroups } from "../services/services/group";
import { Group } from "../types/group";
import GroupForm from "./groupForm";
import getToken from "../lib/getToken";

export default function GroupPage() {
    const [groups, setGroups] = useState<Group[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [groupToEdit, setGroupToEdit] = useState<Group | undefined>(undefined);

    useEffect(() => {
        async function fetchGroups() {
            const token = getToken();
            const res = await getAllGroups(token || undefined);
            if (res.error) {
                setErrorMessage(res.message);
                setGroups([]);
            } else {
                setGroups(res.groups);
                setErrorMessage("");
            }
        }
        fetchGroups();
    }, []);

    function openCreateDialog() {
        setMode("create");
        setGroupToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    }
    function closeDialog() {
        setIsFormOpen(false);
        dialogRef.current?.close();
    }

    // Nueva función para recargar grupos tras crear/editar
    async function reloadGroups() {
        const token = getToken();
        const res = await getAllGroups(token || undefined);
        if (res.error) {
            setErrorMessage(res.message);
            setGroups([]);
        } else {
            setGroups(res.groups);
            setErrorMessage("");
        }
    }

    function handleFormClose() {
        setIsFormOpen(false);
        dialogRef.current?.close();
        reloadGroups(); // Recarga la tabla tras cerrar el formulario
    }

    return (
        <>
            <Header />
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
                    closeDialog={handleFormClose}
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
