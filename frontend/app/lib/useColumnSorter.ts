import { useState, useMemo } from "react";
import { User } from "../../types/user";

const dateColumns = ["createdAt", "updatedAt"];

export function useColumnSorter(data: User[], defaultColumn: keyof User = "firstName") {
    const [sortColumn, setSortColumn] = useState<keyof User>(defaultColumn);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: keyof User) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            // Si la columna es de fecha, convierte a Date SOLO para comparar
            if (dateColumns.includes(sortColumn as string)) {
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