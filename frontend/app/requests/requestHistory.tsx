import { Request } from "../types/request";
import { areaColors } from "../styles/areaColors";
import ErrorMessage from "../ui/errorMessage";
import { RequestHistoryProps } from "../types/request";

interface Props extends RequestHistoryProps {
  onCreateRequest: () => void;
}

export default function RequestHistory({
  requests,
  loading,
  errorMessage,
  onCreateRequest,
}: Props) {
  return (
    <section className="bg-white shadow-lg rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 overflow-x-auto sm:max-w-[1400px] sm:mx-auto">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Historial de Solicitudes de Remisión
        </h2>
        <button
          onClick={onCreateRequest}
          className="bg-cian text-white px-4 py-2 rounded-md hover:bg-azul transition-all duration-200 font-semibold"
        >
          Nueva Solicitud
        </button>
      </div>
      {errorMessage && (
        <div className="mb-4">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      <div className="bg-white border border-cian/30 shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-cian text-white">
            <tr>
              <th className="px-2 py-3 font-semibold text-left">#</th>
              <th className="px-2 py-3 font-semibold text-left">Servicio</th>
              <th className="px-2 py-3 font-semibold text-left">Área</th>
              <th className="px-2 py-3 font-semibold text-left">Descripción</th>
              <th className="px-2 py-3 font-semibold text-left">Estado</th>
              <th className="px-2 py-3 font-semibold text-left">Creación</th>
              <th className="px-2 py-3 font-semibold text-left">Actualización</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cian/10 bg-white">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-azul font-medium">
                  Cargando solicitudes...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-azul font-medium">
                  No hay solicitudes.
                </td>
              </tr>
            ) : (
              requests.map((request, idx) => (
                <tr key={request.id}>
                  <td className="px-2 py-3">{idx + 1}</td>
                  <td className="px-2 py-3">{request.service?.name || "Sin servicio"}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${areaColors[request.service?.area ?? "default"]}`}
                    >
                      {request.service?.area || "Sin área"}
                    </span>
                  </td>
                  <td className="px-2 py-3">{request.description || "Sin descripción"}</td>
                  <td className="px-2 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${request.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {request.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-2 py-3">{request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}</td>
                  <td className="px-2 py-3">{request.updatedAt ? new Date(request.updatedAt).toLocaleString() : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}