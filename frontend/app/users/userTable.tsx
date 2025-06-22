import React, { useEffect, useState, useRef } from "react"
import { User, UserTableProps } from "../types"
import ErrorMessage from "../ui/errorMessage"
import UserForm from "./userForm"
import UserTableDesktop from "./userTableDesktop"
import UserCardMobile from "./userCardMobile"
import UserTableFilterBar from "./userTableFilterBar"
import { getAllPaginated } from "../services/services/user"
import { useColumnSorter } from "../lib/useColumnSorter"
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"

export default function UserTable({ setSuccessMessage, setErrorMessage }: UserTableProps) {
    const [token, setToken] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const userEditFormRef = useRef<HTMLDialogElement>(null);
    const {
        handleSort,
        sortColumn,
        sortOrder,
    } = useColumnSorter(users);

    // Obtener token
    useEffect(() => {
        const fetchData = async () => {
            const tokenValue = getToken();
            if (tokenValue) {
                if (isTokenExpired(tokenValue)) {
                    localStorage.removeItem("token");
                    setToken(null);
                } else {
                    setToken(tokenValue);
                }
            } else {
                setToken(null);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!token) {
            setError("No se ha encontrado el token de autenticación.");
            setLoading(false);
            return;
        }
        let isMounted = true;
        setLoading(true);
        setError(null);
        const loadUsers = async () => {
            try {
                const response = await getAllPaginated(currentPage, limit, token);
                if (!isMounted) return;
                if (response.error) {
                    setUsers([]);
                    setError(response.message);
                    if (setErrorMessage) setErrorMessage(response.message);
                } else {
                    setUsers(response.users);
                    setCurrentPage(response.currentPage);
                    setTotalUsers(response.totalUsers);
                    setTotalPages(response.totalPages);
                    if (setSuccessMessage) setSuccessMessage(response.message);
                }
            } catch (error) {
                if (isMounted) setError("Error al cargar los usuarios");
                if (setErrorMessage) setErrorMessage("Error al cargar los usuarios");
                console.error("Error de la función loadUsers:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadUsers();
        return () => { isMounted = false; };
    }, [token, currentPage, limit]);

    function handleRowClick(user: User) {
        setSelectedUser(user);
        setIsFormOpen(true);
        setTimeout(() => {
            userEditFormRef.current?.showModal();
        }, 0);
    }

    // Filtrado local por nombre, apellido o documento
    const filteredUsers = filter.trim()
        ? users.filter(user =>
            user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
            user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
            user.documentNumber.toLowerCase().includes(filter.toLowerCase())
        )
        : users;

    const sortedFilteredUsers = useColumnSorter(filteredUsers).sortedData;

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

                {error && (
                    <ErrorMessage message={error} />
                )}

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
                        closeDialog={() => setIsFormOpen(false)}
                        onClose={() => setIsFormOpen(false)}
                        mode="edit"
                        userToEdit={selectedUser}
                    />
                )}
            </div>
        </section>
    );
}