export type ModalMode = "create" | "edit";

export interface UseModalReturn<T = Record<string, unknown>> {
  // Referencias
  dialogRef: React.RefObject<HTMLDialogElement>;
  
  // Estado
  isFormOpen: boolean;
  mode: ModalMode;
  itemToEdit: T | undefined;
  
  // Funciones
  openCreateDialog: (onClearMessages?: () => void) => void;
  openEditDialog: (item: T, onClearMessages?: () => void) => void;
  closeDialog: () => void;
}

export interface UseMessagesReturn {
  // Estado
  successMessage: string;
  errorMessage: string;
  
  // Funciones principales
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  clearMessages: () => void;
  clearSuccess: () => void;
  clearError: () => void;
  
  // Para compatibilidad con código existente
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export interface UseUsersOptions {
  token?: string | null;
  initialLimit?: number;
  onError?: (message: string) => void;
}

export interface UseUsersReturn<T = Record<string, unknown>> {
  // Estado
  users: T[];
  currentPage: number;
  limit: number;
  totalUsers: number;
  totalPages: number;
  loading: boolean;
  
  // Setters
  setUsers: React.Dispatch<React.SetStateAction<T[]>>;
  setCurrentPage: (page: number) => void;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  
  // Funciones
  fetchUsers: () => Promise<{ error: boolean; message?: string }>;
  refreshUsers: () => void;
}

export interface UseGroupsOptions {
  token?: string | null;
  onError?: (message: string) => void;
}

export interface UseGroupsReturn<T = Record<string, unknown>> {
  // Estado
  groups: T[];
  loading: boolean;
  
  // Setters
  setGroups: React.Dispatch<React.SetStateAction<T[]>>;
  
  // Funciones
  fetchGroups: () => Promise<{ error: boolean; message?: string }>;
  refreshGroups: () => void;
}

// Tipos genéricos para otros hooks similares (servicios, requests, etc.)
export interface ApiResponse<T = Record<string, unknown>> {
  error: boolean;
  message?: string;
  data?: T;
  items?: T[];
  totalItems?: number;
  totalPages?: number;
}

export interface UseCrudOptions<T = Record<string, unknown>> {
  token?: string | null;
  initialLimit?: number;
  onError?: (message: string) => void;
  apiService: {
    getAll: (page: number, limit: number, token?: string) => Promise<ApiResponse<T>>;
    create: (data: T, token?: string) => Promise<ApiResponse<T>>;
    update: (id: number, data: T, token?: string) => Promise<ApiResponse<T>>;
    delete: (id: number, token?: string) => Promise<ApiResponse<T>>;
  };
}

export interface UseCrudReturn<T = Record<string, unknown>> {
  // Estado
  items: T[];
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  loading: boolean;
  
  // Setters
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  setCurrentPage: (page: number) => void;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  
  // Funciones CRUD
  fetchItems: () => Promise<{ error: boolean; message?: string }>;
  refreshItems: () => void;
  createItem: (data: T) => Promise<{ error: boolean; message?: string }>;
  updateItem: (id: number, data: T) => Promise<{ error: boolean; message?: string }>;
  deleteItem: (id: number) => Promise<{ error: boolean; message?: string }>;
}
