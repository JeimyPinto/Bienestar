import React from "react";
export { PaginationControlsProps } from "../types/components/type";


const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, totalUsers, setCurrentPage }) => (
  <nav className="flex flex-col md:flex-row justify-between items-center gap-2 mt-4">
    <button
      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-md font-semibold transition ${currentPage === 1
        ? "bg-cian text-azul cursor-not-allowed"
        : "bg-amarillo text-azul hover:bg-azul hover:text-blanco"
        }`}
    >
      Anterior
    </button>
    <span className="text-azul text-sm">
      Página <span className="font-bold">{currentPage}</span> de <span className="font-bold">{totalPages}</span> &mdash; Total: <span className="font-bold">{totalUsers}</span> usuarios
    </span>
    <button
      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-md font-semibold transition ${currentPage === totalPages
        ? "bg-cian text-azul cursor-not-allowed"
        : "bg-amarillo text-azul hover:bg-azul hover:text-blanco"
        }`}
    >
      Siguiente
    </button>
  </nav>
);

export default PaginationControls;
