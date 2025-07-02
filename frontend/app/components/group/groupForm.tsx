import { useState, useEffect } from "react";
import { Group, User } from "../../../types/index";
import { getAllByRole } from "../../services/services/user";
import { create, update } from "../../services/services/group";
import { useAuth } from "../../hooks/useAuth";
import { GroupFormProps } from "../../../types/group";
import FormModalHeader from "../FormModalHeader";

const emptyGroup: Group = {
    id: 0,
    fichaNumber: "",
    programName: "",
    programType: "tecnico",
    instructorId: 0,
    fichaStatus: "etapa lectiva",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

export default function GroupForm({ dialogRef, closeDialog, onClose, mode, groupToEdit, setSuccessMessage, setErrorMessage }: GroupFormProps) {
    const [newGroup, setNewGroup] = useState<Group>(emptyGroup);
    const [instructors, setInstructors] = useState<User[]>([]);
    const [instructorsLoading, setInstructorsLoading] = useState<boolean>(true);
    const [formError, setFormError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { token } = useAuth();

    useEffect(() => {
        async function fetchInstructors() {
            setInstructorsLoading(true);
            const res = await getAllByRole("instructor", token || undefined);
            if (!res.error) {
                setInstructors(res.users);
            } else {
                setFormError(res.message);
                setInstructors([]);
            }
            setInstructorsLoading(false);
        }
        if (token) fetchInstructors();
    }, [token]);

    useEffect(() => {
        if (mode === "edit" && groupToEdit) {
            setNewGroup(groupToEdit);
        } else if (mode === "create") {
            setNewGroup(emptyGroup);
        }
    }, [mode, groupToEdit]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewGroup((prev) => ({ 
            ...prev, 
            [name]: name === "instructorId" ? Number(value) : value 
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        if (!newGroup.fichaNumber.trim() || !newGroup.programName.trim()) {
            setFormError("Todos los campos son obligatorios.");
            return;
        }
        
        setIsSubmitting(true);
        setFormError("");
        
        if (!token) {
            setFormError("No hay sesión activa. Por favor, inicia sesión.");
            setIsSubmitting(false);
            return;
        }
        
        try {
            let res = null;
            if (mode === "create") {
                res = await create({
                    fichaNumber: newGroup.fichaNumber,
                    programName: newGroup.programName,
                    programType: newGroup.programType,
                    instructorId: Number(newGroup.instructorId),
                    fichaStatus: newGroup.fichaStatus,
                }, token);
            } else if (mode === "edit" && groupToEdit) {
                res = await update(groupToEdit.id, {
                    fichaNumber: newGroup.fichaNumber,
                    programName: newGroup.programName,
                    programType: newGroup.programType,
                    instructorId: Number(newGroup.instructorId),
                    fichaStatus: newGroup.fichaStatus,
                }, token);
            }
            
            if (!res) {
                setFormError("No se pudo procesar la solicitud. Intenta de nuevo.");
                setErrorMessage?.("No se pudo procesar la solicitud. Intenta de nuevo.");
                return;
            }
            
            if (res.error) {
                setFormError(res.message || "Error al guardar la ficha");
                setErrorMessage?.(res.message || "Error al guardar la ficha");
                return;
            }
            
            setSuccessMessage?.(res.message || "Ficha guardada correctamente");
            setTimeout(() => {
                onClose();
                closeDialog();
            }, 100);
        } catch (error) {
            setFormError("Error inesperado. Intenta de nuevo.");
            setErrorMessage?.("Error inesperado. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="rounded-xl shadow-2xl bg-gradient-to-br from-white via-beige-claro/20 to-azul-cielo/10 border border-azul-claro/20 w-full max-w-3xl mx-auto backdrop-blur-sm"
        >
            {/* Header con gradiente */}
            <FormModalHeader
                mode={mode}
                entityName="Ficha"
                onClose={() => {
                    onClose();
                    closeDialog();
                }}
            />

            {/* Contenido del formulario */}
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <fieldset disabled={isSubmitting} className="space-y-6">
                        {/* Grid de campos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Número de Ficha */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-azul-oscuro">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">📋</span>
                                        Número de Ficha
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="fichaNumber"
                                    value={newGroup.fichaNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                    placeholder="Ej: 2691351"
                                    required
                                />
                            </div>

                            {/* Tipo de Programa */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-azul-oscuro">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">🎓</span>
                                        Tipo de Programa
                                    </span>
                                </label>
                                <select
                                    name="programType"
                                    value={newGroup.programType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                    required
                                >
                                    <option value="tecnico">Técnico</option>
                                    <option value="tecnologia">Tecnología</option>
                                    <option value="complementaria">Complementaria</option>
                                </select>
                            </div>
                        </div>

                        {/* Nombre del Programa - Ancho completo */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-azul-oscuro">
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">📚</span>
                                    Nombre del Programa
                                </span>
                            </label>
                            <input
                                type="text"
                                name="programName"
                                value={newGroup.programName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                placeholder="Ej: Análisis y Desarrollo de Software"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Instructor */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-azul-oscuro">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">👨‍🏫</span>
                                        Instructor
                                    </span>
                                </label>
                                <select
                                    name="instructorId"
                                    value={newGroup.instructorId || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                    required
                                >
                                    <option value="" disabled>
                                        {instructorsLoading ? "Cargando instructores..." : "Seleccione un instructor"}
                                    </option>
                                    {instructors.map((inst) => (
                                        <option key={inst.id} value={inst.id}>
                                            {inst.firstName} {inst.lastName} ({inst.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Estado de Ficha */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-azul-oscuro">
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        Estado de Ficha
                                    </span>
                                </label>
                                <select
                                    name="fichaStatus"
                                    value={newGroup.fichaStatus}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:ring-2 focus:ring-azul-claro focus:border-azul-claro outline-none transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                    required
                                >
                                    <option value="etapa lectiva">Etapa lectiva</option>
                                    <option value="etapa practica">Etapa práctica</option>
                                    <option value="certificados">Certificados</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    {/* Mensaje de error */}
                    {formError && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-coral p-4 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-coral mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                                <p className="text-coral font-medium">{formError}</p>
                            </div>
                        </div>
                    )}

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={() => {
                                onClose();
                                closeDialog();
                            }}
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
                                : (mode === "create" ? "Guardar Ficha" : "Actualizar Ficha")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
