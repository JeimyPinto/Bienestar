import { useEffect, useState } from "react"
import { RequestsFormProps, Request } from "../types/request"
import { User } from "../types"
import { Service } from "../types/service"
import { create, update } from "../services/services/request"
import { getAllActive as getAllServices } from "../services/services/service"
import { getAllActive as getAllUsers } from "../services/services/user"
import { ENABLED_ROLES } from "../lib/roles"
import isTokenExpired from "../lib/isTokenExpired"
import getUserToken from "../lib/getUserToken"
import getToken from "../lib/getToken"
import Spinner from "../ui/spinner"
const emptyRequest: Request = {
    id: 0,
    userId: 0,
    serviceId: 0,
    description: "",
    status: true,
};

export default function RequestsForm(props: RequestsFormProps) {
    const {
        dialogRef,
        closeDialog,
        onClose,
        mode,
        requestToEdit,
        setSuccessMessage,
        setErrorMessage,
    } = props;
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [newRequest, setNewRequest] = useState<Request>(emptyRequest);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingServices, setLoadingServices] = useState(false);

    // Obtener token y usuario autenticado
    useEffect(() => {
        const fetchData = async () => {
            const tokenValue = getToken();
            const userValue = getUserToken();
            if (tokenValue) {
                if (isTokenExpired(tokenValue)) {
                    localStorage.removeItem("token");
                    setUser(null);
                } else {
                    setUser(userValue as User);
                }
            } else {
                setUser(null);
            }
            setToken(tokenValue);
        }
        fetchData();
    }
        , []);

    //Cargar usuarios y servicios activos en el formulario
    useEffect(() => {
        if (!token) return;
        if (user && ENABLED_ROLES.includes(user.role)) {
            const loadUsers = async () => {
                setLoadingUsers(true);
                try {
                    const { message, users, error } = await getAllUsers(token);
                    if (error) {
                        setUsers([]);
                        setErrorMessage?.(error)
                        return;
                    }
                    if (Array.isArray(users)) {
                        if (message) {
                            setSuccessMessage?.(message);
                        }
                        setUsers(users);
                    } else {
                        setUsers([]);
                        setErrorMessage?.(String(message));
                    }
                } catch (error) {
                    setErrorMessage?.(String(error));
                    setUsers([]);
                } finally {
                    setLoadingUsers(false);
                }
            };
            loadUsers();
        } else {
            setUsers([]);
        }
        const loadServices = async () => {
            setLoadingServices(true);
            try {
                const { message, error, services } = await getAllServices();
                if (error) {
                    setServices([]);
                    setErrorMessage?.(
                        typeof error === "string" ? error : error?.message || String(error)
                    );
                } else {
                    if (message) {
                        setSuccessMessage?.(message);
                    }
                    if (services) {
                        setServices(services);
                    }
                }
            }
            catch (error) {
                setErrorMessage?.(String(error));
            } finally {
                setLoadingServices(false);
            }
        };
        loadServices();
    }, [token, user, setErrorMessage, setSuccessMessage]);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && requestToEdit) {
            setNewRequest(requestToEdit)
        } else if (mode === "create") {
            setNewRequest(emptyRequest)
        }
    }, [mode, requestToEdit]);


    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!token) return;

        try {
            // Convertir el valor de status a booleano si es un string ("activo"/"inactivo")
            const requestData = { ...newRequest };
            if (typeof requestData.status === "string") {
                requestData.status = requestData.status === "activo";
            }
            // Si el usuario es normal, asignar su ID real
            if (user && user.role === "user") {
                requestData.userId = Number(user.id);
            }
            if (mode === "create") {
                const { message, error } = await create(requestData, token);
                if (error) {
                    props.setErrorMessage?.(error);
                    props.setSuccessMessage?.("");
                    return;
                } else {
                    if (message) {
                        props.setSuccessMessage?.(message);
                        props.setErrorMessage?.("");
                    }
                    setNewRequest(emptyRequest); // Limpiar el formulario después de crear
                }
            } else if (mode === "edit") {
                if (!requestToEdit) {
                    props.setErrorMessage?.("No hay solicitud para editar");
                    return;
                }
                const { message, error } = await update(
                    requestToEdit.id,
                    requestData,
                    token
                );
                if (error) {
                    props.setErrorMessage?.(error);
                    closeDialog();
                    return;
                } else {
                    props.setSuccessMessage?.(message);
                    props.setErrorMessage?.("");
                    setNewRequest(emptyRequest);
                }
            }
            window.location.reload();
        } catch (error) {
            props.setErrorMessage?.(String(error)); closeDialog();
            return;
        }

        onClose?.();
        closeDialog();
    }
    return (
        <dialog
            ref={dialogRef}
            aria-modal="true"
            aria-label={mode === "create" ? "Crear Solicitud" : "Editar Solicitud"}
            className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-azul">
                    {mode === "create" ? "Crear Servicio" : "Editar Servicio"}
                </h2>
                <button
                    onClick={closeDialog}
                    aria-label="Cerrar formulario"
                    className="text-cian hover:text-azul transition-colors"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Si el usuario es admin, mostrar selectores de usuario y servicio */}
                    {user?.role === "admin" ? (
                        <div>
                            <label className="block text-sm font-medium text-azul">
                                Usuario
                            </label>
                            {loadingUsers ? (
                                <Spinner className="my-2" />
                            ) : (
                                <select
                                    name="userId"
                                    value={newRequest.userId}
                                    onChange={e =>
                                        setNewRequest({ ...newRequest, userId: Number(e.target.value) })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                                    required
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {users.map(u => (
                                        <option key={u.id} value={u.id}>
                                            {u.firstName} {u.lastName}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-azul">
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="userId"
                                value={user ? `${user.firstName} ${user.lastName}` : ""}
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
                                data-userid={user?.id}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Servicio
                        </label>
                        {loadingServices ? (
                            <Spinner className="my-2" />
                        ) : (
                            <select
                                name="serviceId"
                                value={newRequest.serviceId}
                                onChange={e =>
                                    setNewRequest({ ...newRequest, serviceId: Number(e.target.value) })
                                }
                                className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                                required
                            >
                                <option value="">Seleccione un servicio</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-azul">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={newRequest.description}
                            onChange={e =>
                                setNewRequest({ ...newRequest, description: e.target.value })
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul resize-y min-h-[120px]"
                            required
                            rows={6}
                            placeholder="Escribe aquí la historia o descripción detallada..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-azul">
                            Estado
                        </label>
                        {mode === "create" ? (
                            <input
                                type="text"
                                name="status"
                                value="Activo"
                                readOnly
                                className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100"
                            />
                        ) : (
                            <select
                                name="status"
                                value={newRequest.status ? "activo" : "inactivo"}
                                onChange={e =>
                                    setNewRequest({
                                        ...newRequest,
                                        status: e.target.value === "activo"
                                    })
                                }
                                className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cian text-blanco rounded-lg hover:bg-azul transition-colors"
                    >
                        {mode === "create" ? "Crear Solicitud" : "Actualizar Solicitud"}
                    </button>
                    <button
                        type="button"
                        onClick={closeDialog}
                        className="ml-4 px-4 py-2 bg-gris text-blanco rounded-lg hover:bg-gris-claro transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </dialog>
    );
}