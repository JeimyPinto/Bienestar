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
  image: string;
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
  setSuccessMessage?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}