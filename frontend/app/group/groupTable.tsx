import { GroupTableProps } from "../types/group";


export default function GroupTable({ groups }: GroupTableProps) {
    return (
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
                    </tr>
                </thead>
                <tbody className="divide-y divide-cian">
                    {groups.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="py-8 text-center text-azul">No hay fichas para mostrar.</td>
                        </tr>
                    ) : (
                        groups.map((group) => (
                            <tr key={group.id} className="hover:bg-cian/10 cursor-pointer">
                                <td className="px-2 py-2 text-center">{group.id}</td>
                                <td className="px-2 py-2">{group.fichaNumber}</td>
                                <td className="px-2 py-2">{group.programName}</td>
                                <td className="px-2 py-2 capitalize">{group.programType}</td>
                                <td className="px-2 py-2">{group.instructorId}</td>
                                <td className="px-2 py-2 capitalize">{group.fichaStatus}</td>
                                <td className="px-2 py-2">{new Date(group.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
