import { useState, useMemo } from "react";
import { User } from "../interface/user";

const dateColumns = ["createdAt", "updatedAt"];

export function useColumnSorter(data: User[], defaultColumn: string = "firstName") {
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
            const aValue = a[sortColumn as keyof User];
            const bValue = b[sortColumn as keyof User];

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
            return 0;
        });
    }, [data, sortColumn, sortOrder]);

    return { sortedData, handleSort, sortColumn, sortOrder };
}