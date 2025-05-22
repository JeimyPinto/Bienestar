import { useState } from "react";

export const useColumnSorter = (data) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (column) => {
        if (sortColumn === column) {
            // Toggle sort order if the same column is clicked
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Set new column and default to ascending order
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0; // No sorting if no column is selected
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

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

    return { sortedData, handleSort, sortColumn, sortOrder };
};