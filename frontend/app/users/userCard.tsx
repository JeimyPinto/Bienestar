"use client"


import Image from "next/image"
import { User } from "../types/user"

export default function UserCard({ user }: { user: User | null }) {
    if (!user) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <p className="text-gray-500">No se encontró información del usuario.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-md mx-auto">
            <div className="flex items-center gap-4">
                <Image
                    src={
                        user.image
                            ? (process.env.NEXT_PUBLIC_URL_FILE_STATIC || "") + user.image
                            : "/images/logo-sena.png"
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="text-gray-600 font-semibold capitalize">{user.role}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.phone}</p>
                    <p className="text-gray-600">
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
            <div className="mt-4 text-xs text-gray-500">
                <p>Creado: {new Date(user.createdAt).toLocaleDateString("es-CO")}</p>
                <p>Actualizado: {new Date(user.updatedAt).toLocaleDateString("es-CO")}</p>
            </div>
        </div>
    );
}