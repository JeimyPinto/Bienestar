export interface User {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  image?: string;
  profileImage?: File | null;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  creator: string;
  area: string;
  image: string;
  createdAt: string;
  updatedAt: string;
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
}

export interface UserFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
}