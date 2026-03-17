import React from "react";
import { User } from "../../interface/user";
import { Service } from "../../interface/service";
import { User as UserIcon, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  newService: Service;
  user: User | null;
  mode: "create" | "edit";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ServiceFormAdminFields: React.FC<Props> = ({ newService, user, mode, handleInputChange }) => (
  <div className="space-y-4">
    <div>
      <label className="flex text-sm font-semibold text-blue-800 mb-2 items-center">
        <RefreshCw size={16} className="mr-2" />
        Estado del Servicio
      </label>
      <select
        name="status"
        value={newService.status}
        onChange={handleInputChange}
        disabled={mode === "create"}
        className={`w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white text-blue-800 ${
          mode === "create" ? "opacity-70 cursor-not-allowed" : "hover:border-blue-400 cursor-pointer"
        }`}
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      {mode === "create" && (
        <p className="text-xs text-blue-600 mt-1">El estado se inicializa como Activo por defecto.</p>
      )}
    </div>
  </div>
);

export default ServiceFormAdminFields;
