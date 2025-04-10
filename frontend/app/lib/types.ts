export interface User {
  id: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  image?: string;
  profileImage?: File | null;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  creator: string;
  area: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}