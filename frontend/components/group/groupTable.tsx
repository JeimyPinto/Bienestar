import React, { useState } from "react";
import { Group } from "../../interface/group";
import GroupTableFilterBar from "./groupTableFilterBar";
import GroupForm from "./groupForm";
import { filterGroupsByFichaPrograma } from "../../helpers/filterHelpers";
import { useAuth } from "../../hooks/useAuth";

interface GroupTableProps {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  setSuccessMessage?: (msg: string) => void;
  setErrorMessage?: (msg: string) => void;
}

export default function GroupTable({
  groups,
  setGroups,
  setSuccessMessage,
  setErrorMessage,
}: GroupTableProps) {
  const { token } = useAuth();
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Filtrado local usando helper
  const filteredGroups = filterGroupsByFichaPrograma(groups, filter);

  const paginatedGroups = filteredGroups.slice(0, limit);

  function handleRowClick(group: Group) {
    setSelectedGroup(group);
    setFormMode("edit");
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  }
  async function handleFormCloseAndReload() {
    setIsFormOpen(false);
    dialogRef.current?.close();
    // Recargar grupos después de crear/editar
    const { getAll } = await import("../../services/group");
    const res = await getAll(token || undefined);
    if (!res.error) {
      setGroups(res.groups);
    }
  }

  return (
    <section className="w-full max-w-8xl mx-auto px-2 py-6">
      <div className="flex flex-col gap-4">
        <GroupTableFilterBar
          limit={limit}
          setLimit={setLimit}
          filter={filter}
          setFilter={setFilter}
        />
        {/* Desktop view */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-azul-cielo/20 bg-white mt-4">
            <table className="min-w-full divide-y divide-azul-cielo/30">
              <thead className="bg-gradient-to-r from-azul-cielo/20 to-primary/10">
                <tr>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">ID</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">Ficha</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">Programa</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">Tipo</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">
                    Instructor
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">
                    Estado Ficha
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">Creado</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-azul-oscuro">
                    Actualizado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-azul-cielo/20">
                {paginatedGroups.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-6xl mb-4 opacity-50">📋</span>
                        <span className="text-azul-oscuro font-semibold text-lg mb-2">No hay fichas para mostrar</span>
                        <span className="text-azul-marino/70">Ajusta los filtros o crea nuevas fichas</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedGroups.map((group) => (
                    <tr
                      key={group.id}
                      className="hover:bg-azul-cielo/10 hover:scale-[1.005] transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-primary"
                      onClick={() => handleRowClick(group)}
                    >
                      <td className="px-3 py-3 text-sm font-medium text-azul-oscuro text-center">{group.id}</td>
                      <td className="px-3 py-3 text-sm text-azul-marino font-medium">{group.fichaNumber}</td>
                      <td className="px-3 py-3 text-sm text-azul-marino/80">{group.programName}</td>
                      <td className="px-3 py-3 text-sm text-azul-marino/80 capitalize">
                        {group.programType}
                      </td>
                      <td className="px-3 py-3 text-sm text-azul-marino/80">
                        {group.instructor
                          ? `${group.instructor.firstName} ${group.instructor.lastName}`
                          : group.instructorId || "-"}
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          group.fichaStatus === "etapa lectiva" 
                            ? "bg-success text-white" 
                            : group.fichaStatus === "etapa practica"
                            ? "bg-info text-white"
                            : "bg-warning text-white"
                        }`}>
                          {group.fichaStatus}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-azul-marino/70">
                        {new Date(group.createdAt).toLocaleDateString("es-CO")}
                      </td>
                      <td className="px-3 py-3 text-sm text-azul-marino/70">
                        {new Date(group.updatedAt).toLocaleDateString("es-CO")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Mobile view */}
        <div className="sm:hidden flex flex-col gap-4">
          {paginatedGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-azul-cielo/20 text-center max-w-md">
                <span className="text-6xl mb-4 block opacity-60">📋</span>
                <h3 className="text-xl font-bold text-azul-oscuro mb-2">No hay fichas</h3>
                <p className="text-azul-marino/70">
                  No se encontraron fichas que coincidan con los criterios de búsqueda.
                </p>
              </div>
            </div>
          ) : (
            paginatedGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white border-2 border-azul-cielo/20 rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleRowClick(group)}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">📋</span>
                  <div>
                    <div className="font-bold text-azul-oscuro text-lg">
                      Ficha: {group.fichaNumber}
                    </div>
                    <div className="text-azul-marino/70 text-sm">ID: {group.id}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-azul-oscuro">Programa:</span>
                    <span className="text-azul-marino/80">{group.programName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-azul-oscuro">Tipo:</span>
                    <span className="text-azul-marino/80 capitalize">{group.programType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-azul-oscuro">Instructor:</span>
                    <span className="text-azul-marino/80">
                      {group.instructor
                        ? `${group.instructor.firstName} ${group.instructor.lastName}`
                        : group.instructorId || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-azul-oscuro">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      group.fichaStatus === "etapa lectiva" 
                        ? "bg-success text-white" 
                        : group.fichaStatus === "etapa practica"
                        ? "bg-info text-white"
                        : "bg-warning text-white"
                    }`}>
                      {group.fichaStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-azul-marino/60 mt-3 pt-3 border-t border-azul-cielo/20">
                    <span>
                      <b>Creado:</b> {new Date(group.createdAt).toLocaleDateString("es-CO")}
                    </span>
                    <span>
                      <b>Actualizado:</b> {new Date(group.updatedAt).toLocaleDateString("es-CO")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Modal para crear o editar ficha */}
        {isFormOpen && (
          <GroupForm
            dialogRef={dialogRef}
            onClose={handleFormCloseAndReload}
            mode={formMode}
            groupToEdit={
              formMode === "edit" && selectedGroup ? selectedGroup : undefined
            }
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </section>
  );
}
