import React from "react";
import { User} from "../../interface/user";
import { Service } from "../../interface/service";

interface Props {
  newService: Service;
  user: User | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ServiceFormAdminFields: React.FC<Props> = ({ newService, user, handleInputChange }) => (
  <div className="space-y-4">
    <div>
      <label className="flex text-sm font-semibold text-blue-800 mb-2 items-center">
        <span className="mr-2">👤</span>
        Creador del Servicio
      </label>
      <input
        type="text"
        name="creator"
        value={user?.firstName ? user.firstName + " " + user.lastName : "Usuario no identificado"}
        readOnly
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed font-medium"
        tabIndex={-1}
      />
      <input type="hidden" name="creatorId" value={user?.id ?? ""} />
    </div>
    
    <div>
      <label className="flex text-sm font-semibold text-blue-800 mb-2 items-center">
        <span className="mr-2">🔄</span>
        Estado del Servicio
      </label>
      <select
        name="status"
        value={newService.status}
        onChange={handleInputChange}
        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 bg-white text-blue-800 cursor-pointer"
      >
        <option value="activo">✅ Activo</option>
        <option value="inactivo">❌ Inactivo</option>
      </select>
    </div>
  </div>
);

export default ServiceFormAdminFields;
