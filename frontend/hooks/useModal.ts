import { useState, useRef } from "react";
import { User } from "../interface/user";

// Define the UseModalReturn type if not already defined elsewhere
type ModalMode = "create" | "edit";
type UseModalReturn<T> = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  isFormOpen: boolean;
  mode: ModalMode;
  itemToEdit: T | undefined;
  openCreateDialog: (onClearMessages?: () => void) => void;
  openEditDialog: (item: T, onClearMessages?: () => void) => void;
  closeDialog: () => void;
};

export const useModal = (): UseModalReturn<User> => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("create");
  const [itemToEdit, setItemToEdit] = useState<User | undefined>(undefined);

  const openCreateDialog = (onClearMessages?: () => void) => {
    setMode("create");
    setItemToEdit(undefined);
    onClearMessages?.();
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const openEditDialog = (user: User, onClearMessages?: () => void) => {
    setMode("edit");
    setItemToEdit(user);
    onClearMessages?.();
    setIsFormOpen(true);
    setTimeout(() => dialogRef.current?.showModal(), 0);
  };

  const closeDialog = () => {
    setIsFormOpen(false);
    dialogRef.current?.close();
  };

  return {
    // Referencias
    dialogRef,
    
    // Estado
    isFormOpen,
    mode,
    itemToEdit,
    
    // Funciones
    openCreateDialog,
    openEditDialog,
    closeDialog,
  };
};
