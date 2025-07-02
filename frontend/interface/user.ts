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