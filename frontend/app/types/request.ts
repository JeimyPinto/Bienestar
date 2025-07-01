import { User } from "./user";
import { Service } from "./service";

// BASE: Campos básicos de una solicitud
export interface RequestBase {
    id?: number;
    userId: number;
    serviceId: number;
    description: string;
    status: boolean;
    responseStatus: string;
    responseMessage?: string | null;
    createdBy?: number;
    createdAt?: string;
    updatedAt?: string;
}

// EXTENDIDA: Incluye relaciones y campos opcionales
export interface Request extends RequestBase {
    applicant?: User | null;
    service?: Service | null;
    creator?: User | null;
}

// PROPS DE FORMULARIOS Y COMPONENTES DE REQUEST
export interface RequestsFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onClose: (request?: Request) => void; // Cambiado para aceptar la solicitud creada/editada
    mode: "create" | "edit";
    requestToEdit?: Request;
    setErrorMessage?: (msg: string) => void;
    setSuccessMessage?: (msg: string) => void;
}

export interface RequestApplicantFieldsProps {
    user: User | null;
    token: string;
    newRequest: Request;
    setNewRequest: (r: Request) => void;
    mode: "create" | "edit";
    editApplicant?: User; // Nuevo: usuario completo para edición
}

export interface RequestDescriptionFieldsProps {
    newRequest: Request;
    setNewRequest: (r: Request) => void;
}

export interface RequestStatusFieldsProps {
    mode: "create" | "edit";
    newRequest: Request;
    setNewRequest: (r: Request) => void;
}

export interface RequestFormActionsProps {
    formError: string;
    onClose: () => void;
}

export interface RequestHistoryProps {
    requests: Request[];
    loading: boolean;
    errorMessage: string;
    onCreateRequest: () => void;
    successMessage?: string;
}

// Props base para cualquier tabla de solicitudes
export interface RequestTableBaseProps<T = Request> {
    requests: T[];
    loading?: boolean;
}

// Props para tablas que permiten edición
export interface RequestTableEditableProps<T = Request> extends RequestTableBaseProps<T> {
    setRequests: React.Dispatch<React.SetStateAction<T[]>>;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
}

// Props para tablas con selección/click
export interface RequestTableSelectableProps<T = Request> extends RequestTableBaseProps<T> {
    handleRowClick: (request: T) => void;
}

// Props específicos para tabla de historial
export interface RequestHistoryTableProps {
    requests: Request[];
    loading?: boolean;
}

// Tipos concretos para cada tabla, usando las bases
export interface RequestTableProps extends RequestTableEditableProps {
    onRequestUpdate?: () => void; // Cambiado: ahora solo notifica que hubo cambio
}
export type RequestTableDesktopProps = RequestTableSelectableProps;
export type RequestCardMobileProps = RequestTableSelectableProps;
export interface RequestTableFilterBarProps {
    filter: string;
    setFilter: (value: string) => void;
}