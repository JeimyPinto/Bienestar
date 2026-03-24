"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Service } from "@/interface/service";
import { getById } from "@/services/service";
import { useAuthContext } from "@/contexts/authContext";
import { ROLES } from "@/constants/roles";
import RequestsForm from "@/components/requests/requestForm";

// Emojis y colores por área
const AREA_META: Record<string, { emoji: string; color: string; label: string }> = {
  "salud": {
    emoji: "🏥",
    color: "from-blue-500 to-cyan-500",
    label: "Salud",
  },
  "arte-y-cultura": {
    emoji: "🎨",
    color: "from-pink-500 to-purple-500",
    label: "Arte y Cultura",
  },
  "deporte-y-recreacion": {
    emoji: "⚽",
    color: "from-green-500 to-emerald-500",
    label: "Deporte y Recreación",
  },
  "apoyo-socioeconomico-y-reconocimiento-a-la-excelencia": {
    emoji: "🏆",
    color: "from-yellow-500 to-orange-500",
    label: "Apoyo Socioeconómico y Reconocimiento a la Excelencia",
  },
  "apoyo-psicosocial": {
    emoji: "🧠",
    color: "from-violet-500 to-purple-600",
    label: "Apoyo Psicosocial",
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthContext();

  const area = typeof params?.area === "string" ? params.area : "";
  const id = typeof params?.id === "string" ? params.id : "";

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const areaMeta = AREA_META[area] ?? { emoji: "📋", color: "from-azul-cielo to-azul-marino", label: area };

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      setLoading(true);
      const result = await getById(Number(id), token ?? undefined);
      if (result.error) {
        setError(result.message ?? "Error al cargar el servicio.");
      } else {
        setService(result.service ?? result);
      }
      setLoading(false);
    };
    fetchService();
  }, [id, token]);

  const handleSolicitarClick = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    setShowRequestModal(true);
  };

  const handleModalClose = () => {
    setShowRequestModal(false);
  };

  const canRequest = isAuthenticated && user?.role === ROLES.USER;
  const isStaff = isAuthenticated && (user?.role === ROLES.ADMIN || user?.role === ROLES.SUPERADMIN || user?.role === ROLES.INSTRUCTOR);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-azul-cielo/10 via-blanco to-verde-bosque/10">
        <div className="flex flex-col items-center gap-4">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${areaMeta.color} flex items-center justify-center shadow-xl animate-pulse`}>
            <span className="text-4xl">{areaMeta.emoji}</span>
          </div>
          <p className="text-azul-marino font-medium text-lg animate-pulse">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-bold text-red-700 text-center">No se encontró el servicio</h1>
        <p className="text-red-500 text-center max-w-md">{error ?? "El servicio que buscas no existe o no está disponible."}</p>
        <Link href="/services" className="px-6 py-3 bg-gradient-to-r from-azul-cielo to-azul-marino text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
          ← Ver todos los servicios
        </Link>
      </div>
    );
  }

  const isActive = service.status === "activo";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-azul-cielo/10 via-blanco to-verde-bosque/10">

        {/* Breadcrumb */}
        <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-azul-cielo/20">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm flex-wrap gap-y-1">
              <Link href="/" className="text-azul-marino hover:text-azul-cielo transition-colors">
                🏠 Inicio
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/services" className="text-azul-marino hover:text-azul-cielo transition-colors">
                🛠️ Servicios
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-azul-marino hover:text-azul-cielo transition-colors">
                {areaMeta.emoji} {areaMeta.label}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-azul-oscuro font-medium truncate max-w-[200px]">{service.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero del Servicio */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          {/* Fondo decorativo */}
          <div className={`absolute inset-0 bg-gradient-to-br ${areaMeta.color} opacity-5 pointer-events-none`} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-azul-cielo/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Columna izquierda: info */}
              <div className="space-y-8">

                {/* Título + área */}
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${areaMeta.color} shadow-xl`}>
                    <span className="text-4xl">{areaMeta.emoji}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-azul-oscuro leading-tight mb-2">
                      {service.name}
                    </h1>
                    <span className={`inline-block bg-gradient-to-r ${areaMeta.color} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm`}>
                      {areaMeta.emoji} {service.area}
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-lg text-azul-marino leading-relaxed max-w-2xl">
                  {service.description}
                </p>

                {/* Estado del servicio */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm shadow-sm border ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`} />
                    {isActive ? "Servicio Disponible" : "Servicio No Disponible"}
                  </span>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {/* Botón principal: solicitar */}
                  {canRequest && isActive && (
                    <button
                      id="btn-solicitar-servicio"
                      onClick={handleSolicitarClick}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${areaMeta.color} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg`}
                    >
                      📋 Solicitar este Servicio
                    </button>
                  )}

                  {/* Si está inactivo */}
                  {canRequest && !isActive && (
                    <div className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-500 font-semibold rounded-xl cursor-not-allowed border border-gray-200">
                      🚫 Servicio no disponible actualmente
                    </div>
                  )}

                  {/* Si no está autenticado */}
                  {!isAuthenticated && (
                    <button
                      onClick={handleSolicitarClick}
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${areaMeta.color} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg`}
                    >
                      🔐 Iniciar Sesión para Solicitar
                    </button>
                  )}

                  {/* Para personal admin/instructor: acceso al panel */}
                  {isStaff && (
                    <Link
                      href="/dashboard/services"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-azul-cielo text-azul-cielo font-semibold rounded-xl hover:bg-azul-cielo/10 transition-all duration-300"
                    >
                      ⚙️ Gestionar Servicio
                    </Link>
                  )}

                  {/* Botón secundario: volver */}
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                  >
                    ← Ver más Servicios
                  </Link>
                </div>

                {/* Aviso si servicio inactivo */}
                {!isActive && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">⏳</span>
                    <div>
                      <p className="font-semibold text-amber-800">Servicio temporalmente suspendido</p>
                      <p className="text-amber-700 text-sm mt-1">
                        Este servicio no está disponible en este momento. Por favor consulta con Bienestar al Aprendiz para más información.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Columna derecha: imagen */}
              <div className="relative hidden lg:block">
                <div className={`absolute -inset-6 bg-gradient-to-br ${areaMeta.color} opacity-10 rounded-3xl blur-xl`} />
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/50">
                  {service.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${service.image}`}
                      alt={service.name}
                      width={600}
                      height={420}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  ) : (
                    <div className={`w-full h-80 bg-gradient-to-br ${areaMeta.color} flex flex-col items-center justify-center gap-4`}>
                      <span className="text-8xl opacity-90">{areaMeta.emoji}</span>
                      <p className="text-white/80 font-medium text-lg">{service.area}</p>
                    </div>
                  )}
                </div>
                {/* Decoración flotante */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br ${areaMeta.color} opacity-20 blur-lg`} />
                <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br ${areaMeta.color} opacity-15 blur-md`} />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de detalles adicionales */}
        <section className="py-12 bg-white/60 backdrop-blur-sm border-t border-azul-cielo/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-azul-cielo/10 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-4xl">🏛️</span>
                <h3 className="font-semibold text-azul-oscuro">SENA Caldas CPIC</h3>
                <p className="text-azul-marino/70 text-sm">Centro de la Industria, la Empresa y los Servicios</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-azul-cielo/10 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-4xl">👥</span>
                <h3 className="font-semibold text-azul-oscuro">Para Aprendices</h3>
                <p className="text-azul-marino/70 text-sm">Servicio disponible para aprendices activos de la institución</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-azul-cielo/10 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-4xl">📞</span>
                <h3 className="font-semibold text-azul-oscuro">Más Información</h3>
                <p className="text-azul-marino/70 text-sm">Contacta a Bienestar al Aprendiz para mayor información</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal de solicitud */}
      {showRequestModal && (
        <RequestsForm
          dialogRef={dialogRef}
          mode="create"
          onClose={handleModalClose}
          requestToEdit={service ? {
            userId: 0,
            serviceId: Number(service.id),
            description: "",
            status: true,
            responseStatus: "pendiente",
            responseMessage: null,
            createdBy: 0,
            createdAt: "",
            updatedAt: "",
            applicant: null,
            service: service,
            creator: null,
          } : undefined}
        />
      )}
    </>
  );
}
