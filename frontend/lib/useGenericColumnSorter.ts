import { useState, useMemo } from "react";

const dateColumns = ["createdAt", "updatedAt"];

export function useGenericColumnSorter<T extends Record<string, unknown>>(
  data: T[], 
  defaultColumn: string = "name"
) {
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
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

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
