export type ProgramType = "tecnico" | "tecnologia" | "complementaria";
export type FichaStatus = "etapa lectiva" | "etapa practica" | "certificados";
import {User} from "./user"
export interface Group {
    id: number;
    fichaNumber: string;
    programName: string;
    programType: ProgramType;
    instructorId: number;
    fichaStatus: FichaStatus;
    createdAt: string;
    updatedAt: string;
    instructor?: User;
    members?: User[];
}

export interface GroupTableProps {
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
}

export interface GroupTableFilterBarProps {
  limit: number;
  setLimit: (limit: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
}
