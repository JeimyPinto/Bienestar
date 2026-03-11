"use client";

import React from "react";
import GuardProvider from "../../components/auth/guardProvider";
import ClientHeader from "../../components/home/clientHeader";
import Footer from "../../components/home/footer";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <GuardProvider requireAuth={true}>
            <ClientHeader />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </GuardProvider>
    );
}

