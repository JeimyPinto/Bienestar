"use client"

import React, { useState, useRef } from "react"
import Header from "../ui/header"
import IcoBack from "../ui/icoBack"
import UserTable from "./userTable"
import UserForm from "./userForm"
import { User } from "../types/user"

export default function UsersPage() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);

    const openCreateDialog = () => {
        setMode("create");
        setUserToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const openEditDialog = (user: User) => {
        setMode("edit");
        setUserToEdit(user);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = () => {
        setIsFormOpen(false);
        dialogRef.current?.close();
    };

    return (
        <>
            <Header />
            <IcoBack />
            <main className="flex flex-col md:flex-row justify-between items-center mb-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 ml-20">
                    Listado de Usuarios
                </h1>
                <button
                    onClick={openCreateDialog}
                    className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300"
                >
                    Añadir Nuevo Usuario
                </button>
            </main>
            <UserTable/>
            {isFormOpen && (
                <UserForm
                    dialogRef={dialogRef}
                    closeDialog={closeDialog}
                    onClose={closeDialog}
                    mode={mode}
                    userToEdit={userToEdit}
                />
            )}
        </>
    );
}