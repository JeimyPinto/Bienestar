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
}
export interface UserFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    closeDialog: () => void;
    onClose: () => void;
    mode: "create" | "edit";
    userToEdit?: User;
    successMessage?: string;
    setSuccessMessage?: React.Dispatch<React.SetStateAction<string>>;
    errorMessage?: string;
    setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}
