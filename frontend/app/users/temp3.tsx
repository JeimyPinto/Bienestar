import React from "react";
import Image from "next/image";
import { UserFormImageFieldProps } from "../types/index";

export default function UserFormImageField({ mode, newUser, previewImage, setNewUser, setPreviewImage }: UserFormImageFieldProps) {
  return (
    <fieldset className="border border-cian rounded-lg p-4">
      <legend className="px-2 text-cian font-semibold">Imagen de Perfil</legend>
      {mode === "edit" && (previewImage || newUser.image) && (
        <div className="mb-4 flex justify-center">
          <Image src={previewImage ? previewImage : `${process.env.NEXT_PUBLIC_URL_FILE_STATIC?.replace(/\/$/, "")}/users/${newUser.image}`} alt={`${newUser.firstName} avatar`} width={96} height={96} className="w-24 h-24 rounded-full object-cover" />
        </div>
      )}
      <input type="file" name="file" accept="image/*" onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setNewUser((prevUser) => ({
            ...prevUser,
            file: file,
            image: file.name,
          }));
          setPreviewImage(URL.createObjectURL(file));
        }
      }} className="w-full border border-cian rounded-lg p-2 focus:ring-2 focus:ring-cian focus:outline-none" />
    </fieldset>
  );
}
