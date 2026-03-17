import React from "react";
import { RemissionTableFilterBarProps } from "../../interface/remission";
import { Search, X } from "lucide-react";

export default function RemissionTableFilterBar({ filter, setFilter }: RemissionTableFilterBarProps) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-azul-cielo/20 backdrop-blur-sm mb-6">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Barra de búsqueda */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1">
              Búsqueda General
            </label>
            <div className="relative group">
              <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Buscar por usuario, encargado o servicio..."
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
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-azul-marino/20 hover:text-danger transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
