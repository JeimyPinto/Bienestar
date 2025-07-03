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