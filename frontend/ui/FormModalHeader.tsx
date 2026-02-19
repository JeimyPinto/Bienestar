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
        <div className="bg-gradient-to-r from-azul-oscuro to-azul-marino px-6 py-5 rounded-t-2xl border-b border-white/10">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-inner group overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <svg className="w-6 h-6 text-azul-claro relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={mode === "create" ? icon.create : icon.edit}
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
                            {mode === "create" ? defaultTitles.create : defaultTitles.edit}
                        </h2>
                        <p className="text-white/60 text-xs md:text-sm font-sans">
                            {mode === "create" ? defaultDescriptions.create : defaultDescriptions.edit}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 p-2.5 rounded-xl border border-transparent hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
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
