import { Service } from "./service";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
    password?: string; // opcional para no exponer siempre
    status: string;
    role: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    services?: Array<Service>;
}

export interface UserTableProps {
    users: Array<{
        id: string;
        image?: string;
        firstName: string;
        lastName: string;
        email: string;
        documentType: string;
        documentNumber: string;
        phone: string;
        role: string;
        status: string;
        createdAt: string | Date;
        updatedAt: string | Date;
    }>;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    token: string | null;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export interface UserFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    closeDialog: () => void;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
    token: string | null;
    user?: User;
    onClose: () => void;
    mode: "create" | "edit";
    userToEdit?: User;
}
