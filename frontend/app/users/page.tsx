"use client"


import { useEffect, useState } from "react"
import Header from "../ui/header"
import IcoBack from "../ui/icoBack"
import { User } from "../types/user"

export default function UsersPage() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        let tokenValue: string | null = null;

        // Obtener el token dependiendo del entorno
        if (
            process.env.NEXT_PUBLIC_API_URL?.includes("localhost") ||
            process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1")
        ) {
            tokenValue = localStorage.getItem("token");
        } else {
            const cookie = document.cookie;
            tokenValue =
                cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null;
        }

        if (tokenValue) {
            try {
                setUser(JSON.parse(atob(tokenValue.split(".")[1])));
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);
    return (
        <>
            <Header />
            <IcoBack />
        </>
    );
}