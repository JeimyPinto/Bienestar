import Image from "next/image";

interface SortIconProps {
    column: string;
    sortColumn: string;
    sortOrder: "asc" | "desc";
}

export default function SortIcon({ column, sortColumn, sortOrder }: SortIconProps) {
    if (sortColumn !== column) {
        return (
            <Image
                src="/images/ico-arrow-up.svg"
                alt="Ordenar"
                width={12}
                height={12}
                className="ml-1 opacity-30 group-hover:opacity-60 transition-opacity duration-200"
            />
        );
    }

    return (
        <Image
            src="/images/ico-arrow-up.svg"
            alt={sortOrder === "asc" ? "Orden ascendente" : "Orden descendente"}
            width={12}
            height={12}
            className={`ml-1 transition-transform duration-200 ${
                sortOrder === "desc" ? "rotate-180" : ""
            }`}
        />
    );
}
