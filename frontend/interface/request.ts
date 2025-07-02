import { User } from "./user";
import { Service } from "./service";

// BASE: Campos básicos de una solicitud
export interface Request {
    id?: number;
    userId: number;
    serviceId: number;
    description: string;
    status: boolean;
    responseStatus: "pendiente" | "aprobada" | "rechazada";
    responseMessage?: string | null;
    createdBy?: number;
    createdAt?: string;
    updatedAt?: string;
    applicant?: User | null;
    service?: Service | null;
    creator?: User | null;
}

