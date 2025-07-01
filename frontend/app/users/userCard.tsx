"use client"

import Image from "next/image"
import { User } from "../types"

export default function UserCard({ user, onClick }: { user: User | null, onClick?: () => void }) {
    if (!user) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <p className="text-gray-500">No se encontró información del usuario.</p>
            </div>
        );
    }

    return (
        <section
            className="bg-white shadow-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6 max-w-5xl mx-auto w-full border border-azul-cielo/20"
            onClick={onClick}
            tabIndex={0}
            aria-label={`Editar usuario ${user.firstName} ${user.lastName}`}
            onKeyDown={e => { if (e.key === "Enter" && onClick) onClick(); }}
        >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src={
                            user.image
                        ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/users/" + user.image
                                : "/images/logo-sena.png"
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                        width={120}
                        height={120}
                        className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 border-4 border-azul-cielo/20"
                    />
                </div>
                <div className="text-center sm:text-left w-full flex-1 space-y-2">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-azul-oscuro break-words">
                        {`${user.firstName} ${user.lastName}`}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base">
                        <div className="space-y-1">
                            <p className="text-primary font-semibold capitalize bg-azul-cielo/10 px-3 py-1 rounded-full inline-block">
                                {user.role}
                            </p>
                            <p className="text-azul-marino break-words flex items-center">
                                <span className="mr-2">📧</span>
                                {user.email}
                            </p>
                            <p className="text-azul-marino break-words flex items-center">
                                <span className="mr-2">📱</span>
                                {user.phone}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-azul-marino break-words flex items-center">
                                <span className="mr-2">🆔</span>
                                {user.documentType}: {user.documentNumber}
                            </p>
                            <p className="text-azul-marino break-words flex items-center">
                                <span className="mr-2">🎓</span>
                                Ficha: {user.group?.programName ?? "Sin Ficha asignada"}
                            </p>
                            <p
                                className={`text-sm font-semibold px-3 py-1 rounded-full inline-flex items-center ${
                                    user.status === "activo" 
                                        ? "text-success bg-success/10 border border-success/30" 
                                        : "text-danger bg-danger/10 border border-danger/30"
                                }`}
                            >
                                <span className="mr-2">
                                    {user.status === "activo" ? "✅" : "❌"}
                                </span>
                                {user.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-azul-cielo/20">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-azul-marino/60">
                    <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>Creado: {new Date(user.createdAt).toLocaleDateString("es-CO")}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">🔄</span>
                        <span>Actualizado: {new Date(user.updatedAt).toLocaleDateString("es-CO")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}