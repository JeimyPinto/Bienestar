"use client";

import React from "react";
import GuardProvider from "../../components/auth/guardProvider";
import ClientHeader from "../../components/home/clientHeader";
import Footer from "../../components/home/footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith("/auth");

    return (
        <GuardProvider guestOnly={isAuthPage}>
            <ClientHeader />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </GuardProvider>
    );
}

