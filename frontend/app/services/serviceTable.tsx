import React, { useEffect, useState, useRef } from "react";
import ErrorMessage from "../ui/errorMessage";
import ServiceForm from "./serviceForm";
import { getAll } from "../services/services/service";
import isTokenExpired from "../lib/isTokenExpired";
import getToken from "../lib/getToken";
import { Service } from "../types/service";
import ServiceTableDesktop from "./serviceTableDesktop";
import ServiceCardMobile from "./serviceCardMobile";

export default function ServicePage() {
  const [token, setToken] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedservice, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const serviceEditFormRef = useRef<HTMLDialogElement>(null);

  // Obtener token
  useEffect(() => {
    const fetchData = async () => {
      const tokenValue = getToken();
      if (tokenValue) {
        if (isTokenExpired(tokenValue)) {
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(tokenValue);
        }
      } else {
        setToken(null);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!token) {
      setError("No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }
    let isMounted = true;
    setLoading(true);
    setError(null);
    const loadServices = async () => {
      try {
        const data = await getAll(token);
        if (!isMounted) return;
        if (data.error) {
          setError(typeof data.error === "string" ? data.error : data.error?.message || String(data.error));
        } else if (data.services) {
          setServices(data.services);
        }
      } catch {
        if (isMounted) setError("Error al cargar los servicios / Error loading services.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadServices();
    return () => {
      isMounted = false;
    };
  }, [token]);

  function handleRowClick(service: Service) {
    setSelectedService(service);
    setIsFormOpen(true);
    setTimeout(() => {
      serviceEditFormRef.current?.showModal();
    }, 0);
  }

  return (
    <section className="w-full max-w-8xl mx-auto px-2 sm:px-6 py-4 sm:py-10">
      <div className="flex flex-col gap-6">
        {error && <ErrorMessage message={error} />}
        <ServiceTableDesktop
          services={services}
          loading={loading}
          onRowClick={handleRowClick}
        />
        <ServiceCardMobile
          services={services}
          loading={loading}
          onCardClick={handleRowClick}
        />
        {isFormOpen && selectedservice && (
          <ServiceForm
            dialogRef={serviceEditFormRef}
            closeDialog={() => setIsFormOpen(false)}
            onClose={() => setIsFormOpen(false)}
            mode="edit"
            serviceToEdit={selectedservice}
          />
        )}
      </div>
    </section>
  );
}

