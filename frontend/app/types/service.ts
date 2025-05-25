import { User } from './user';

export type Area =
  | 'Salud'
  | 'Arte y Cultura'
  | 'Deporte y Recreación'
  | 'Apoyo Socioeconomico y Reconocimiento a la Excelencia'
  | 'Apoyo Psicosocial';

export type ServiceStatus = 'activo' | 'inactivo';

export interface Service {
  id: number;
  name: string;
  description: string;
  creatorId: number;
  creator?: User;
  area: Area;
  image: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}