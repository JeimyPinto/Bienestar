import { useState, useEffect } from "react";
import { User } from "../../interface/user"
import { create, update } from "../../services/user";
import UserFormPersonalInfoFields from "./userFormPersonalInfoFields";
import UserFormAdminFields from "./userFormAdminFields";
import UserFormImageField from "./userFormImageField";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGroups } from "../../hooks/useGroups";

interface UserFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    onClose?: () => void;
    mode: "create" | "edit";
    setErrorMessage?: (msg: string) => void;
    setSuccessMessage?: (msg: string) => void;
    userToEdit?: User;
}

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
    const { dialogRef, onClose, mode, setErrorMessage, setSuccessMessage, userToEdit } = props;
    const { token } = useAuthContext();
    const [formError, setFormError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<User>(emptyUser);
    const [previewImage, setPreviewImage] = useState<string | null>("");

    // Inicializar formulario según el modo
    useEffect(() => {
        if (mode === "edit" && userToEdit) {
            setNewUser({ ...userToEdit });
            // Mostrar imagen actual si existe
            if (userToEdit.image) {
                setPreviewImage(`${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${userToEdit.image}`);
            } else {
                setPreviewImage("");
            }
        } else if (mode === "create") {
            setNewUser(emptyUser);
            setPreviewImage("");
        }
    }, [mode, userToEdit]);

    // Función para resetear el formulario
    const resetForm = () => {
        setNewUser(emptyUser);
        setPreviewImage("");
        setFormError("");
    };

    // Hook para manejo de grupos
    const {
        groups,
        loading: groupsLoading
    } = useGroups({
        token,
        onError: (error: string) => setFormError(error)
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewUser((prevUser: User) => ({
            ...prevUser,
            [name]: name === "groupId" && value !== "" ? Number(value) : value,
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (isSubmitting) return; // Evitar múltiples envíos

        setIsSubmitting(true); // Iniciar loading
        setFormError("");
        const userToSend = { ...newUser };
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
                    token || undefined
                );
                if (responseData.error) {
                    const errorMsg = responseData.message || "Error desconocido";
                    setFormError(errorMsg);
                    setErrorMessage?.(errorMsg);
                    return;
                } else {
                    setSuccessMessage?.("Usuario creado exitosamente");
                    resetForm(); 
                    // Delay para que se vea el mensaje antes de notificar al padre
                    setTimeout(() => {
                        onClose?.();
                    }, 100);
                }
            } else if (mode === "edit") {
                responseData = await update(
                    userToSend.id,
                    userToSend,
                    userToSend.file ? userToSend.file : undefined,
                    token || undefined
                );
                if (responseData.error) {
                    setFormError(responseData.message);
                    setErrorMessage?.(responseData.message);
                    return;
                } else {
                    setSuccessMessage?.(responseData.message);
                    setTimeout(() => {
                        onClose?.();
                    }, 100);
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
        } finally {
            setIsSubmitting(false); // Detener loading siempre
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-xl shadow-2xl bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 border border-azul-claro/20 w-full max-w-4xl mx-auto backdrop-blur-sm"
        >
            {/* Header con gradiente */}
            <FormModalHeader
                mode={mode}
                entityName="Usuario"
                onClose={onClose || (() => {})}
            />

            {/* Contenido del formulario */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={isSubmitting} className="space-y-6">
                        {/* Layout responsivo para campos principales e imagen */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1 lg:w-2/3">
                                <UserFormPersonalInfoFields
                                    newUser={newUser}
                                    handleInputChange={handleInputChange}
                                />
                            </div>
                            <div className="lg:w-1/3 flex justify-center lg:justify-start">
                                <UserFormImageField
                                    mode={mode}
                                    newUser={newUser}
                                    previewImage={previewImage}
                                    setNewUser={setNewUser}
                                    setPreviewImage={setPreviewImage}
                                />
                            </div>
                        </div>

                        {/* Campos administrativos */}
                        <UserFormAdminFields
                            newUser={newUser}
                            handleInputChange={handleInputChange}
                            groups={groups}
                            groupsLoading={groupsLoading}
                        />
                    </fieldset>

                    {/* Mensaje de error */}
                    <FormErrorDisplay error={formError} />

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg border border-gray-300 hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gradient-to-r from-azul-claro to-azul-oscuro text-white font-medium rounded-lg hover:from-azul-oscuro hover:to-azul-marino focus:outline-none focus:ring-2 focus:ring-azul-claro focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            {isSubmitting 
                                ? (mode === "create" ? "Guardando..." : "Actualizando...")
                                : (mode === "create" ? "Guardar Usuario" : "Actualizar Usuario")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
