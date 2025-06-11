import { User } from "./user";
import { Service } from "./service";

export interface Request {
    id: number;
    userId: number;
    serviceId: number;
    description?: string;
    status?: boolean;
    createdAt?: string;
    updatedAt?: string;
    applicant?: User;
    service?: Service;
}

export interface RequestsFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    closeDialog: () => void;
    onClose: () => void;
    mode: "create" | "edit";
    requestToEdit?: Request;
    successMessage?: string;
    setSuccessMessage?: React.Dispatch<React.SetStateAction<string>>;
    errorMessage?: string;
    setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
    isLoading?: boolean;
}

export interface RequestHistoryProps {
    requests: Request[];
    loading: boolean;
    errorMessage: string;
}