import { Service,Request,Group } from "./index";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
    password?: string;
    status: string;
    role: string;
    image?: string | null;
    groupId?: number | null;
    group?: Group | null;
    services?: Service[];
    requests?: Request[];
    managedGroups?: Group[];
    createdAt: string;
    updatedAt: string;
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
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
    loading?: boolean;
    onFormSuccess?: () => void;
    onEditUser: (user: User) => void;
}
export interface UserFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onClose: () => void;
    mode: "create" | "edit";
    userToEdit?: User;
    errorMessage?: string;
    setErrorMessage?: (msg: string) => void;
}
export interface UserTableDesktopProps {
    users: User[];
    loading?: boolean;
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
export interface UserFormAdminFieldsProps {
    newUser: User;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    groups: Group[];
    groupsLoading: boolean;
}
export interface UserFormImageFieldProps {
    mode: "create" | "edit";
    newUser: User;
    previewImage: string | null;
    setNewUser: React.Dispatch<React.SetStateAction<User>>;
    setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface UserFormPersonalInfoFieldsProps {
    newUser: User;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
