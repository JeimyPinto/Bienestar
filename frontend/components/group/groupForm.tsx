import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Group, ProgramType, FichaStatus } from "../../interface/group";
import { useAuthContext } from "../../contexts/authContext";
import { useGroups } from "../../hooks/useGroups";
import { useUsers } from "../../hooks/useUsers";
import FormModalHeader from "../../ui/FormModalHeader";
import FormErrorDisplay from "../../ui/FormErrorDisplay";
import { ROLES } from "../../constants/roles";
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
  const { users } = useUsers({ token, mode: "byRole", role: ROLES.INSTRUCTOR });
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
    <dialog ref={dialogRef} className="fixed inset-0 z-50 flex items-center justify-center bg-azul-oscuro/40 backdrop-blur-md px-4">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-premium overflow-hidden border border-white/20 animate-scale-in">
        <FormModalHeader
          mode={mode}
          entityName="Ficha"
          onClose={handleClose}
          icon={{
            create: "M12 4v16m8-8H4",
            edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          }}
        />

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 bg-gradient-to-b from-white to-neutral/10">
          {errorMessage && (
            <div className="mb-6">
              <FormErrorDisplay error={errorMessage} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Número de Ficha */}
            <div className="space-y-2.5">
              <label htmlFor="fichaNumber" className="text-sm font-display font-semibold text-azul-marino flex items-center gap-2 ml-1">
                <Image src="/images/ico-number.svg" alt="" width={18} height={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                Número de Ficha
              </label>
              <input
                type="text"
                id="fichaNumber"
                value={fichaNumber}
                onChange={(e) => setFichaNumber(e.target.value)}
                className="w-full px-5 py-4 border border-azul-cielo/30 rounded-2xl bg-white shadow-sm placeholder-azul-marino/30 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 hover:border-azul-claro"
                placeholder="Ej: 2691851"
                disabled={loading}
                required
              />
            </div>

            {/* Nombre del Programa */}
            <div className="space-y-2.5">
              <label htmlFor="programName" className="text-sm font-display font-semibold text-azul-marino flex items-center gap-2 ml-1">
                <Image src="/images/ico-mail.svg" alt="" width={18} height={18} className="opacity-60 grayscale group-hover:opacity-100 transition-opacity" />
                Nombre del Programa
              </label>
              <input
                type="text"
                id="programName"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full px-5 py-4 border border-azul-cielo/30 rounded-2xl bg-white shadow-sm placeholder-azul-marino/30 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 hover:border-azul-claro"
                placeholder="Ej: Análisis y Desarrollo de Software"
                disabled={loading}
                required
              />
            </div>

            {/* Tipo de Programa */}
            <div className="space-y-2.5">
              <label htmlFor="programType" className="text-sm font-display font-semibold text-azul-marino flex items-center gap-2 ml-1">
                <Image src="/images/ico-copyright.svg" alt="" width={18} height={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                Tipo de Programa
              </label>
              <div className="relative group">
                <select
                  id="programType"
                  value={programType}
                  onChange={(e) => setProgramType(e.target.value as ProgramType)}
                  className="w-full px-5 py-4 border border-azul-cielo/30 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 appearance-none hover:border-azul-claro cursor-pointer"
                  disabled={loading}
                  required
                >
                  {programTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-azul-marino/40 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="space-y-2.5">
              <label htmlFor="instructor" className="text-sm font-display font-semibold text-azul-marino flex items-center gap-2 ml-1">
                <Image src="/images/ico-login.svg" alt="" width={18} height={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                Instructor Asignado
              </label>
              <div className="relative group">
                <select
                  id="instructor"
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-5 py-4 border border-azul-cielo/30 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 appearance-none hover:border-azul-claro cursor-pointer"
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
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-azul-marino/40 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Estado de la Ficha */}
            <div className="md:col-span-2 space-y-2.5">
              <label htmlFor="fichaStatus" className="text-sm font-display font-semibold text-azul-marino flex items-center gap-2 ml-1">
                <Image src="/images/ico-eye-visibility-on.svg" alt="" width={18} height={18} className="opacity-70" />
                Etapa Actual
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {fichaStatusOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      relative flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                      ${fichaStatus === option.value
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-azul-cielo/20 bg-white text-azul-marino/60 hover:border-azul-claro/40 hover:bg-neutral/5'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="fichaStatus"
                      value={option.value}
                      checked={fichaStatus === option.value}
                      onChange={(e) => setFichaStatus(e.target.value as FichaStatus)}
                      className="absolute opacity-0"
                    />
                    <span className="font-display font-bold text-sm tracking-wide">{option.label}</span>
                    {fichaStatus === option.value && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] shadow-lg animate-bounce-soft">
                        ✓
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-azul-cielo/10">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 text-azul-marino/60 font-display font-bold rounded-2xl hover:bg-danger/10 hover:text-danger transition-all duration-300 active:scale-95"
              disabled={loading}
            >
              Cerrar Formulario
            </button>
            <button
              type="submit"
              className={`
                px-10 py-4 rounded-2xl font-display font-bold text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-3
                ${loading
                  ? 'bg-neutral/50 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-primary to-azul-claro hover:shadow-primary/30 hover:scale-[1.02] active:scale-95'
                }
              `}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>{mode === "create" ? "✨ Crear Ficha" : "💾 Guardar Cambios"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default GroupForm;
