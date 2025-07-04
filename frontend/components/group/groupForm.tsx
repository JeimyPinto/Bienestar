import React, { useState, useEffect } from "react";
import { Group, ProgramType, FichaStatus } from "../../interface/group";
import { useAuthContext } from "../../contexts/authContext";
import { useGroups } from "../../hooks/useGroups";
import { useUsers } from "../../hooks/useUsers";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";

interface GroupFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: (createdGroup?: Group) => void;
  mode: "create" | "edit";
  groupToEdit?: Group;
  setSuccessMessage?: (msg: string) => void;
  setErrorMessage?: (msg: string) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({
  dialogRef,
  onClose,
  mode,
  groupToEdit,
  setSuccessMessage,
  setErrorMessage: setExternalErrorMessage
}) => {
  const { token } = useAuthContext();
  const { createGroup, updateGroup } = useGroups({ token });
  const { users } = useUsers({ token, role: 'INSTRUCTOR' });

  // Estados del formulario
  const [fichaNumber, setFichaNumber] = useState("");
  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState<ProgramType>("tecnico");
  const [instructorId, setInstructorId] = useState<number | "">("");
  const [fichaStatus, setFichaStatus] = useState<FichaStatus>("etapa lectiva");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Opciones para los select
  const programTypeOptions: { value: ProgramType; label: string }[] = [
    { value: "tecnico", label: "Técnico" },
    { value: "tecnologia", label: "Tecnología" },
    { value: "complementaria", label: "Complementaria" }
  ];

  const fichaStatusOptions: { value: FichaStatus; label: string }[] = [
    { value: "etapa lectiva", label: "Etapa Lectiva" },
    { value: "etapa practica", label: "Etapa Práctica" },
    { value: "certificados", label: "Certificados" }
  ];

  // Cargar datos del grupo en modo edición
  useEffect(() => {
    if (mode === "edit" && groupToEdit) {
      setFichaNumber(groupToEdit.fichaNumber || "");
      setProgramName(groupToEdit.programName || "");
      setProgramType(groupToEdit.programType || "tecnico");
      setInstructorId(groupToEdit.instructorId || "");
      setFichaStatus(groupToEdit.fichaStatus || "etapa lectiva");
    }
  }, [mode, groupToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Función helper para mostrar errores
    const showError = (msg: string) => {
      if (setExternalErrorMessage) {
        setExternalErrorMessage(msg);
      } else {
        setErrorMessage(msg);
      }
    };

    // Validaciones
    if (!fichaNumber.trim()) {
      showError("El número de ficha es requerido");
      setLoading(false);
      return;
    }

    if (!programName.trim()) {
      showError("El nombre del programa es requerido");
      setLoading(false);
      return;
    }

    if (!instructorId) {
      showError("Debe seleccionar un instructor");
      setLoading(false);
      return;
    }

    const groupData = {
      fichaNumber: fichaNumber.trim(),
      programName: programName.trim(),
      programType,
      instructorId: Number(instructorId),
      fichaStatus
    };

    try {
      let result;
      if (mode === "create") {
        result = await createGroup(groupData as Group);
      } else if (groupToEdit) {
        result = await updateGroup(groupToEdit.id, groupData as Group);
      }

      if (result && !result.error) {
        const successMsg = mode === "create" ? "Ficha creada exitosamente" : "Ficha actualizada exitosamente";
        if (setSuccessMessage) {
          setSuccessMessage(successMsg);
        }
        onClose(groupData as Group);
      } else {
        const errorMsg = result?.message || "Error al procesar la ficha";
        if (setExternalErrorMessage) {
          setExternalErrorMessage(errorMsg);
        } else {
          setErrorMessage(errorMsg);
        }
      }
    } catch (error) {
      const errorMsg = "Error inesperado al procesar la ficha";
      if (setExternalErrorMessage) {
        setExternalErrorMessage(errorMsg);
      } else {
        setErrorMessage(errorMsg);
      }
      console.error("Error en formulario de grupo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFichaNumber("");
    setProgramName("");
    setProgramType("tecnico");
    setInstructorId("");
    setFichaStatus("etapa lectiva");
    setErrorMessage(null);
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-2xl w-full mx-4 p-0 bg-white rounded-xl shadow-2xl">
        <FormModalHeader
          mode={mode}
          entityName="Ficha"
          onClose={handleClose}
          icon={{
            create: "M12 4v16m8-8H4",
            edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          }}
        />

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMessage && (
            <FormErrorDisplay error={errorMessage} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Número de Ficha */}
            <div>
              <label htmlFor="fichaNumber" className="block text-sm font-medium text-azul-oscuro mb-2">
                Número de Ficha *
              </label>
              <input
                type="text"
                id="fichaNumber"
                value={fichaNumber}
                onChange={(e) => setFichaNumber(e.target.value)}
                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-claro focus:border-transparent transition-all duration-200"
                placeholder="Ej: 2691851"
                disabled={loading}
                required
              />
            </div>

            {/* Nombre del Programa */}
            <div>
              <label htmlFor="programName" className="block text-sm font-medium text-azul-oscuro mb-2">
                Nombre del Programa *
              </label>
              <input
                type="text"
                id="programName"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-claro focus:border-transparent transition-all duration-200"
                placeholder="Ej: Análisis y Desarrollo de Software"
                disabled={loading}
                required
              />
            </div>

            {/* Tipo de Programa */}
            <div>
              <label htmlFor="programType" className="block text-sm font-medium text-azul-oscuro mb-2">
                Tipo de Programa *
              </label>
              <select
                id="programType"
                value={programType}
                onChange={(e) => setProgramType(e.target.value as ProgramType)}
                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-claro focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              >
                {programTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Instructor */}
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-azul-oscuro mb-2">
                Instructor *
              </label>
              <select
                id="instructor"
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value ? Number(e.target.value) : "")}
                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-claro focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              >
                <option value="">Seleccionar instructor</option>
                {users.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.firstName} {instructor.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado de la Ficha */}
            <div className="md:col-span-2">
              <label htmlFor="fichaStatus" className="block text-sm font-medium text-azul-oscuro mb-2">
                Estado de la Ficha *
              </label>
              <select
                id="fichaStatus"
                value={fichaStatus}
                onChange={(e) => setFichaStatus(e.target.value as FichaStatus)}
                className="w-full px-4 py-3 border border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul-claro focus:border-transparent transition-all duration-200"
                disabled={loading}
                required
              >
                {fichaStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-azul-cielo/20">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-azul-oscuro border border-azul-cielo/30 rounded-lg hover:bg-azul-cielo/10 transition-all duration-200"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-azul-claro text-white rounded-lg hover:bg-azul-oscuro transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {mode === "create" ? "Crear Ficha" : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default GroupForm;
