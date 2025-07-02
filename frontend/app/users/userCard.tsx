"use client"

import Image from "next/image"
import { User } from "../../types"

export default function UserCard({ user, onClick }: { user: User | null, onClick?: () => void }) {
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
                transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                cursor-pointer group max-w-md mx-auto w-full
            "
            onClick={onClick}
            tabIndex={0}
            aria-label={`Editar usuario ${user.firstName} ${user.lastName}`}
            onKeyDown={e => { if (e.key === "Enter" && onClick) onClick(); }}
        >
            <div className="flex flex-col sm:flex-row items-center gap-4">
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
                            {user.email}
                        </p>
                        <p className="flex items-center justify-center sm:justify-start break-words">
                            <span className="mr-2">📱</span>
                            {user.phone}
                        </p>
                        <p className="flex items-center justify-center sm:justify-start break-words">
                            <span className="mr-2">🆔</span>
                            {user.documentType}: {user.documentNumber}
                        </p>
                        <p className="flex items-center justify-center sm:justify-start break-words">
                            <span className="mr-2">👥</span>
                            {user.group?.programName ?? "Sin Ficha asignada"}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-azul-cielo/20 flex flex-col sm:flex-row gap-2 sm:justify-between text-xs text-azul-marino/60">
                <div className="flex items-center justify-center sm:justify-start">
                    <span className="mr-1">📅</span>
                    Creado: {new Date(user.createdAt).toLocaleDateString("es-CO")}
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                    <span className="mr-1">🔄</span>
                    Actualizado: {new Date(user.updatedAt).toLocaleDateString("es-CO")}
                </div>
            </div>
        </section>
    );
}