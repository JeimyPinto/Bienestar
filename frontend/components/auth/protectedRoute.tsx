"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../../contexts/authContext";
import { PROTECTED_ROUTES } from "../../constants/protectedRoutes";
import MustChangePasswordModal from "./mustChangePasswordModal";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Esperar a que el contexto de auth se inicialice
    if (!isInitialized) {
      return;
    }

    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    // Si es una ruta protegida y no está autenticado
    if (isProtectedRoute && !isAuthenticated) {
      console.log(`🔐 Acceso denegado a ${pathname} - Redirigiendo a /auth`);
      router.push("/auth");
      return;
    }

    // Si está en /auth y ya está autenticado, redirigir al dashboard
    if (pathname === "/auth" && isAuthenticated) {
      console.log(`✅ Ya autenticado en /auth - Redirigiendo a /dashboard`);
      router.push("/dashboard");
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, isInitialized, pathname, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (!isInitialized || isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-azul-oscuro via-azul-marino to-azul-claro flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-white text-xl font-semibold mb-2">Verificando acceso...</h2>
            <p className="text-azul-cielo/80 text-sm">
              Validando permisos de usuario
            </p>
          </div>
        </div>
      </div>
    );
  }


  // Si llegamos aquí, mostrar el contenido
  return (
    <>
      <MustChangePasswordModal />
      {children}
    </>
  );
}
