import { useState, useEffect } from "react";
import { User } from "../interface/user";
import { ModalMode } from "../interface/hooks";

interface UseFormInitializationOptions {
  mode: ModalMode;
  userToEdit?: User;
  emptyUser: User;
}

interface UseFormInitializationReturn {
  formData: User;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  previewImage: string | null;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  resetForm: () => void;
}

/**
 * Hook personalizado para manejar la inicialización de formularios
 * según el modo de operación (crear o editar).
 * 
 * @example
 * ```tsx
 * const {
 *   formData,
 *   setFormData,
 *   previewImage,
 *   setPreviewImage,
 *   resetForm
 * } = useFormInitialization({
 *   mode,
 *   userToEdit,
 *   emptyUser
 * });
 * ```
 */
export const useFormInitialization = ({ 
  mode, 
  userToEdit, 
  emptyUser 
}: UseFormInitializationOptions): UseFormInitializationReturn => {
  const [formData, setFormData] = useState<User>(emptyUser);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({ ...emptyUser });
    setPreviewImage(null);
  };

  // Inicializar el formulario según el modo
  useEffect(() => {
    if (mode === "edit" && userToEdit) {
      // Para editar: cargar datos del usuario sin la contraseña
      setFormData({ ...userToEdit, password: "" });
      setPreviewImage(null); // Limpiar preview al abrir modal de edición
    } else if (mode === "create") {
      // Para crear: usar formulario vacío
      setFormData({ ...emptyUser });
      setPreviewImage(null);
    }
  }, [mode, userToEdit, emptyUser]);

  return {
    formData,
    setFormData,
    previewImage,
    setPreviewImage,
    resetForm,
  };
};
