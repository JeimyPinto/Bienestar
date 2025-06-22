import { useState, useEffect } from "react";
import { Group } from "../types/group";
import { getAllInstructors } from "../services/services/user";
import { User } from "../types/user";
import getToken from "../lib/getToken";

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

export interface GroupFormProps {
    dialogRef: React.RefObject<HTMLDialogElement>;
    closeDialog: () => void;
    onClose: () => void;
    mode: "create" | "edit";
    groupToEdit?: Group;
    setSuccessMessage?: (msg: string) => void;
    setErrorMessage?: (msg: string) => void;
}

export default function GroupForm({ dialogRef, closeDialog, onClose, mode, groupToEdit, setSuccessMessage, setErrorMessage }: GroupFormProps) {
    const [newGroup, setNewGroup] = useState<Group>(emptyGroup);
    const [instructors, setInstructors] = useState<User[]>([]);
    const [instructorsLoading, setInstructorsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchInstructors() {
            setInstructorsLoading(true);
            const token = getToken();
            if (!token) {
                setErrorMessage?.("No hay sesión activa. Por favor, inicia sesión.");
                setInstructors([]);
                setInstructorsLoading(false);
                return;
            }
            const res = await getAllInstructors(token);
            if (!res.error) setInstructors(res.users);
            setInstructorsLoading(false);
        }
        fetchInstructors();
    }, []);

    useEffect(() => {
        if (mode === "edit" && groupToEdit) {
            setNewGroup(groupToEdit);
        } else if (mode === "create") {
            setNewGroup(emptyGroup);
        }
    }, [mode, groupToEdit]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setNewGroup((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Aquí iría la lógica para crear o editar la ficha
        setSuccessMessage?.("Funcionalidad de guardado pendiente");
        onClose();
        closeDialog();
    }

    return (
        <dialog ref={dialogRef} className="rounded-lg shadow-xl p-6 bg-blanco w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-azul">
                    {mode === "create" ? "Añadir Nueva Ficha" : "Editar Ficha"}
                </h2>
                <button onClick={closeDialog} className="text-cian hover:text-azul transition-colors">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-azul">Número de Ficha</label>
                    <input type="text" name="fichaNumber" value={newGroup.fichaNumber} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-azul">Nombre del Programa</label>
                    <input type="text" name="programName" value={newGroup.programName} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-azul">Tipo de Programa</label>
                    <select name="programType" value={newGroup.programType} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required>
                        <option value="tecnico">Técnico</option>
                        <option value="tecnologia">Tecnología</option>
                        <option value="complementaria">Complementaria</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-azul">Instructor</label>
                    <select
                        name="instructorId"
                        value={newGroup.instructorId || ""}
                        onChange={handleInputChange}
                        className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none"
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
                <div>
                    <label className="block text-sm font-medium text-azul">Estado de Ficha</label>
                    <select name="fichaStatus" value={newGroup.fichaStatus} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required>
                        <option value="etapa lectiva">Etapa lectiva</option>
                        <option value="etapa practica">Etapa práctica</option>
                        <option value="certificados">Certificados</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-cian text-blanco py-2 px-6 rounded-lg shadow-md hover:bg-azul transition-all duration-300 focus:ring-4 focus:ring-cian">
                        {mode === "create" ? "Guardar" : "Actualizar"}
                    </button>
                </div>
            </form>
        </dialog>
    );
}
