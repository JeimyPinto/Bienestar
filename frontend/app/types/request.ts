import { User } from "./user";
import { Service } from "./service";

export interface Request {
    id?: number;
    userId: number;
    serviceId: number;
    description: string;
    status: boolean;
    responseStatus: "pendiente" | "aprobada" | "rechazada";
    responseMessage?: string | null;
    createdAt?: string;
    updatedAt?: string;
    applicant?: User;
    service?: Service;
    creator?: User;
}

export interface RequestsFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onClose: () => void;
    mode: "create" | "edit";
    requestToEdit?: Request;
    setErrorMessage?: (msg: string) => void;
    setSuccessMessage?: (msg: string) => void;
}

export interface RequestHistoryProps {
    requests: Request[];
    loading: boolean;
    errorMessage: string;
    onCreateRequest: () => void;
    successMessage?: string;
}

export interface RequestTableProps {
    requests: Request[];
    setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
    loading?: boolean;
}

export interface RequestCardMobileProps {
    requests: Request[];
    loading?: boolean;
    handleRowClick: (request: Request) => void;
}

export interface RequestTableDesktopProps {
    requests: Request[];
    loading?: boolean;
    handleRowClick: (request: Request) => void;
}