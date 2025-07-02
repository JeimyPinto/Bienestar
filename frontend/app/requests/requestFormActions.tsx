import React from "react";
import { RequestFormActionsProps } from "../../interface/index";

const RequestFormActions: React.FC<RequestFormActionsProps> = ({
  formError,
  onClose,
}) => {
  return (
    <>
      {formError && (
        <div className="text-red-500 text-sm mt-4">{formError}</div>
      )}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-cian text-blanco rounded-lg hover:bg-azul transition-colors"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-4 px-4 py-2 bg-gris text-blanco rounded-lg hover:bg-gris-claro transition-colors"
        >
          Cancelar
        </button>
      </div>
    </>
  );
};

export default RequestFormActions;
