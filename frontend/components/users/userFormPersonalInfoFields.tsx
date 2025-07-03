import React from "react";
import { User } from "../../interface/user";

export interface UserFormPersonalInfoFieldsProps {
  newUser: User;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function UserFormPersonalInfoFields({ newUser, handleInputChange }: UserFormPersonalInfoFieldsProps) {
  // Clases comunes para inputs y selects
  const inputClasses = "w-full px-4 py-3 border-2 border-azul-cielo/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary/50 bg-white text-azul-oscuro placeholder-azul-marino/50";
  const labelClasses = "block text-sm font-semibold text-azul-oscuro mb-2 flex items-center";

  return (
    <fieldset className="border-2 border-azul-cielo/30 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-white to-azul-cielo/5">
      <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
        <span className="mr-2">👤</span>
        Información Personal
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className={labelClasses}>
            <span className="mr-2">📝</span>
            Nombre
          </label>
          <input 
            type="text" 
            name="firstName" 
            value={newUser.firstName} 
            onChange={handleInputChange} 
            placeholder="Ingresa el nombre..."
            className={inputClasses}
            required 
          />
        </div>
        
        <div>
          <label className={labelClasses}>
            <span className="mr-2">📝</span>
            Apellido
          </label>
          <input 
            type="text" 
            name="lastName" 
            value={newUser.lastName} 
            onChange={handleInputChange} 
            placeholder="Ingresa el apellido..."
            className={inputClasses}
            required 
          />
        </div>
        
        <div className="sm:col-span-2">
          <label className={labelClasses}>
            <span className="mr-2">📧</span>
            Correo Electrónico
          </label>
          <input 
            type="email" 
            name="email" 
            value={newUser.email} 
            onChange={handleInputChange} 
            placeholder="ejemplo@correo.com"
            className={inputClasses}
            required 
          />
        </div>
        
        <div>
          <label className={labelClasses}>
            <span className="mr-2">📱</span>
            Teléfono
          </label>
          <input 
            type="text" 
            name="phone" 
            value={newUser.phone} 
            onChange={handleInputChange} 
            placeholder="+57 300 123 4567"
            className={inputClasses}
            required 
          />
        </div>
        
        <div>
          <label className={labelClasses}>
            <span className="mr-2">🆔</span>
            Tipo de Documento
          </label>
          <select 
            name="documentType" 
            value={newUser.documentType} 
            onChange={handleInputChange} 
            className={`${inputClasses} cursor-pointer`}
            required 
            aria-required="true"
          >
            <option value="" disabled>Seleccione una opción</option>
            <option value="CC">📄 Cédula de Ciudadanía</option>
            <option value="CE">🌍 Cédula de Extranjería</option>
            <option value="PA">✈️ Pasaporte</option>
            <option value="RC">👶 Registro Civil</option>
            <option value="TI">🎓 Tarjeta de Identidad</option>
            <option value="PEP">🛂 Permiso Especial de Permanencia</option>
          </select>
        </div>
        
        <div>
          <label className={labelClasses}>
            <span className="mr-2">🔢</span>
            Número de Documento
          </label>
          <input 
            type="text" 
            name="documentNumber" 
            value={newUser.documentNumber} 
            onChange={handleInputChange} 
            placeholder="12345678"
            className={inputClasses}
            required 
          />
        </div>
      </div>
    </fieldset>
  );
}
