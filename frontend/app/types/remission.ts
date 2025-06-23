// frontend/app/types/remission.ts
export interface Remission {
  id?: number;
  requestId: number;
  referredUserId: number;
  assignedUserId?: number | null;
  serviceId: number;
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
