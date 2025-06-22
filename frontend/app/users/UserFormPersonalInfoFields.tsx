import React from "react";
import { UserFormPersonalInfoFieldsProps } from "../types/index";

export default function UserFormPersonalInfoFields({ newUser, handleInputChange }: UserFormPersonalInfoFieldsProps) {
  return (
    <fieldset className="border border-cian rounded-lg p-4">
      <legend className="px-2 text-cian font-semibold">Información Personal</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-azul">Nombre</label>
          <input type="text" name="firstName" value={newUser.firstName} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-azul">Apellido</label>
          <input type="text" name="lastName" value={newUser.lastName} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
        </div>
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-azul">Correo Electrónico</label>
          <input type="email" name="email" value={newUser.email} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-azul">Teléfono</label>
          <input type="text" name="phone" value={newUser.phone} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
        </div>
        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-azul">Tipo de Documento</label>
          <select name="documentType" value={newUser.documentType} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required aria-required="true">
            <option value="" disabled>Seleccione una opción</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PA">Pasaporte</option>
            <option value="RC">Registro Civil</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="PEP">Permiso Especial de Permanencia</option>
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-azul">Número de Documento</label>
          <input type="text" name="documentNumber" value={newUser.documentNumber} onChange={handleInputChange} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" required />
        </div>
      </div>
    </fieldset>
  );
}
