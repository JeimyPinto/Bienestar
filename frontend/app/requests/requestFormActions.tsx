import React from "react";
import { RequestFormActionsProps } from "../types/index";

const RequestFormActions: React.FC<RequestFormActionsProps> = ({
  formError,
  onClose,
}) => {
  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-azul-cielo/20 p-6 -m-6 mt-6 rounded-b-2xl">
      {formError && (
        <div className="mb-4 p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger">
          <div className="flex items-center space-x-2">
            <span className="text-lg">⚠️</span>
            <span className="font-medium text-sm">{formError}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="
            px-6 py-3 bg-neutral hover:bg-azul-marino/20 text-azul-oscuro
            rounded-xl font-medium transition-all duration-300
            hover:shadow-lg border border-neutral/30
            order-2 sm:order-1 focus-visible-custom
          "
        >
          <span className="mr-2">↩️</span>
          Cancelar
        </button>
        
        <button
          type="submit"
          className="
            px-6 py-3 bg-success hover:bg-verde-bosque text-white
            rounded-xl font-semibold transition-all duration-300
            hover:shadow-lg hover:scale-105 border border-success/30
            order-1 sm:order-2 focus-visible-custom
          "
        >
          <span className="mr-2">💾</span>
          Guardar Solicitud
        </button>
      </div>
    </div>
  );
};

export default RequestFormActions;
