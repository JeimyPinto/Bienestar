"use client"

import React, { useState, useRef } from "react"
import Header from "../ui/header"
import UserTable from "./userTable"
import UserForm from "./userForm"
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import SectionHeader from "../ui/sectionHeader"
import { User } from "../types"
import { getAll as getAllUsers } from "../services/services/user";

export default function UsersPage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const openCreateDialog = () => {
        setMode("create");
        setUserToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = () => {
        setIsFormOpen(false);
        dialogRef.current?.close();
    };

    // Cargar usuarios
    const fetchUsers = async () => {
        setLoading(true);
        const res = await getAllUsers();
        if (!res.error) {
            setUsers(res.users);
            setTotalUsers(res.totalUsers || res.users.length);
            setTotalPages(res.totalPages || 1);
        }
        setLoading(false);
    };

    // Cargar usuarios al montar
    React.useEffect(() => {
        fetchUsers();
    }, []);

    // Handler para éxito en UserForm
    const handleUserFormSuccess = () => {
        fetchUsers();
        closeDialog();
    };

    return (
        <>
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[90] transition-all"></div>
            )}
            <Header />
            <SectionHeader
                title="Lista de Usuarios"
                buttonText="Añadir Usuario"
                onButtonClick={openCreateDialog}
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
            )}
            <UserTable 
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
                users={users}
                currentPage={currentPage}
                totalUsers={totalUsers}
                totalPages={totalPages}
                limit={limit}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
                token={null}
                setUsers={setUsers}
                loading={loading}
            />
            {isFormOpen && (
                <UserForm
                    dialogRef={dialogRef}
                    onClose={handleUserFormSuccess}
                    mode={mode}
                    userToEdit={userToEdit}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </>
    );
}