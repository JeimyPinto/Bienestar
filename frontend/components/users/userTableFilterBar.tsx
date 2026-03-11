import React from "react";
import { FilterProps } from "../../interface/user";
import { Search, Eraser, Filter, UserCheck, Users, X, UserCog, Crown, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

const UserTableFilterBar: React.FC<FilterProps> = ({
  limit,
  setLimit,
  setCurrentPage,
  filter,
  setFilter,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) => {
  const isFiltering = filter !== "" || roleFilter !== "all" || statusFilter !== "all";

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-azul-cielo/20 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Barra de búsqueda */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1">
              Búsqueda General
            </label>
            <div className="relative group">
              <input
                type="text"
                value={filter}
                onChange={e => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Nombre, documento o email..."
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

          {/* Filtro por Rol */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <Users size={12} /> Rol
            </label>
            <select
              value={roleFilter}
              onChange={e => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todos los roles</option>
              <option value="user">Aprendiz</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Administrador</option>
              <option value="superadmin">Super Administrador</option>
            </select>
          </div>

          {/* Filtro por Estado */}
          <div>
            <label className="block text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
              <UserCheck size={12} /> Estado
            </label>
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="
                w-full border-2 border-azul-cielo/10 rounded-2xl px-4 py-3 text-sm 
                focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 
                bg-azul-cielo/5 text-azul-oscuro cursor-pointer
                transition-all duration-300 hover:bg-white appearance-none
              "
            >
              <option value="all">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-azul-cielo/10 pt-4">
          {/* Control de cantidad */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-azul-oscuro/40 uppercase tracking-widest">
              Mostrar
            </span>
            <select
              value={limit}
              onChange={e => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-white border border-azul-cielo/20 rounded-lg text-xs font-semibold text-azul-oscuro focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {[10, 25, 50, 100].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="text-xs text-azul-marino/60 lowercase">por página</span>
          </div>

          {/* Botón de limpiar */}
          {isFiltering && (
            <button
              onClick={() => {
                setFilter("");
                setRoleFilter("all");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 text-xs font-bold text-primary hover:text-azul-oscuro transition-colors bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:border-primary/30"
            >
              <Eraser size={14} />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTableFilterBar;
