import { User } from './User';

export interface Service {
    id: number;
    name: string;
    description: string;
    creator: User;
    area: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
}

export interface ServiceTableProps {
  services: Array<{
    id: number;
    name: string;
    description: string;
    creator: User;
    area: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
  }>;
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}