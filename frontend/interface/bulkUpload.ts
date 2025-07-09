// Interfaz para el reporte de carga masiva de usuarios
export interface BulkUploadReport {
  summary: {
    total: number;
    created: number;
    duplicates: number;
    errors: number;
    successRate: string;
  };
  details?: {
    successful: Array<{
      row: number;
      userId: number;
      email: string;
      password: string;
    }>;
    duplicates: Array<{
      row: number;
      email: string;
      documentNumber: string;
    }>;
    errors: Array<{
      row: number;
      error: string;
      data: any;
    }>;
  };
}
