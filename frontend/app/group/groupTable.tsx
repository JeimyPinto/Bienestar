import React, { useState } from "react";
import { GroupTableProps, Group } from "../types/index";
import GroupTableFilterBar from "./groupTableFilterBar";
import GroupForm from "./groupForm";

export default function GroupTable({ groups, setGroups, setSuccessMessage, setErrorMessage }: GroupTableProps) {
    const [limit, setLimit] = useState<number>(10);
    const [filter, setFilter] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const dialogRef = React.useRef<HTMLDialogElement>(null);

    // Filtrado local por ficha o programa
    const filteredGroups = filter.trim()
        ? groups.filter(group =>
            group.fichaNumber.toLowerCase().includes(filter.toLowerCase()) ||
            group.programName.toLowerCase().includes(filter.toLowerCase())
        )
        : groups;

    const paginatedGroups = filteredGroups.slice(0, limit);

    function handleRowClick(group: Group) {
        setSelectedGroup(group);
        setFormMode("edit");
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    }
    function handleFormClose() {
        setIsFormOpen(false);
        dialogRef.current?.close();
    }
    async function handleFormCloseAndReload() {
        setIsFormOpen(false);
        dialogRef.current?.close();
        // Recargar grupos después de crear/editar
        const getToken = (await import("../lib/getToken")).default;
        const { getAllGroups } = await import("../services/services/group");
        const token = getToken();
        const res = await getAllGroups(token || undefined);
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
                    <div className="overflow-x-auto rounded-lg shadow-md border border-azul bg-blanco mt-4">
                        <table className="min-w-full divide-y divide-cian">
                            <thead className="bg-cian text-azul">
                                <tr>
                                    <th className="px-2 py-3 text-xs font-semibold">ID</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Ficha</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Programa</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Tipo</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Instructor</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Estado Ficha</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Creado</th>
                                    <th className="px-2 py-3 text-xs font-semibold">Actualizado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cian">
                                {paginatedGroups.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-8 text-center text-azul">No hay fichas para mostrar.</td>
                                    </tr>
                                ) : (
                                    paginatedGroups.map((group) => (
                                        <tr key={group.id} className="hover:bg-cian/10 cursor-pointer" onClick={() => handleRowClick(group)}>
                                            <td className="px-2 py-2 text-center">{group.id}</td>
                                            <td className="px-2 py-2">{group.fichaNumber}</td>
                                            <td className="px-2 py-2">{group.programName}</td>
                                            <td className="px-2 py-2 capitalize">{group.programType}</td>
                                            <td className="px-2 py-2">{group.instructor ? `${group.instructor.firstName} ${group.instructor.lastName}` : group.instructorId}</td>
                                            <td className="px-2 py-2 capitalize">{group.fichaStatus}</td>
                                            <td className="px-2 py-2">{new Date(group.createdAt).toLocaleDateString()}</td>
                                            <td className="px-2 py-2">{new Date(group.updatedAt).toLocaleDateString()}</td>
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
                        <div className="py-8 text-center text-azul">No hay fichas para mostrar.</div>
                    ) : (
                        paginatedGroups.map((group) => (
                            <div key={group.id} className="border border-cian rounded-lg p-4 shadow bg-white" onClick={() => handleRowClick(group)}>
                                <div className="font-bold text-azul mb-2">Ficha: {group.fichaNumber}</div>
                                <div>Programa: {group.programName}</div>
                                <div>Tipo: {group.programType}</div>
                                <div>Instructor: {group.instructor ? `${group.instructor.firstName} ${group.instructor.lastName}` : group.instructorId}</div>
                                <div>Estado: {group.fichaStatus}</div>
                                <div>Creado: {new Date(group.createdAt).toLocaleDateString()}</div>
                                <div>Actualizado: {new Date(group.updatedAt).toLocaleDateString()}</div>
                            </div>
                        ))
                    )}
                </div>
                {/* Modal para crear o editar ficha */}
                {isFormOpen && (
                    <GroupForm
                        dialogRef={dialogRef}
                        closeDialog={handleFormCloseAndReload}
                        onClose={handleFormCloseAndReload}
                        mode={formMode}
                        groupToEdit={formMode === "edit" && selectedGroup ? selectedGroup : undefined}
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
                    />
                )}
            </div>
        </section>
    );
}
