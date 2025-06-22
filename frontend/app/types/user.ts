import { Service } from "./service";
import { Request } from "./request";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
    password?: string;
    status: string;
    role: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    services?: Service[];
    requests?: Request[];
    file?: File | null;
    groupId?: number | string | null; // Nuevo campo
    group?: { id: number; name: string } | null; // Nuevo campo (ajusta según tu modelo)
}
export interface UserTableProps {
    users: User[];
    currentPage: number;
    totalUsers: number;
    totalPages: number;
    limit: number;
    setCurrentPage: (page: number) => void;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    token: string | null;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
}
export interface UserFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    closeDialog: () => void;
    onClose: () => void;
    mode: "create" | "edit";
    userToEdit?: User;
    successMessage?: string;
    errorMessage?: string;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
}
export interface UserTableDesktopProps {
    users: User[];
    loading: boolean;
    sortColumn: keyof User;
    sortOrder: string;
    handleSort: (column: keyof User) => void;
    handleRowClick: (user: User) => void;
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    setCurrentPage: (page: number) => void;
}
export interface UserCardMobileProps {
    users: User[];
    handleRowClick: (user: User) => void;
    loading?: boolean;
}
export interface UserTableFilterBarProps {
    limit: number;
    setLimit: (limit: number) => void;
    setCurrentPage: (page: number) => void;
    filter: string;
    setFilter: (value: string) => void;
}
