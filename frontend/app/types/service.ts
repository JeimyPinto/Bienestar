import { User } from './user';

export type Area =
  | 'Salud'
  | 'Arte y Cultura'
  | 'Deporte y Recreación'
  | 'Apoyo Socioeconomico y Reconocimiento a la Excelencia'
  | 'Apoyo Psicosocial';

export type ServiceStatus = 'activo' | 'inactivo';

export interface Service {
  id: string;
  name: string;
  description: string;
  creatorId: number;
  creator?: User;
  area: Area;
  image?: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
  file?: File | null; // opcional para manejar archivos
}

export interface ServiceFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  onClose: () => void;
  mode: "create" | "edit";
  serviceToEdit?: Service;
  successMessage?: string;
  setSuccessMessage?: (msg: string) => void;
  setErrorMessage?: (msg: string) => void;
  errorMessage?: string;
}
export interface ServiceTableProps {
  services: Service[];
  loading: boolean;
  setErrorMessage?: (msg: string) => void;
  setSuccessMessage?: (msg: string) => void;
  setServices?: (services: Service[]) => void;
  onEditService?: (service: Service) => void;
}
export interface ServiceCardMobileProps {
  services: Service[];
  loading: boolean;
  onCardClick: (service: Service) => void;
}

export interface ServiceTableDesktopProps {
  services: Service[];
  loading: boolean;
  onRowClick: (service: Service) => void;
}