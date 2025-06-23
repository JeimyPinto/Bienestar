import { useEffect, useState } from "react";
import Image from "next/image";
import { UserFormProps, User, Group } from "../types/index"
import { create, update } from "../services/services/user";
import { getAllGroups } from "../services/services/group";
import isTokenExpired from "../lib/isTokenExpired"
import getToken from "../lib/getToken"
import UserFormPersonalInfoFields from "./userFormPersonalInfoFields";
import UserFormAdminFields from "./userFormAdminFields";
import UserFormImageField from "./userFormImageField";

const emptyUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    phone: "",
    email: "",
    password: "",
    status: "activo",
    role: "user",
    image: "",
    createdAt: "",
    updatedAt: "",
    services: [],
};

export default function UserForm(props: UserFormProps) {
    const { dialogRef, onClose, mode, userToEdit, setErrorMessage } = props;
    const [token, setToken] = useState<string | null>(null);
    const [newUser, setNewUser] = useState<User>(emptyUser);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupsLoading, setGroupsLoading] = useState<boolean>(true);
    const [formError, setFormError] = useState<string>("");

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
        }
        fetchData();
    }, []);

    // Obtener grupos
    useEffect(() => {
        async function fetchGroups() {
            setGroupsLoading(true);
            const res = await getAllGroups(token || undefined);
            if (!res.error) {
                setGroups(res.groups);
            } else {
                setFormError("No se pudo obtener el listado de Fichas.");
                setGroups([]);
            }
            setGroupsLoading(false);
        }
        if (token) fetchGroups();
    }, [token]);

    // Inicializar el formulario según el modo
    useEffect(() => {
        if (mode === "edit" && userToEdit) {
            setNewUser({ ...userToEdit, password: "" });
            setPreviewImage(null); // Limpiar preview al abrir modal de edición
        } else if (mode === "create") {
            setNewUser({ ...emptyUser }); // Asegura que todos los campos estén vacíos
            setPreviewImage(null);
        }
    }, [mode, userToEdit]);

        function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: name === "groupId" && value !== "" ? Number(value) : value,
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!token) return;

        setFormError(""); // Limpiar error local antes de intentar
        let userToSend = { ...newUser };
        // Eliminar image si no hay archivo nuevo ni imagen previa
        if (!userToSend.file && !userToSend.image) {
            delete userToSend.image;
        }

        try {
            let responseData;

            if (mode === "create") {
                responseData = await create(
                    userToSend,
                    userToSend.file ? userToSend.file : undefined,
                    token
                );
                if (responseData.error) {
                    setFormError(responseData.message || "Error desconocido");
                    setErrorMessage?.(responseData.message);
                    return;
                } else {
                    onClose?.();
                }
            } else if (mode === "edit") {
                console.log("Editando usuario:", userToSend);
                responseData = await update(
                    userToSend.id,
                    userToSend,
                    userToSend.file ? userToSend.file : undefined,
                    token
                );
                if (responseData.error) {
                    setFormError(responseData.message || "Error desconocido");
                    setErrorMessage?.(responseData.message);
                    return;
                } else {
                    onClose?.();
                }
            }
        } catch (error) {
            if (mode === "create") {
                setFormError("Error al crear el usuario. / Error creating user. " + error);
                setErrorMessage?.("Error al crear el usuario. / Error creating user. " + error);
            } else if (mode === "edit") {
                setFormError("Error al actualizar el usuario. / Error updating user. " + error);
                setErrorMessage?.("Error al actualizar el usuario. / Error updating user. " + error);
            }
            return;
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-3xl mx-auto"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-azul">
                    {mode === "create"
                        ? "          Añadir Nuevo Usuario"
                        : "Editar Usuario"}
                </h2>
                <button
                    onClick={onClose}
                    className="text-cian hover:text-azul transition-colors flex items-center justify-center"
                    aria-label="Cerrar"
                    type="button"
                >
                    <Image src="/images/ico-close.svg" alt="Cerrar" width={28} height={28} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex gap-6">
                    <div className="w-full lg:w-2/3">
                        <UserFormPersonalInfoFields
                            newUser={newUser}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full flex items-center justify-center lg:w-1/3">
                        <UserFormImageField
                            mode={mode}
                            newUser={newUser}
                            previewImage={previewImage}
                            setNewUser={setNewUser}
                            setPreviewImage={setPreviewImage}
                        />
                    </div>
                </div>
                <UserFormAdminFields
                    newUser={newUser}
                    handleInputChange={handleInputChange}
                    groups={groups}
                    groupsLoading={groupsLoading}
                />
                {formError && (
                    <div className="text-red-600 text-center font-semibold">{formError}</div>
                )}
                <div className="flex justify-center">
                    <button type="submit" className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian">
                        {mode === "create" ? "Guardar" : "Actualizar"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
