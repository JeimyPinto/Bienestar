import React from "react";
import Image from "next/image";
import { User } from "../../interface/user";

interface UserFormImageFieldProps {
  mode: "edit" | "create";
  newUser: User;
  previewImage: string | null;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function UserFormImageField({ mode, newUser, previewImage, setNewUser, setPreviewImage }: UserFormImageFieldProps) {
  return (
    <fieldset className="border-2 border-success/30 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-white to-success/5">
      <legend className="px-3 text-azul-oscuro font-semibold flex items-center">
        <span className="mr-2">🖼️</span>
        Imagen de Perfil
      </legend>
      
      {mode === "edit" && (previewImage || newUser.image) && (
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Image 
              src={previewImage ? previewImage : `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${newUser.image}`} 
              alt={`${newUser.firstName} avatar`} 
              width={120} 
              height={120} 
              className="w-30 h-30 rounded-full object-cover border-4 border-azul-cielo/30 shadow-lg" 
            />
            <div className="absolute -bottom-2 -right-2 bg-success text-white rounded-full p-2">
              <span className="text-sm">✓</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-azul-oscuro">
          📸 Seleccionar nueva imagen
        </label>
        <input 
          type="file" 
          name="file" 
          accept="image/*" 
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setNewUser((prevUser) => ({
                ...prevUser,
                file: file,
                image: file.name,
              }));
              setPreviewImage(URL.createObjectURL(file));
            }
          }} 
          className="
            w-full border-2 border-azul-cielo/30 rounded-lg p-3 
            focus:ring-2 focus:ring-primary focus:border-primary 
            focus:outline-none transition-all duration-300
            hover:border-primary/50 bg-white
            file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:bg-primary file:text-white file:font-medium
            file:hover:bg-azul-oscuro file:transition-colors file:cursor-pointer
          " 
        />
        <p className="text-xs text-azul-marino/60 flex items-center">
          <span className="mr-1">💡</span>
          Formatos admitidos: JPG, PNG, GIF. Tamaño máximo: 5MB
        </p>
      </div>
    </fieldset>
  );
}
