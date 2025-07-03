import React from "react";
import { RemissionTableFilterBarProps } from "../../interface/remission";


export default function RemissionTableFilterBar({ filter, setFilter }: RemissionTableFilterBarProps) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Buscar por usuario, encargado o servicio..."
                className="w-full max-w-md border border-cian rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cian"
            />
        </div>
    );
}
