import { useServices } from "../hooks/useServices";
import { useMessages } from "../hooks/useMessages";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../lib/roles";
import ServicesGallery from "../services/servicesGallery";
import ErrorMessage from "../ui/errorMessage";

export default function UserServicesSection() {
  const { user, token } = useAuth();
  const { errorMessage, setErrorMessage } = useMessages();
  const { services, loading } = useServices({
    token,
    userId: user?.id,
    mode: 'userServices',
    onError: (message: string) => setErrorMessage(message)
  });

  // Solo mostrar para ADMIN/SUPERADMIN
  if (!user || (user.role !== ROLES.ADMIN && user.role !== ROLES.SUPERADMIN)) {
    return null;
  }

  return (
    <section className="bg-white shadow-lg rounded-2xl p-6 mt-6 border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="text-2xl mr-3">🛠️</div>
          <h2 className="text-2xl font-bold text-gray-800">Mis Servicios</h2>
        </div>
        <p className="text-gray-600">Servicios que has creado y administras</p>
      </div>
      
      {errorMessage && (
        <div className="mb-4">
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-opacity-50 mb-3"></div>
          <span className="text-gray-500">Cargando servicios...</span>
        </div>
      ) : (
        <div className="relative">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No tienes servicios creados</h3>
              <p className="text-gray-500 mb-6">Comienza creando tu primer servicio desde el panel de servicios</p>
              <button
                onClick={() => window.location.href = '/services'}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Crear Servicio
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  {services.length} servicio{services.length !== 1 ? 's' : ''} creado{services.length !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => window.location.href = '/services'}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
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
