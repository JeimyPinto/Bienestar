import React from "react";
import { PaginationControlsProps } from "../../interface/components";


const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, totalUsers, setCurrentPage }) => (
  <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow-md border border-azul-cielo/20">
    <button
      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className={`
        px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2
        ${currentPage === 1
          ? "bg-neutral/50 text-azul-marino/50 cursor-not-allowed border border-neutral/30"
          : "bg-primary text-white hover:bg-azul-oscuro hover:scale-105 shadow-md hover:shadow-lg border border-primary/30"
        }
      `}
    >
      <span>←</span>
      <span className="hidden sm:inline">Anterior</span>
    </button>
    
    <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-azul-marino">
      <span className="font-medium">
        Página <span className="font-bold text-primary">{currentPage}</span> de <span className="font-bold text-primary">{totalPages}</span>
      </span>
      <span className="hidden sm:inline text-azul-marino/60">•</span>
      <span className="text-azul-marino/70">
        Total: <span className="font-bold text-azul-oscuro">{totalUsers}</span> usuarios
      </span>
    </div>
    
    <button
      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`
        px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2
        ${currentPage === totalPages
          ? "bg-neutral/50 text-azul-marino/50 cursor-not-allowed border border-neutral/30"
          : "bg-primary text-white hover:bg-azul-oscuro hover:scale-105 shadow-md hover:shadow-lg border border-primary/30"
        }
      `}
    >
      <span className="hidden sm:inline">Siguiente</span>
      <span>→</span>
    </button>
  </nav>
);

export default PaginationControls;
