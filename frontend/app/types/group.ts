export type ProgramType = "tecnico" | "tecnologia" | "complementaria";
export type FichaStatus = "etapa lectiva" | "etapa practica" | "certificados";

export interface Group {
    id: number;
    fichaNumber: string;
    programName: string;
    programType: ProgramType;
    instructorId: number;
    fichaStatus: FichaStatus;
    createdAt: string;
    updatedAt: string;
    // Relacionales opcionales
    instructor?: any;
    members?: any[];
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
