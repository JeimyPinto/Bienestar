import React from "react";
import { Search, Filter, X, ArrowUpDown } from "lucide-react";

interface RequestHistoryFilterBarProps {
    filter: string;
    setFilter: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    responseFilter: string;
    setResponseFilter: (value: string) => void;
    areaFilter: string;
    setAreaFilter: (value: string) => void;
    sortConfig: { key: string; direction: 'asc' | 'desc' };
    setSortConfig: (config: { key: string; direction: 'asc' | 'desc' }) => void;
    areas: string[];
}

export default function RequestHistoryFilterBar({
    filter,
    setFilter,
    statusFilter,
    setStatusFilter,
    responseFilter,
    setResponseFilter,
    areaFilter,
    setAreaFilter,
    sortConfig,
    setSortConfig,
    areas
}: RequestHistoryFilterBarProps) {

    const handleSortChange = (key: string) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const clearFilters = () => {
        setFilter("");
        setStatusFilter("all");
        setResponseFilter("all");
        setAreaFilter("all");
    };

    const hasActiveFilters = filter !== "" || statusFilter !== "all" || responseFilter !== "all" || areaFilter !== "all";

    return (
        <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-azul-cielo/20 backdrop-blur-sm mb-6">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">

                {/* Buscador */}
                <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1">
                        Búsqueda General
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Servicio, descripción..."
                            className="
                              w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 pl-12 text-sm 
                              focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                              bg-azul-cielo/5 text-azul-oscuro placeholder-azul-marino/30
                              transition-all duration-300 group-hover:bg-white pr-10
                            "
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-azul-marino/30 transition-colors group-hover:text-primary">
                            <Search size={18} />
                        </div>
                    </div>
                </div>

                {/* Filtro Área */}
                <div>
                    <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                        <Filter size={12} /> Área
                    </label>
                    <select
                        value={areaFilter}
                        onChange={(e) => setAreaFilter(e.target.value)}
                        className="
                          w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                          focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                          bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                          transition-all duration-300 hover:bg-white appearance-none
                        "
                    >
                        <option value="all">Todas las áreas</option>
                        {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro Respuesta */}
                <div>
                    <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                        <Filter size={12} /> Respuesta
                    </label>
                    <select
                        value={responseFilter}
                        onChange={(e) => setResponseFilter(e.target.value)}
                        className="
                          w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                          focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                          bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                          transition-all duration-300 hover:bg-white appearance-none
                        "
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                </div>

                {/* Ordenar */}
                <div>
                    <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                        <ArrowUpDown size={12} /> Ordenar por
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={sortConfig.key}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="
                              flex-1 border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                              focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                              bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                              transition-all duration-300 hover:bg-white appearance-none
                            "
                        >
                            <option value="createdAt">Fecha</option>
                            <option value="service.name">Servicio</option>
                            <option value="service.area">Área</option>
                            <option value="responseStatus">Estado</option>
                        </select>
                        <button
                            onClick={() => handleSortChange(sortConfig.key)}
                            className="p-3 bg-azul-cielo/5 border-2 border-azul-cielo/10 rounded-2xl hover:bg-white transition-colors text-azul-marino/60 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/5"
                            title={sortConfig.direction === 'asc' ? "Ascendente" : "Descendente"}
                        >
                            <ArrowUpDown size={18} className={sortConfig.direction === 'desc' ? "rotate-180 transition-transform" : "transition-transform"} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-azul-cielo/10 pt-4 mt-2">
                {/* Botón de limpiar */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-xs font-bold text-primary hover:text-azul-oscuro transition-colors bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:border-primary/30"
                    >
                        <X size={14} />
                        Limpiar filtros
                    </button>
                )}
            </div>
            </div>
        </div>
    );
}
