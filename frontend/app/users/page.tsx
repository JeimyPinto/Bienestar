"use client"


import React from "react";
import Header from "../ui/header"
import IcoBack from "../ui/icoBack"
import UserTable from "./userTable";


export default function UsersPage() {
    
    const dialogRef = React.useRef<HTMLDialogElement>(null);

  

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
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
                    onClick={openDialog}
                    className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300"
                >
                    Añadir Nuevo Usuario
                </button>
            </main>
            <UserTable />

        </>
    );
}