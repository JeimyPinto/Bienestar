import React, { useState, useRef } from "react"
import { User, UserTableProps } from "../types"
import UserForm from "./userForm"
import UserTableDesktop from "./userTableDesktop"
import UserCardMobile from "./userCardMobile"
import UserTableFilterBar from "./userTableFilterBar"
import { useColumnSorter } from "../lib/useColumnSorter"

export default function UserTable({
    setSuccessMessage,
    setErrorMessage,
    users,
    currentPage,
    totalUsers,
    totalPages,
    limit,
    setCurrentPage,
    setLimit,
    loading
}: UserTableProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const userEditFormRef = useRef<HTMLDialogElement>(null);
    const {
        handleSort,
        sortColumn,
        sortOrder,
    } = useColumnSorter(users);

    // Filtrado local por nombre, apellido o documento
    const filteredUsers = filter.trim()
        ? users.filter(user =>
            user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            user.documentNumber.toLowerCase().includes(filter.toLowerCase())
        )
        : users;

    const sortedFilteredUsers = useColumnSorter(filteredUsers).sortedData;

    function handleRowClick(user: User) {
        setSelectedUser(user);
        setIsFormOpen(true);
        setTimeout(() => {
            userEditFormRef.current?.showModal();
        }, 0);
    }

    // Handler para éxito en UserForm desde la tabla
    function handleFormSuccess() {
        setIsFormOpen(false);
        // El padre se encarga de recargar los usuarios
    }

    return (
        <section className="w-full max-w-8xl mx-auto px-2 py-6">
            <div className="flex flex-col gap-4">
                <UserTableFilterBar
                    limit={limit}
                    setLimit={setLimit}
                    setCurrentPage={setCurrentPage}
                    filter={filter}
                    setFilter={setFilter}
                />
                {/* Desktop view */}
                <div className="hidden sm:block">
                    <UserTableDesktop
                        users={sortedFilteredUsers}
                        loading={loading}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                        handleRowClick={handleRowClick}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalUsers={totalUsers}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                {/* Mobile view */}
                <div className="sm:hidden flex flex-col gap-4">
                    <UserCardMobile
                        users={filteredUsers}
                        handleRowClick={handleRowClick}
                        loading={loading}
                    />
                </div>

                {isFormOpen && selectedUser && (
                    <UserForm
                        dialogRef={userEditFormRef}
                        onClose={handleFormSuccess}
                        mode="edit"
                        userToEdit={selectedUser}
                    />
                )}
            </div>
        </section>
    );
}