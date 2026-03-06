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
        <div className="bg-white/50 backdrop-blur-sm border border-azul-cielo/20 rounded-xl p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">

                {/* Buscador */}
                <div className="lg:col-span-4 space-y-1.5">
                    <label className="text-xs font-bold text-azul-marino/60 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                        <Search size={12} /> Buscar
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Servicio, descripción..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-azul-cielo/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm group-hover:border-primary/50"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-azul-marino/30 group-hover:text-primary/50 transition-colors" size={18} />
                    </div>
                </div>

                {/* Filtro Área */}
                <div className="lg:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-azul-marino/60 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                        <Filter size={12} /> Área
                    </label>
                    <select
                        value={areaFilter}
                        onChange={(e) => setAreaFilter(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-azul-cielo/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    >
                        <option value="all">Todas las áreas</option>
                        {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro Respuesta */}
                <div className="lg:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-azul-marino/60 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                        <Filter size={12} /> Respuesta
                    </label>
                    <select
                        value={responseFilter}
                        onChange={(e) => setResponseFilter(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-azul-cielo/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                    </select>
                </div>

                {/* Ordenar */}
                <div className="lg:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-azul-marino/60 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                        <ArrowUpDown size={12} /> Ordenar por
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={sortConfig.key}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="flex-1 px-3 py-2.5 bg-white border border-azul-cielo/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        >
                            <option value="createdAt">Fecha</option>
                            <option value="service.name">Servicio</option>
                            <option value="service.area">Área</option>
                            <option value="responseStatus">Estado</option>
                        </select>
                        <button
                            onClick={() => handleSortChange(sortConfig.key)}
                            className="p-2.5 bg-white border border-azul-cielo/30 rounded-xl hover:bg-azul-cielo/10 transition-colors shadow-sm text-azul-marino/60 hover:text-primary"
                            title={sortConfig.direction === 'asc' ? "Ascendente" : "Descendente"}
                        >
                            <ArrowUpDown size={18} className={sortConfig.direction === 'desc' ? "rotate-180 transition-transform" : "transition-transform"} />
                        </button>
                    </div>
                </div>

                {/* Botón de limpiar */}
                <div className="lg:col-span-2">
                    <button
                        onClick={clearFilters}
                        disabled={!hasActiveFilters}
                        className={`
              w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
              ${hasActiveFilters
                                ? "bg-danger/10 text-danger hover:bg-danger hover:text-white border border-danger/20"
                                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"}
            `}
                    >
                        <X size={16} />
                        Limpiar
                    </button>
                </div>

            </div>
        </div>
    );
}
