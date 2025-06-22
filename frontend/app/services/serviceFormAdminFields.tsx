import React from "react";
import { User, Service } from "../types/index";

interface Props {
  newService: Service;
  user: User | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ServiceFormAdminFields: React.FC<Props> = ({ newService, user, handleInputChange }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-azul">Creador</label>
      <input
        type="text"
        name="creator"
        value={user?.firstName ? user.firstName + " " + user.lastName : ""}
        readOnly
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
        tabIndex={-1}
      />
      <input type="hidden" name="creatorId" value={user?.id ?? ""} />
    </div>
    <div>
      <label className="block text-sm font-medium text-azul">Estado</label>
      <select
        name="status"
        value={newService.status}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 border border-gris rounded-md shadow-sm focus:outline-none focus:ring-azul focus:border-azul"
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
    </div>
  </>
);

export default ServiceFormAdminFields;
