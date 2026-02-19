
import type { BulkUploadReport } from "../../interface/bulkUpload";

interface BulkUploadReportCardProps {
  report: BulkUploadReport;
  onHide: () => void;
}

export default function BulkUploadReportCard({ report, onHide }: BulkUploadReportCardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-neutral/20 animate-fade-in relative">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-success/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center text-2xl border border-success/20 shadow-inner">
              📊
            </div>
            <div>
              <h3 className="font-display font-bold text-azul-marino text-2xl md:text-3xl tracking-tight leading-tight">
                Reporte de Carga Masiva
              </h3>
              <p className="text-azul-marino/50 text-sm font-sans mt-0.5">Analítica de resultados de la última operación</p>
            </div>
          </div>
          <button
            onClick={onHide}
            className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral/10 text-azul-marino font-display font-bold hover:bg-danger/10 hover:text-danger transition-all duration-300"
          >
            <span>Ocultar Reporte</span>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Summary Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
          {[
            { label: "Procesados", value: report.summary.total, icon: "🔄", color: "azul-marino" },
            { label: "Creados", value: report.summary.created, icon: "✨", color: "success" },
            { label: "Duplicados", value: report.summary.duplicates, icon: "👯", color: "warning" },
            { label: "Errores", value: report.summary.errors, icon: "❌", color: "danger" },
            { label: "Éxito", value: report.summary.successRate, icon: "🎯", color: "success" }
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center bg-white border border-${item.color}/10 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300`}>
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-azul-marino/40 text-[10px] uppercase tracking-widest font-bold mb-1">{item.label}</span>
              <span className={`text-2xl font-display font-bold text-${item.color} leading-none`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          {/* Errors Section */}
          {report.details?.errors && report.details.errors.length > 0 && (
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-5 ml-2">
                <div className="w-8 h-8 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-display font-bold text-azul-marino text-lg">Errores Críticos</h4>
                <span className="px-3 py-1 bg-danger/10 text-danger text-xs font-bold rounded-full">{report.details.errors.length}</span>
              </div>
              <div className="overflow-hidden rounded-3xl border border-danger/10 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-danger/5">
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-danger/10">Fila</th>
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-danger/10">Motivo del Error</th>
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-danger/10">Datos de Entrada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-danger/5">
                      {report.details.errors.map((err, idx) => (
                        <tr key={idx} className="hover:bg-danger/[0.02] transition-colors">
                          <td className="px-6 py-5">
                            <span className="w-8 h-8 rounded-full bg-danger/10 text-danger text-xs font-bold flex items-center justify-center">
                              {err.row}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-sm font-sans font-medium text-danger leading-snug">
                              {err.error}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <div className="max-w-xs md:max-w-md lg:max-w-xl">
                              <div className="bg-neutral/5 rounded-xl p-3 border border-neutral/10 max-h-32 overflow-y-auto custom-scrollbar">
                                <code className="text-[11px] font-mono text-azul-marino/70 break-all leading-relaxed whitespace-pre-wrap">
                                  {JSON.stringify(err.data, null, 2)}
                                </code>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Duplicates Section */}
          {report.details?.duplicates && report.details.duplicates.length > 0 && (
            <div className="animate-fade-in-up md:delay-100">
              <div className="flex items-center gap-3 mb-5 ml-2">
                <div className="w-8 h-8 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09m1.233-1.002c-.886-.021-1.748-.052-2.584-.093m0 0a5.595 5.595 0 1110.114-1.3l-1.632-1.258m1.233-1.002c-.932-1.93-2.31-3.628-4.004-4.896m0 0a10.831 10.831 0 00-4.838-1.076M12 11a11.05 11.05 0 000-2.28m0 0a11.05 11.05 0 014.638-7.93a11.05 11.05 0 012.23 6.403 11.05 11.05 0 01-6.868 1.527z" />
                  </svg>
                </div>
                <h4 className="font-display font-bold text-azul-marino text-lg">Entradas Duplicadas</h4>
                <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-bold rounded-full">{report.details.duplicates.length}</span>
              </div>
              <div className="overflow-hidden rounded-3xl border border-warning/10 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-warning/5">
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-warning/10">Fila</th>
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-warning/10">Correo Electrónico</th>
                        <th className="px-6 py-4 font-display font-bold text-azul-marino text-xs uppercase tracking-wider border-b border-warning/10">Documento de Identidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warning/5">
                      {report.details.duplicates.map((dup, idx) => (
                        <tr key={idx} className="hover:bg-warning/[0.02] transition-colors">
                          <td className="px-6 py-5">
                            <span className="w-8 h-8 rounded-full bg-warning/10 text-warning text-xs font-bold flex items-center justify-center">
                              {dup.row}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-sans font-medium text-azul-marino/80 text-sm italic">{dup.email}</td>
                          <td className="px-6 py-5 font-mono text-azul-marino/70 text-sm font-bold tracking-wider">{dup.documentNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
