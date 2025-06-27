import React from "react"
import { User, UserTableProps } from "../types"
import UserTableDesktop from "./userTableDesktop"
import UserCardMobile from "./userCardMobile"
import UserTableFilterBar from "./userTableFilterBar"
import { useColumnSorter } from "../lib/useColumnSorter"
import { filterUsers } from "../lib"
import { useFilter } from "../hooks"

export default function UserTable({
    users,
    currentPage,
    totalUsers,
    totalPages,
    limit,
    setCurrentPage,
    setLimit,
    loading,
    onEditUser,
}: UserTableProps) {
    // Hook para filtrado de usuarios
    const { filter, setFilter, filteredItems: filteredUsers } = useFilter({
        items: users,
        filterFn: filterUsers
    });

    const {
        handleSort,
        sortColumn,
        sortOrder,
    } = useColumnSorter(users);

    const sortedFilteredUsers = useColumnSorter(filteredUsers).sortedData;

    function handleRowClick(user: User) {
        onEditUser(user);
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
            </div>
        </section>
    );
}