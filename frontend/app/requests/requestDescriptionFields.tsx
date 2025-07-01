import React from "react";
import { RequestDescriptionFieldsProps } from "../types/request";

const RequestDescriptionFields: React.FC<RequestDescriptionFieldsProps> = ({
  newRequest,
  setNewRequest,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-azul-oscuro">
        <span className="flex items-center">
          <span className="mr-2">📄</span>
          Descripción Detallada
        </span>
      </label>
      
      <div className="relative">
        <textarea
          name="description"
          value={newRequest.description}
          onChange={e => setNewRequest({ ...newRequest, description: e.target.value })}
          className="
            w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-xl
            focus:border-info focus:ring-4 focus:ring-info/20
            transition-all duration-300 resize-y min-h-[140px]
            placeholder:text-azul-marino/40 text-azul-oscuro
            bg-white/50 backdrop-blur-sm
          "
          required
          rows={6}
          placeholder="Describe detalladamente la situación, motivo de la remisión, antecedentes relevantes y cualquier información adicional que consideres importante..."
        />
        
        {/* Contador de caracteres */}
        <div className="absolute bottom-3 right-3 text-xs text-azul-marino/60 bg-white/80 px-2 py-1 rounded-md">
          {newRequest.description.length} caracteres
        </div>
      </div>
      
      <div className="text-xs text-azul-marino/70">
        <span className="flex items-center">
          <span className="mr-1">💡</span>
          Tip: Incluye toda la información relevante para facilitar la atención adecuada
        </span>
      </div>
    </div>
  );
};

export default RequestDescriptionFields;
