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
  creator: User;
  area: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
}

export interface ServiceTableProps {
  services: Array<{
    id: number;
    name: string;
    description: string;
    creator: User;
    area: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
  }>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
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

export interface IcoBackProps {
  role?: string;
}