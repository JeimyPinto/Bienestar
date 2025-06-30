import { useState } from "react";
import Image from "next/image";
import { UserFormProps, User } from "../types/index"
import { create, update } from "../services/services/user";
import UserFormPersonalInfoFields from "./userFormPersonalInfoFields";
import UserFormAdminFields from "./userFormAdminFields";
import UserFormImageField from "./userFormImageField";
import { useAuth } from "../hooks/useAuth";
import { useGroups } from "../hooks/useGroups";
import { useFormInitialization } from "../hooks/useFormInitialization";

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
    const { token } = useAuth();
    const [formError, setFormError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Hook para inicialización del formulario
    const {
        formData: newUser,
        setFormData: setNewUser,
        previewImage,
        setPreviewImage,
        resetForm
    } = useFormInitialization({
        mode,
        userToEdit,
        emptyUser
    });

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
        setNewUser((prevUser) => ({
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
                    setFormError(responseData.message || "Error desconocido");
                    setErrorMessage?.(responseData.message);
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
                <fieldset disabled={isSubmitting} className="space-y-8">
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
                </fieldset>
                {formError && (
                    <div className="text-red-600 text-center font-semibold">{formError}</div>
                )}
                <div className="flex justify-center gap-4">
                    <button 
                        type="button" 
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="bg-gray-500 text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 focus:ring-4 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting && (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-4 w-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            </div>
                        )}
                        {isSubmitting 
                            ? (mode === "create" ? "Guardando..." : "Actualizando...")
                            : (mode === "create" ? "Guardar" : "Actualizar")
                        }
                    </button>
                </div>
            </form>
        </dialog>
    );
}
