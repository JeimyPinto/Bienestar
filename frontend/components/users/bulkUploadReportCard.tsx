
import type { BulkUploadReport } from "../../interface/bulkUpload";

interface BulkUploadReportCardProps {
  report: BulkUploadReport;
  onHide: () => void;
}

export default function BulkUploadReportCard({ report, onHide }: BulkUploadReportCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-verde-claro/10 to-success/10 p-8 rounded-2xl border border-success/20 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-azul-oscuro text-2xl flex items-center gap-2">
          <span>📊</span>
          Último Reporte de Carga Masiva
        </h3>
        <button
          onClick={onHide}
          className="text-xs px-4 py-2 rounded-lg bg-azul-marino/10 text-azul-marino hover:bg-azul-marino/20 transition-all"
        >
          Ocultar reporte
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-6">
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-3 border border-success/10">
          <span className="text-azul-marino/70 text-xs">Total procesados</span>
          <span className="font-bold text-lg">{report.summary.total}</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-3 border border-success/10">
          <span className="text-azul-marino/70 text-xs">Creados</span>
          <span className="font-bold text-success text-lg">{report.summary.created}</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-3 border border-warning/10">
          <span className="text-azul-marino/70 text-xs">Duplicados</span>
          <span className="font-bold text-warning text-lg">{report.summary.duplicates}</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-3 border border-danger/10">
          <span className="text-azul-marino/70 text-xs">Errores</span>
          <span className="font-bold text-danger text-lg">{report.summary.errors}</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-3 border border-success/10">
          <span className="text-azul-marino/70 text-xs">Tasa de éxito</span>
          <span className="font-bold text-success text-lg">{report.summary.successRate}</span>
        </div>
      </div>
      {/* Mostrar siempre los detalles */}
      <div className="mt-8">
        {/* Errores */}
        {report.details?.errors && report.details.errors.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-danger mb-2 flex items-center"><span className="mr-2">❌</span>Errores al agregar usuarios</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-danger/10">
                      <th className="px-2 py-1 border">Fila</th>
                      <th className="px-2 py-1 border">Motivo</th>
                      <th className="px-2 py-1 border">Datos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.details.errors.map((err, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1 border text-center">{err.row}</td>
                        <td className="px-2 py-1 border">{err.error}</td>
                        <td className="px-2 py-1 border font-mono whitespace-pre-wrap max-w-[200px]">{JSON.stringify(err.data)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Duplicados */}
          {report.details?.duplicates && report.details.duplicates.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-warning mb-2 flex items-center"><span className="mr-2">⚠️</span>Usuarios duplicados no agregados</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-warning/10">
                      <th className="px-2 py-1 border">Fila</th>
                      <th className="px-2 py-1 border">Email</th>
                      <th className="px-2 py-1 border">Documento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.details.duplicates.map((dup, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1 border text-center">{dup.row}</td>
                        <td className="px-2 py-1 border">{dup.email}</td>
                        <td className="px-2 py-1 border">{dup.documentNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
