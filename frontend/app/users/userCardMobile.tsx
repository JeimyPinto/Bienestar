import React from "react";
import { UserCardMobileProps } from "../types/user";
import UserCard from "./userCard";
import Spinner from "../ui/spinner";

const UserCardMobile: React.FC<UserCardMobileProps> = ({ users, handleRowClick, loading }) => (
    <>
        {loading ? (
            <Spinner className="my-8" />
        ) : users.length === 0 ? (
            <div className="text-center text-azul py-8">No hay usuarios para mostrar.</div>
        ) : (
            users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleRowClick(user)}
                />
            ))
        )}
    </>
);

export default UserCardMobile;
