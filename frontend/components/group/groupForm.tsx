import React from "react";
import { Group } from "../../interface/group";

interface GroupFormProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onClose: () => void;
  mode: "create" | "edit";
  groupToEdit?: Group;
  setSuccessMessage?: (message: string) => void;
  setErrorMessage?: (message: string) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({
  dialogRef,
  onClose,
  mode
}) => {
  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {mode === "create" ? "Crear Grupo" : "Editar Grupo"}
        </h3>
        <p className="text-gray-600 mb-4">
          Formulario de grupo - Componente en desarrollo
        </p>
        <div className="modal-action">
          <button 
            onClick={onClose}
            className="btn btn-primary"
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default GroupForm;
