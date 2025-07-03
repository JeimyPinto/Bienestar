import { useState, useMemo } from "react";
import { Service } from "../interface/service";

const dateColumns = ["createdAt", "updatedAt"];

export function useServiceColumnSorter(data: Service[], defaultColumn: string = "name") {
    const [sortColumn, setSortColumn] = useState<string>(defaultColumn);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            let aValue: unknown;
            let bValue: unknown;

            // Manejar campos anidados como creator
            if (sortColumn === "creator") {
                aValue = a.creator ? `${a.creator.firstName} ${a.creator.lastName || ""}` : "";
                bValue = b.creator ? `${b.creator.firstName} ${b.creator.lastName || ""}` : "";
            } else {
                aValue = a[sortColumn as keyof Service];
                bValue = b[sortColumn as keyof Service];
            }

            // Si la columna es de fecha, convierte a Date SOLO para comparar
            if (dateColumns.includes(sortColumn)) {
                const aDate = new Date(aValue as string);
                const bDate = new Date(bValue as string);
                return sortOrder === "asc"
                    ? aDate.getTime() - bDate.getTime()
                    : bDate.getTime() - aDate.getTime();
            }

            // Manejo para strings y números
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
            }
            
            // Para valores null/undefined
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return sortOrder === "asc" ? -1 : 1;
            if (bValue == null) return sortOrder === "asc" ? 1 : -1;
            
            return 0;
        });
    }, [data, sortColumn, sortOrder]);

    return { sortedData, handleSort, sortColumn, sortOrder };
}
