"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import UserTable from "./userTable"
import UserForm from "./userForm"
import ErrorMessage from "../ui/errorMessage";
import SuccessMessage from "../ui/successMessage";
import SectionHeader from "../ui/sectionHeader"
import { User } from "../types/index"
import { getAllPaginated } from "../services/services/user";
import {useAuth} from "../hooks/useAuth";

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
    const {token} = useAuth();

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

    // Cargar usuarios paginados
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const res = await getAllPaginated(currentPage, limit, token);
        if (res.error) {
            setErrorMessage(res.message);
            setUsers(res.users || []);
        } else {
            setSuccessMessage(res.message || "");
            setUsers(res.users);
            setTotalUsers(res.totalUsers || res.users.length);
            setTotalPages(res.totalPages || 1);
        }
        setLoading(false);
    }, [currentPage, limit]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Handler para éxito en UserForm
    const handleUserFormSuccess = () => {
        fetchUsers();
        closeDialog();
    };
    
    const handleEditUser = (user: User) => {
        setMode("edit");
        setUserToEdit(user);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    return (
        <>
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[90] transition-all"></div>
            )}
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
                users={users}
                currentPage={currentPage}
                totalUsers={totalUsers}
                totalPages={totalPages}
                limit={limit}
                setCurrentPage={setCurrentPage}
                setLimit={setLimit}
                loading={loading}
                token={null}
                setUsers={setUsers}
                onFormSuccess={handleUserFormSuccess}
                onEditUser={handleEditUser}
            />
            {isFormOpen && (
                <UserForm
                    dialogRef={dialogRef}
                    onClose={handleUserFormSuccess}
                    userToEdit={userToEdit}
                    mode={mode}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </>
    );
}