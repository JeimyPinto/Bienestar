import React, { useState, useEffect } from "react";
import Spinner from "../../ui/spinner";
import { ROLES } from "../../constants/roles";
import { User } from "../../interface/user";
import { Service } from "../../interface/service";
import { Request } from "../../interface/request";
import { useServices } from "../../hooks/useServices";
import { useUsers } from "../../hooks/useUsers";
import { useGroups } from "../../hooks/useGroups";

interface RequestApplicantFieldsProps {
  user: User | null;
  token: string | null;
  newRequest: Request;
  setNewRequest: React.Dispatch<React.SetStateAction<Request>>;
  mode: "create" | "edit";
  editApplicant?: User | null;
  preSelectedService?: Service | null;
}

export default function RequestApplicantFields({
  user,
  token,
  newRequest,
  setNewRequest,
  mode,
  editApplicant,
  preSelectedService,
}: RequestApplicantFieldsProps) {
  // Usar hook para servicios activos
  const { services, loading: loadingServices } = useServices({
    mode: "allActive",
  });

  // Estado para la búsqueda de usuarios
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [wasSelected, setWasSelected] = useState(false);

  // Estado para tipo de solicitante (Usuario vs Ficha)
  const [applicantType, setApplicantType] = useState<"user" | "group">("user");

  // Hook de usuarios para búsqueda
  const { searchUsers } = useUsers({ token, mode: 'paginated' });
  // Hook de grupos para listar fichas
  const { groups, loading: loadingGroups } = useGroups({ token });

  // Manejar búsqueda
  useEffect(() => {
    // Si acabamos de seleccionar un usuario, no buscar
    if (wasSelected) {
      setWasSelected(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        const res = await searchUsers(searchQuery, ROLES.USER);
        if (!res.error && res.users) {
          setSearchResults(res.users);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(true);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchUsers]); // wasSelected no es dependencia para no reiniciar el efecto al resetearlo

  const selectUser = (u: User) => {
    setNewRequest({ ...newRequest, userId: u.id! });
    setSearchQuery(`${u.firstName} ${u.lastName}`);
    setWasSelected(true);
    setShowResults(false);
    setSearchResults([]);
  };

  // Determinar si el campo usuario debe ser solo lectura
  const isReadOnlyUser = mode === "edit";

  // Determinar si el usuario actual puede seleccionar otros usuarios
  const canSelectOtherUsers = user && [ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR].includes(user.role);

  return (
    <>
      {/* Usuario solicitante */}
      {canSelectOtherUsers ? (
        <div className="col-span-1 relative">
          <label className="block text-sm font-display font-bold text-azul-marino mb-3 border-l-4 border-azul-claro pl-2">
            Tipo de Solicitante
          </label>
          
          {/* Selector Usuario vs Ficha */}
          {!isReadOnlyUser && (
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer bg-azul-cielo/5 px-4 py-2 rounded-xl border border-azul-cielo/20 hover:bg-azul-cielo/10 transition-colors">
                <input
                  type="radio"
                  name="applicantType"
                  value="user"
                  checked={applicantType === "user"}
                  onChange={() => {
                    setApplicantType("user");
                    setNewRequest({ ...newRequest, groupId: 0 });
                  }}
                  className="w-4 h-4 text-azul-claro focus:ring-azul-claro/50"
                />
                <span className="text-sm font-semibold text-azul-marino">Usuario Individual</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-azul-cielo/5 px-4 py-2 rounded-xl border border-azul-cielo/20 hover:bg-azul-cielo/10 transition-colors">
                <input
                  type="radio"
                  name="applicantType"
                  value="group"
                  checked={applicantType === "group"}
                  onChange={() => {
                    setApplicantType("group");
                    setNewRequest({ ...newRequest, userId: 0 });
                    setSearchQuery("");
                  }}
                  className="w-4 h-4 text-azul-claro focus:ring-azul-claro/50"
                />
                <span className="text-sm font-semibold text-azul-marino">Ficha Completa</span>
              </label>
            </div>
          )}

          {applicantType === "user" ? (
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-azul-marino/40">
                {isSearching ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </span>
              <input
                type="text"
                placeholder={isReadOnlyUser ? "" : "Nombre, documento o correo..."}
                value={(() => {
                  if (editApplicant && !searchQuery && !wasSelected) {
                    return `${editApplicant.firstName} ${editApplicant.lastName}`;
                  }
                  return searchQuery;
                })()}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setWasSelected(false); // Reiniciar flag al escribir
                }}
                readOnly={isReadOnlyUser}
                className={`block w-full pl-10 pr-10 py-3 rounded-xl border transition-all duration-300 font-sans text-sm
                  ${isReadOnlyUser
                    ? "bg-neutral/5 border-neutral/10 text-azul-marino/50 cursor-not-allowed"
                    : "bg-white border-neutral/20 focus:border-azul-claro focus:ring-4 focus:ring-azul-claro/10 hover:border-neutral/40"
                  }`}
              />

              {/* Botón de limpiar */}
              {searchQuery && !isReadOnlyUser && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setNewRequest({ ...newRequest, userId: 0 });
                    setWasSelected(false);
                    setShowResults(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-azul-marino/30 hover:text-danger transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Resultados de búsqueda */}
              {showResults && searchResults.length > 0 && !isReadOnlyUser && !wasSelected && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-premium border border-neutral/10 overflow-hidden animate-fade-in">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {searchResults.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => selectUser(u!)}
                        className="w-full text-left px-4 py-3 hover:bg-azul-claro/5 flex items-center gap-3 transition-colors border-b border-neutral/5 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-full bg-azul-claro/10 flex items-center justify-center text-azul-marino font-bold text-xs uppercase">
                          {u.firstName?.[0]}{u.lastName?.[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-azul-marino">{u.firstName} {u.lastName}</span>
                          <span className="text-[10px] text-azul-marino/40 uppercase tracking-wider">{u.documentNumber} • {u.email}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showResults && searchResults.length === 0 && searchQuery.trim().length >= 2 && !isSearching && !isReadOnlyUser && !wasSelected && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-premium border border-neutral/10 p-6 text-center animate-fade-in">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    <p className="text-sm text-azul-marino/60 font-medium">No se encontraron usuarios</p>
                    <p className="text-[10px] text-azul-marino/30 uppercase tracking-widest">Intenta con otros términos</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative group">
              {loadingGroups ? (
                 <div className="pl-3 py-3 flex items-center gap-2 text-azul-marino/50">
                    <Spinner className="w-4 h-4" /> <span>Cargando fichas...</span>
                 </div>
              ) : (
                <select
                  value={newRequest.groupId || ""}
                  onChange={(e) => setNewRequest({ ...newRequest, groupId: Number(e.target.value) })}
                  className="block w-full px-4 py-3 rounded-xl border transition-all duration-300 font-sans text-sm bg-white border-neutral/20 focus:border-azul-claro focus:ring-4 focus:ring-azul-claro/10 hover:border-neutral/40"
                  required
                >
                  <option value="">Seleccione una Ficha</option>
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>
                      {g.fichaNumber} - {g.programName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      ) : user?.role === ROLES.USER ? (
        // Para usuarios normales, mostrar su información de forma automática (campo oculto)
        <div className="col-span-1">
          <label className="block text-sm font-medium text-azul">Solicitante</label>
          <input
            type="text"
            value={`${user.firstName} ${user.lastName}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
          />
          {/* Campo oculto para enviar el userId */}
          <input
            type="hidden"
            name="userId"
            value={user.id}
          />
        </div>
      ) : null}
      {/* Indicador de servicio pre-seleccionado */}
      {preSelectedService && newRequest.serviceId === Number(preSelectedService.id) && (
        <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
          <span className="text-emerald-500 text-xl">✅</span>
          <span className="font-semibold text-emerald-800 text-sm">Servicio pre-seleccionado: {preSelectedService.name}</span>
        </div>
      )}
      {/* Servicio */}
      <div className="col-span-1">
        <label className="block text-sm font-medium text-azul">Servicio {preSelectedService && '(puedes cambiarlo)'}</label>
        {loadingServices ? (
          <Spinner className="my-2" />
        ) : (
          <select
            name="serviceId"
            value={newRequest.serviceId || ""}
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                serviceId: Number(e.target.value),
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
            required
          >
            <option value="">Seleccione un servicio</option>
            {services.map((s: Service) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
