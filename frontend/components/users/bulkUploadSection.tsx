import React, { useState } from "react";
import BulkUploadInstructionsModal from "./bulkUploadInstructionsModal";
import BulkUploadReportCard from "./bulkUploadReportCard";
import type { BulkUploadReport } from "../../interface/bulkUpload";

interface BulkUploadSectionProps {
  isUploading: boolean;
  onDownloadTemplate: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<BulkUploadReport | null | undefined>;
}



export default function BulkUploadSection({
  isUploading,
  onDownloadTemplate,
  onFileUpload,
}: BulkUploadSectionProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [bulkUploadReport, setBulkUploadReport] = useState<BulkUploadReport | null>(null);

  // Handler para la carga real y mostrar el reporte
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const report = await onFileUpload(event);
    if (report) {
      setBulkUploadReport(report);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-azul-oscuro mb-2 flex items-center">
                <span className="mr-2">📂</span>
                Carga Masiva de Usuarios
              </h2>
              <p className="text-sm sm:text-base text-azul-marino/70 mb-4">
                Sube un archivo Excel con múltiples usuarios para crearlos automáticamente. 
                Los campos requeridos son: Nombres, Apellidos, Tipo de documento, Número de documento, telefono, correo eléctrónico.
              </p>
              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onDownloadTemplate}
                  className="
                    bg-primary hover:bg-azul-cielo text-white 
                    px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                    border border-primary/30
                  "
                >
                  <span>📥</span>
                  <span>Descargar Plantilla</span>
                </button>
                <button
                  onClick={() => setShowInstructions(true)}
                  className="
                    bg-warning hover:bg-orange-600 text-white 
                    px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                    hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                    border border-warning/30
                  "
                >
                  <span>📋</span>
                  <span>Ver Instrucciones</span>
                </button>
                <label className="
                  bg-success hover:bg-verde-bosque text-white 
                  px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                  hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2
                  border border-success/30 cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                ">
                  <span>📤</span>
                  <span>{isUploading ? 'Procesando...' : 'Subir Archivo Excel'}</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* Reporte de carga masiva: bloque completo debajo */}
          {bulkUploadReport && (
            <div className="mt-8">
              <BulkUploadReportCard
                report={bulkUploadReport}
                onHide={() => setBulkUploadReport(null)}
              />
            </div>
          )}
        </div>
      </div>
      {/* Modal de instrucciones para carga masiva */}
      <BulkUploadInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onDownloadTemplate={onDownloadTemplate}
      />
    </>
  );
}
