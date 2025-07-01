import React from "react";
import { User, Service } from "../types/index";

interface Props {
  newService: Service;
  user: User | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ServiceFormAdminFields: React.FC<Props> = ({ newService, user, handleInputChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
        <span className="mr-2">👤</span>
        Creador del Servicio
      </label>
      <input
        type="text"
        name="creator"
        value={user?.firstName ? user.firstName + " " + user.lastName : "Usuario no identificado"}
        readOnly
        className="
          w-full px-4 py-3 border-2 border-neutral/30 rounded-lg 
          bg-neutral/10 text-azul-marino/70 cursor-not-allowed
          font-medium
        "
        tabIndex={-1}
      />
      <input type="hidden" name="creatorId" value={user?.id ?? ""} />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-azul-oscuro mb-2 flex items-center">
        <span className="mr-2">🔄</span>
        Estado del Servicio
      </label>
      <select
        name="status"
        value={newService.status}
        onChange={handleInputChange}
        className="
          w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
          transition-all duration-300 hover:border-primary/50
          bg-white text-azul-oscuro cursor-pointer
        "
      >
        <option value="activo">✅ Activo</option>
        <option value="inactivo">❌ Inactivo</option>
      </select>
    </div>
  </div>
);

export default ServiceFormAdminFields;
