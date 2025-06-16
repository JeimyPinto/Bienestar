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
            className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-md mx-auto w-full"
            onClick={onClick}
            tabIndex={0}
            aria-label={`Editar usuario ${user.firstName} ${user.lastName}`}
            onKeyDown={e => { if (e.key === "Enter" && onClick) onClick(); }}
        >
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Image
                    src={
                        user.image
                    ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + "/users/" + user.image
                            : "/images/logo-sena.png"
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-24 h-24"
                />
                <div className="text-center sm:text-left w-full">
                    <h2 className="text-xl font-bold break-words">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="text-gray-600 font-semibold capitalize break-words">{user.role}</p>
                    <p className="text-gray-600 break-words">{user.email}</p>
                    <p className="text-gray-600 break-words">{user.phone}</p>
                    <p className="text-gray-600 break-words">
                        {user.documentType}: {user.documentNumber}
                    </p>
                    <p
                        className={`text-sm font-semibold ${user.status === "activo" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {user.status}
                    </p>
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:justify-between">
                <p>Creado: {new Date(user.createdAt).toLocaleDateString("es-CO")}</p>
                <p>Actualizado: {new Date(user.updatedAt).toLocaleDateString("es-CO")}</p>
            </div>
        </section>
    );
}