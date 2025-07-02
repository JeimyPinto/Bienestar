import React from "react";
import { UserCardMobileProps } from "../../types/user";
import UserCard from "./userCard";
import Spinner from "../../ui/spinner";

const UserCardMobile: React.FC<UserCardMobileProps> = ({ users, handleRowClick, loading }) => (
    <div className="space-y-4">
        {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-azul-cielo/20">
                    <Spinner className="text-primary" />
                    <p className="text-primary text-sm mt-4 font-medium text-center">
                        Cargando usuarios...
                    </p>
                </div>
            </div>
        ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-azul-cielo/20 text-center max-w-md">
                    <span className="text-6xl mb-4 block">👥</span>
                    <h3 className="text-xl font-bold text-azul-oscuro mb-2">No hay usuarios</h3>
                    <p className="text-azul-marino/70">
                        No se encontraron usuarios que coincidan con los criterios de búsqueda.
                    </p>
                </div>
            </div>
        ) : (
            users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleRowClick(user)}
                />
            ))
        )}
    </div>
);

export default UserCardMobile;
