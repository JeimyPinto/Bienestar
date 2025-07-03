import { Service } from "./service";
import { Request } from "./request";
import { Group } from "./group";

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

// Props base para componentes de tabla de usuarios
export interface BaseUserTableProps {
  users: User[];
  loading: boolean;
  handleRowClick: (user: User) => void;
}

// Props para ordenamiento
export interface SortableProps {
  sortColumn: string;
  sortOrder: "asc" | "desc";
  handleSort: (column: string) => void;
}

// Props para paginación
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  setCurrentPage: (page: number) => void;
}

// Props para filtros
export interface FilterProps {
  limit: number;
  setLimit: (limit: number) => void;
  setCurrentPage: (page: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

// Props completas para UserTable
export interface UserTableProps extends BaseUserTableProps, PaginationProps {
  limit: number;
  setLimit: (limit: number) => void;
  onEditUser: (user: User) => void;
}

// Props para UserTableDesktop
export interface UserTableDesktopProps extends BaseUserTableProps, SortableProps, PaginationProps {}
