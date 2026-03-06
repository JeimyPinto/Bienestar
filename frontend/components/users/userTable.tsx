import React from "react"
import { UserTableProps } from "../../interface/user"
import UserTableDesktop from "./userTableDesktop"
import UserCardMobile from "./userCardMobile"
import UserTableFilterBar from "./userTableFilterBar"
import PaginationControls from "./paginationControls"
import { useColumnSorter } from "../../lib/useColumnSorter"
import { useFilter } from "../../hooks/useFilter"
import { useUsers } from "../../hooks/useUsers"
import { useAuthContext } from "../../contexts/authContext"

export default function UserTable({
    onEditUser,
    onError,
    onRefreshUsers
}: UserTableProps) {
    const { token } = useAuthContext();

    // Hook para manejo de usuarios
    const {
        users,
        currentPage,
        limit,
        totalUsers,
        totalPages,
        loading,
        setCurrentPage,
        setLimit,
        refreshUsers
    } = useUsers({
        token,
        onError
    });

    // Pasar función de refresh al componente padre
    React.useEffect(() => {
        if (onRefreshUsers) {
            onRefreshUsers(refreshUsers);
        }
    }, [onRefreshUsers, refreshUsers]);

    // Estados para filtros adicionales
    const [roleFilter, setRoleFilter] = React.useState("all");
    const [statusFilter, setStatusFilter] = React.useState("all");

    // Hook para filtrado de usuarios
    const { filter, setFilter, filteredItems: filteredBySearch } = useFilter({
        items: users,
        filterFn: (users, filter) => {
            if (!filter || !filter.trim()) {
                return users;
            }

            const searchTerm = filter.toLowerCase().trim();

            return users.filter(user =>
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.documentNumber.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }
    });

    // Filtrado por Rol y Estado (encadenado)
    const filteredUsers = React.useMemo(() => {
        return filteredBySearch.filter(user => {
            const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
            const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesRole && matchesStatus;
        });
    }, [filteredBySearch, roleFilter, statusFilter]);

    // Hook para ordenamiento de usuarios filtrados
    const {
        handleSort,
        sortColumn,
        sortOrder,
        sortedData: sortedFilteredUsers
    } = useColumnSorter(filteredUsers);

    function handleRowClick(user: typeof users[0]) {
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
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
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