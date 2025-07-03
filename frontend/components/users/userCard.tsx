"use client"

import Image from "next/image"
import { useState } from "react"
import { useAuthContext } from "../../contexts/AuthContext"
import { useUsers } from "../../hooks/useUsers"
import { User } from "../../interface/user"

interface UserCardProps {
    user?: User;  // Usuario opcional - si no se pasa, obtiene myProfile
    onClick?: () => void;
}

export default function UserCard({ user: propUser, onClick }: UserCardProps) {
    // Obtener token del contexto
    const { token } = useAuthContext();
    
    // Estado para manejar errores
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Solo hacer llamada a la API si NO se pasó un usuario como prop
    const { users: [fetchedUser], loading } = useUsers({
        token: propUser ? null : token, // Solo usar token si no hay propUser
        mode: 'myProfile',
        onError: (message) => setErrorMessage(message || "Error al cargar usuario")
    });

    // Usar el usuario de props o el obtenido de la API
    const user = propUser || fetchedUser;

    // Estado de carga (solo si estamos obteniendo el usuario de la API)
    if (!propUser && loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20 animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-azul-cielo/20 rounded-full"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-azul-cielo/20 rounded mb-2"></div>
                        <div className="h-3 bg-azul-cielo/10 rounded mb-1"></div>
                        <div className="h-3 bg-azul-cielo/10 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Estado de error (solo si estamos obteniendo el usuario de la API)
    if (!propUser && errorMessage) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-danger/20">
                <div className="text-center">
                    <span className="text-4xl mb-2 block">⚠️</span>
                    <p className="text-danger">Error al cargar la información del usuario.</p>
                    <p className="text-sm text-azul-marino/70 mt-2">{errorMessage}</p>
                </div>
            </div>
        );
    }

    // Usuario no encontrado
    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-azul-cielo/20">
                <div className="text-center">
                    <span className="text-4xl mb-2 block">❓</span>
                    <p className="text-azul-marino/70">No se encontró información del usuario.</p>
                </div>
            </div>
        );
    }

    return (
        <section
            className="
                bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-azul-cielo/20
                transition-all duration-300 hover:shadow-xl hover:scale-[1.01]
                cursor-pointer group w-full
            "
            onClick={onClick}
            tabIndex={0}
            aria-label={`Editar usuario ${user.firstName} ${user.lastName}`}
            onKeyDown={e => { if (e.key === "Enter" && onClick) onClick(); }}
        >
            {/* Layout móvil y tablet (vertical) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:hidden">
                <div className="relative flex-shrink-0">
                    <Image
                        src={
                            user.image
                                ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/users/" + user.image
                                : "/images/logo-sena.png"
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-2 border-azul-cielo/30 group-hover:border-primary transition-colors duration-300"
                    />
                    <div className={`
                        absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${user.status === "activo" 
                            ? "bg-success text-white" 
                            : "bg-danger text-white"
                        }
                    `}>
                        {user.status === "activo" ? "✓" : "✕"}
                    </div>
                </div>
                
                <div className="text-center sm:text-left w-full min-w-0">
                    <h2 className="text-lg font-bold text-azul-oscuro break-words group-hover:text-primary transition-colors duration-300">
                        {`${user.firstName} ${user.lastName}`}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className={`
                            inline-block px-2 py-1 text-xs font-semibold rounded-full
                            ${user.role === "admin" ? "bg-warning/20 text-azul-oscuro" :
                              user.role === "instructor" ? "bg-info/20 text-azul-oscuro" :
                              "bg-primary/20 text-azul-oscuro"}
                        `}>
                            {user.role}
                        </span>
                    </div>
                    
                    <div className="space-y-1 text-sm text-azul-marino/70">
                        <p className="flex items-center justify-center sm:justify-start break-words">
                            <span className="mr-2">📧</span>
                            {user.email || "No especificado"}
                        </p>
                        <p className="flex items-center justify-center sm:justify-start break-words">
                            <span className="mr-2">📱</span>
                            {user.phone || "No especificado"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Layout desktop (horizontal extendido) */}
            <div className="hidden lg:block">
                <div className="flex items-center gap-6">
                    {/* Avatar y info básica */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="relative">
                            <Image
                                src={
                                    user.image
                                        ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/users/" + user.image
                                        : "/images/logo-sena.png"
                                }
                                alt={`${user.firstName} ${user.lastName}`}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full object-cover border-2 border-azul-cielo/30 group-hover:border-primary transition-colors duration-300"
                            />
                            <div className={`
                                absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                ${user.status === "activo" 
                                    ? "bg-success text-white" 
                                    : "bg-danger text-white"
                                }
                            `}>
                                {user.status === "activo" ? "✓" : "✕"}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-bold text-azul-oscuro group-hover:text-primary transition-colors duration-300">
                                {`${user.firstName} ${user.lastName}`}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`
                                    inline-block px-3 py-1 text-sm font-semibold rounded-full
                                    ${user.role === "admin" ? "bg-warning/20 text-azul-oscuro" :
                                      user.role === "instructor" ? "bg-info/20 text-azul-oscuro" :
                                      "bg-primary/20 text-azul-oscuro"}
                                `}>
                                    {user.role}
                                </span>
                                <span className="text-sm text-azul-marino/70">
                                    ID: {user.id}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Información personal */}
                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-azul-oscuro mb-2 border-b border-azul-cielo/30 pb-1">
                                Información Personal
                            </h3>
                            <p className="flex items-center text-sm text-azul-marino/70">
                                <span className="mr-2 w-4">📧</span>
                                {user.email || "No especificado"}
                            </p>
                            <p className="flex items-center text-sm text-azul-marino/70">
                                <span className="mr-2 w-4">📱</span>
                                {user.phone || "No especificado"}
                            </p>
                            <p className="flex items-center text-sm text-azul-marino/70">
                                <span className="mr-2 w-4">🆔</span>
                                {user.documentType && user.documentNumber 
                                    ? `${user.documentType}: ${user.documentNumber}`
                                    : "Documento no especificado"
                                }
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-azul-oscuro mb-2 border-b border-azul-cielo/30 pb-1">
                                Información Académica
                            </h3>
                            <p className="flex items-center text-sm text-azul-marino/70">
                                <span className="mr-2 w-4">👥</span>
                                {user.group?.programName || "Sin programa asignado"}
                            </p>
                            {user.group?.fichaNumber && (
                                <p className="flex items-center text-sm text-azul-marino/70">
                                    <span className="mr-2 w-4">📋</span>
                                    Ficha: {user.group.fichaNumber}
                                </p>
                            )}
                            <p className="flex items-center text-sm text-azul-marino/70">
                                <span className="mr-2 w-4">📊</span>
                                Estado: {user.status || "No especificado"}
                            </p>
                        </div>
                    </div>

                    {/* Fechas */}
                    <div className="flex-shrink-0 text-right">
                        <h3 className="text-sm font-semibold text-azul-oscuro mb-2">
                            Registro
                        </h3>
                        {user.createdAt && (
                            <p className="text-xs text-azul-marino/60 mb-1">
                                <span className="block">� Creado</span>
                                {new Date(user.createdAt).toLocaleDateString("es-CO")}
                            </p>
                        )}
                        {user.updatedAt && (
                            <p className="text-xs text-azul-marino/60">
                                <span className="block">🔄 Actualizado</span>
                                {new Date(user.updatedAt).toLocaleDateString("es-CO")}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer solo en móvil */}
            <div className="mt-4 pt-3 border-t border-azul-cielo/20 flex flex-col sm:flex-row gap-2 sm:justify-between text-xs text-azul-marino/60 lg:hidden">
                {user.createdAt && (
                    <div className="flex items-center justify-center sm:justify-start">
                        <span className="mr-1">📅</span>
                        Creado: {new Date(user.createdAt).toLocaleDateString("es-CO")}
                    </div>
                )}
                {user.updatedAt && (
                    <div className="flex items-center justify-center sm:justify-start">
                        <span className="mr-1">🔄</span>
                        Actualizado: {new Date(user.updatedAt).toLocaleDateString("es-CO")}
                    </div>
                )}
            </div>
        </section>
    );
}