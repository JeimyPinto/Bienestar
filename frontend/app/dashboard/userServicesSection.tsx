import { useServices } from "../hooks/useServices";
import { useMessages } from "../hooks/useMessages";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../constants/roles";
import ServicesGallery from "../services/servicesGallery";
import ErrorMessage from "../ui/errorMessage";

export default function UserServicesSection() {
  const { user, token } = useAuth();
  const { errorMessage, setErrorMessage } = useMessages();
  const { services, loading } = useServices({
    token,
    userId: user?.id,
    mode: 'userServices',
    onError: (message) => setErrorMessage(message)
  });

  // Solo mostrar para ADMIN/SUPERADMIN
  if (!user || (user.role !== ROLES.ADMIN && user.role !== ROLES.SUPERADMIN)) {
    return null;
  }

  return (
    <section className="bg-gradient-card backdrop-blur-sm shadow-xl rounded-2xl p-6 mt-6 border border-azul-cielo/20 hover:shadow-2xl transition-all duration-300">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="text-2xl mr-3">🛠️</div>
          <h2 className="text-2xl font-bold text-azul-oscuro">Mis Servicios</h2>
        </div>
        <p className="text-azul-marino/80">Servicios que has creado y administras</p>
      </div>
      
      {errorMessage && (
        <div className="mb-4">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary border-opacity-50 mb-3"></div>
          <span className="text-azul-marino/70">Cargando servicios...</span>
        </div>
      ) : (
        <div className="relative">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <h3 className="text-lg font-medium text-azul-oscuro mb-2">No tienes servicios creados</h3>
              <p className="text-azul-marino/70 mb-6">Comienza creando tu primer servicio desde el panel de servicios</p>
              <button
                onClick={() => window.location.href = '/services'}
                className="bg-primary hover:bg-azul-cielo text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Crear Servicio
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-azul-marino/80">
                  {services.length} servicio{services.length !== 1 ? 's' : ''} creado{services.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => window.location.href = '/services'}
                  className="text-primary hover:text-azul-cielo text-sm font-medium transition-colors duration-300 hover:underline"
                >
                  Ver todos →
                </button>
              </div>
              <ServicesGallery
                services={services}
                message="No tienes servicios creados."
              />
            </>
          )}
        </div>
      )}
    </section>
  );
}
