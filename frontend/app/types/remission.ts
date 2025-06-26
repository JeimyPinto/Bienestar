import {User} from "./user";
import {Service} from "./service";
import {Request} from "./request";

export interface Remission {
  id?: number;
  requestId: number;
  referredUserId: number;
  assignedUserId?: number | null;
  serviceId: number;
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
  // Asociaciones
  request?: Request;
  referredUser?: User;
  assignedUser?: User | null;
  service?: Service;
}

export interface RemissionTableProps {
  remissions: Remission[];
  setRemissions?: (remissions: Remission[]) => void;
  setSuccessMessages: (msgs: string[] | ((prev: string[]) => string[])) => void;
  loading?: boolean;
  onRemissionUpdate?: () => void;
}

export interface RemissionFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: (msg?: string) => void;
  mode: "create" | "edit";
  remissionToEdit?: Remission;
  setSuccessMessages: (msgs: string[] | ((prev: string[]) => string[])) => void;
}

export interface RemissionCardMobileProps {
  remissions: Remission[];
  loading?: boolean;
  handleRowClick: (remission: Remission) => void;
}

export interface RemissionTableFilterBarProps {
  filter: string;
  setFilter: (value: string) => void;
}

export interface RemissionTableDesktopProps {
  remissions: Remission[];
  loading?: boolean;
  handleRowClick: (remission: Remission) => void;
  users?: User[];
  services?: Service[];
}