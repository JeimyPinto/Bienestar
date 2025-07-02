import React from "react";

interface FormModalHeaderProps {
    mode: "create" | "edit";
    entityName: string;
    createTitle?: string;
    editTitle?: string;
    createDescription?: string;
    editDescription?: string;
    onClose: () => void;
    icon?: {
        create: string;
        edit: string;
    };
}

const FormModalHeader: React.FC<FormModalHeaderProps> = ({
    mode,
    entityName,
    createTitle,
    editTitle,
    createDescription,
    editDescription,
    onClose,
    icon = {
        create: "M12 4v16m8-8H4",
        edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    }
}) => {
    const defaultTitles = {
        create: createTitle || `Añadir Nuevo ${entityName}`,
        edit: editTitle || `Editar ${entityName}`
    };

    const defaultDescriptions = {
        create: createDescription || `Complete la información para crear un nuevo ${entityName.toLowerCase()}`,
        edit: editDescription || `Modifique los campos necesarios del ${entityName.toLowerCase()}`
    };

    return (
        <div className="bg-gradient-to-r from-azul-claro to-azul-oscuro px-6 py-4 rounded-t-xl">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d={mode === "create" ? icon.create : icon.edit} 
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {mode === "create" ? defaultTitles.create : defaultTitles.edit}
                        </h2>
                        <p className="text-azul-cielo/80 text-sm">
                            {mode === "create" ? defaultDescriptions.create : defaultDescriptions.edit}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Cerrar"
                    type="button"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FormModalHeader;
