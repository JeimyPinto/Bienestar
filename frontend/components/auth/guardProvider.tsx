"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";

interface GuardProviderProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    guestOnly?: boolean;
}

/**
 * GuardProvider: Maneja la lógica de protección de rutas de forma centralizada.
 * @param requireAuth - Si es true, redirige a /auth si no está autenticado.
 * @param guestOnly - Si es true, redirige a /dashboard si ya está autenticado (ej: página de login).
 */
export default function GuardProvider({
    children,
    requireAuth = false,
    guestOnly = false
}: GuardProviderProps) {
    const { isAuthenticated, isInitialized } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isInitialized) return;

        // Lógica de protección
        if (requireAuth && !isAuthenticated) {
            console.log(`🔐 Acceso denegado a ${pathname} - Redirigiendo a /auth`);
            router.push("/auth");
            return;
        }

        if (guestOnly && isAuthenticated) {
            console.log(`✅ Ya autenticado - Redirigiendo a /dashboard desde ${pathname}`);
            router.push("/dashboard");
            return;
        }

        setIsChecking(false);
    }, [isAuthenticated, isInitialized, pathname, router, requireAuth, guestOnly]);

    // Loading state premium
    if (!isInitialized || (isChecking && (requireAuth || guestOnly))) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-azul-oscuro via-azul-marino to-azul-claro flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-white text-xl font-semibold mb-2">Verificando acceso...</h2>
                        <p className="text-azul-cielo/80 text-sm">Validando permisos de sesión</p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
