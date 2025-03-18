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
  createdAt: string;
  updatedAt: string;
}