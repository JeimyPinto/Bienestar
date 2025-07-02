import React from "react";
import { Service } from "../../interface/index";

interface Props {
  newService: Service;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ServiceFormMainFields: React.FC<Props> = ({ newService, handleInputChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
        <span className="mr-2">📝</span>
        Nombre del Servicio
      </label>
      <input
        type="text"
        name="name"
        value={newService.name}
        onChange={handleInputChange}
        placeholder="Ingresa el nombre del servicio..."
        className="
          w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          transition-all duration-300 hover:border-primary/50
          bg-white text-azul-oscuro placeholder-azul-marino/50
        "
        required
      />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
        <span className="mr-2">📄</span>
        Descripción
      </label>
      <textarea
        name="description"
        value={newService.description}
        onChange={handleInputChange}
        placeholder="Describe detalladamente el servicio..."
        rows={4}
        className="
          w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          transition-all duration-300 hover:border-primary/50
          bg-white text-azul-oscuro placeholder-azul-marino/50 resize-vertical
        "
        required
      />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
        <span className="mr-2">🏢</span>
        Área de Bienestar
      </label>
      <select
        name="area"
        value={newService.area}
        onChange={handleInputChange}
        className="
          w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          transition-all duration-300 hover:border-primary/50
          bg-white text-azul-oscuro cursor-pointer
        "
        required
      >
        <option value="Salud">🏥 Salud</option>
        <option value="Arte y Cultura">🎨 Arte y Cultura</option>
        <option value="Deporte y Recreación">⚽ Deporte y Recreación</option>
        <option value="Apoyo Socioeconomico y Reconocimiento a la Excelencia">💰 Apoyo Socioeconómico y Reconocimiento a la Excelencia</option>
        <option value="Apoyo Psicosocial">🧠 Apoyo Psicosocial</option>
      </select>
    </div>
  </div>
);

export default ServiceFormMainFields;
