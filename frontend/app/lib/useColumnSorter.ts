import { useState, useMemo } from "react";

// T es el tipo de los objetos del array (por ejemplo, User)
export function useColumnSorter<T extends Record<string, any>>(data: T[], defaultColumn: keyof T = "firstName") {
    const [sortColumn, setSortColumn] = useState<keyof T>(defaultColumn);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (column: keyof T) => {
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

            // Manejo especial para fechas
            if (aValue instanceof Date && bValue instanceof Date) {
                return sortOrder === "asc"
                    ? aValue.getTime() - bValue.getTime()
                    : bValue.getTime() - aValue.getTime();
            }

            // Manejo para strings y números
            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortOrder]);

    return { sortedData, handleSort, sortColumn, sortOrder };
}