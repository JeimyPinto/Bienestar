import React from "react";
import { Request } from "../../interface/request";

interface RequestDescriptionFieldsProps {
  newRequest: Request;
  setNewRequest: React.Dispatch<React.SetStateAction<Request>>;
}

export default function RequestDescriptionFields({
  newRequest,
  setNewRequest,
}: RequestDescriptionFieldsProps) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-azul">Descripción</label>
      <textarea
        name="description"
        value={newRequest.description}
        onChange={(e) =>
          setNewRequest({ ...newRequest, description: e.target.value })
        }
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul resize-y min-h-[120px]"
        required
        rows={6}
        placeholder="Escribe aquí la historia o descripción detallada..."
      />
    </div>
  );
}
