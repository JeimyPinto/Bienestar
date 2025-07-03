import React from "react"
import { UserTableProps } from "../../interface/user"
import UserTableDesktop from "./userTableDesktop"
import UserCardMobile from "./userCardMobile"
import UserTableFilterBar from "./userTableFilterBar"
import PaginationControls from "./paginationControls"
import { useColumnSorter } from "../../lib/useColumnSorter"
import { filterUsers } from "../../helpers/filterHelpers"
import { useFilter } from "../../hooks/useFilter"

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

    function handleRowClick(user: UserTableProps['users'][0]) {
        onEditUser(user);
    }

    return (
        <section className="w-full max-w-full mx-auto">
            <div className="flex flex-col gap-6">
                {/* Barra de filtros */}
                <UserTableFilterBar
                    limit={limit}
                    setLimit={setLimit}
                    setCurrentPage={setCurrentPage}
                    filter={filter}
                    setFilter={setFilter}
                />
                
                {/* Vista de escritorio */}
                <div className="hidden lg:block">
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
                
                {/* Vista móvil/tablet */}
                <div className="lg:hidden">
                    <UserCardMobile
                        users={sortedFilteredUsers}
                        handleRowClick={handleRowClick}
                        loading={loading}
                    />
                    
                    {/* Paginación para móvil */}
                    {!loading && sortedFilteredUsers.length > 0 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalUsers={totalUsers}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}