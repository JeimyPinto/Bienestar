"use client"

import React, { useEffect, useState, useRef } from "react";
import { Service } from "../types/service";
import { User } from "../types";
import Header from "../ui/header";
import ErrorMessage from "../ui/errorMessage";
import ServicesGallery from "./servicesGallery";
import ServiceTable from "./serviceTable";
import SectionHeader from "../ui/sectionHeader";
import { getAllActive } from "../services/services/service";
import ServiceForm from "./serviceForm";
import isTokenExpired from "../lib/isTokenExpired"
import getUserToken from "../lib/getUserToken"
import getToken from "../lib/getToken"

export default function ServicePage() {
    const [user, setUser] = useState<User | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const fetchData = async () => {
          const tokenValue = getToken();
          let userValue = null;
          if (tokenValue) {
            try {
              userValue = getUserToken(tokenValue);
            } catch (e) {
              userValue = null;
            }
            if (isTokenExpired(tokenValue)) {
              localStorage.removeItem("token");
              setUser(null);
            } else {
              setUser(userValue as User);
            }
          } else {
            setUser(null);
          }
        }
        fetchData();
      }
    , []);

    useEffect(() => {
        async function fetchServices() {
            setLoading(true);
            const { services, message, error } = await getAllActive();

            if (services) {
                setServices(services);
                setMessage(typeof message === "string" ? message : "");
                setErrorMessage(""); // Limpia error si hay servicios
            } else {
                setServices([]);
                setMessage(""); // Limpia mensaje si hay error
                setErrorMessage(
                    typeof error === "string"
                        ? error
                        : error?.message || error?.toString?.() || "Ocurrió un error"
                );
            }
            setLoading(false);
        }
        fetchServices();
    }, []);

    const openCreateDialog = () => {
        setMode("create");
        setServiceToEdit(undefined);
        setIsFormOpen(true);
        setTimeout(() => dialogRef.current?.showModal(), 0);
    };

    const closeDialog = () => {
        setIsFormOpen(false);
        dialogRef.current?.close();
    };
    return (
        <>
            <Header />
            {(!user || user?.role === "user") ? (
                <main className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-cian via-white to-azul px-2 py-8 sm:px-6 sm:py-12 md:px-10 md:py-16 shadow-xl mx-auto w-full max-w-full transition-all">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-azul">Servicios Disponibles</h1>
                    <p className="mb-6 text-center text-gray-700 max-w-5xl">
                        Si no encuentras el servicio que buscas en este listado, puede ser porque actualmente no se está prestando. Algunos servicios, solo están disponibles por convocatoria (Ejemplo: Monitorias, subsidio de alimentación, apoyo socieconómico), mientras que otros están disponibles todo el tiempo.
                    </p>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cian border-opacity-50 mb-4"></div>
                            <span className="text-cian text-lg">Cargando servicios...</span>
                        </div>
                    ) : services.length > 0 ? (
                        <ServicesGallery services={services} />
                    ) : (
                        <ErrorMessage message={message} />
                    )}
                </main>
            ) : (
                <>
                    <SectionHeader
                        title="Listado de Servicios"
                        buttonText="Añadir Nuevo Servicio"
                        onButtonClick={openCreateDialog}
                    />
                    {errorMessage && (
                        <ErrorMessage message={errorMessage} />
                    )}
                    <ServiceTable />
                    {isFormOpen && (
                        <ServiceForm
                            dialogRef={dialogRef}
                            closeDialog={closeDialog}
                            onClose={closeDialog}
                            mode={mode}
                            serviceToEdit={serviceToEdit}
                            setErrorMessage={setErrorMessage}
                        />
                    )}
                </>
            )}
        </>
    );
}
