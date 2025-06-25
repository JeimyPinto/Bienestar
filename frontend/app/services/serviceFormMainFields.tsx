import React from "react";
import { Service } from "../types/index";

interface Props {
  newService: Service;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ServiceFormMainFields: React.FC<Props> = ({ newService, handleInputChange }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-azul">Nombre</label>
      <input
        type="text"
        name="name"
        value={newService.name}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-azul">Descripción</label>
      <input
        type="text"
        name="description"
        value={newService.description}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-azul">Área</label>
      <select
        name="area"
        value={newService.area}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
        required
      >
        <option value="Salud">Salud</option>
        <option value="Arte y Cultura">Arte y Cultura</option>
        <option value="Deporte y Recreación">Deporte y Recreación</option>
        <option value="Apoyo Socioeconomico y Reconocimiento a la Excelencia">Apoyo Socioeconómico y Reconocimiento a la Excelencia</option>
        <option value="Apoyo Psicosocial">Apoyo Psicosocial</option>
      </select>
    </div>
  </>
);

export default ServiceFormMainFields;
