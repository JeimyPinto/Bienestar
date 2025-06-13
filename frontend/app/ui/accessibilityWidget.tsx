"use client";
import React, { useState, useEffect } from "react";

export default function AccessibilityWidget() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Remueve clases previas de tamaño de fuente
    document.body.classList.remove(
      ...Array.from({ length: 11 }, (_, i) => `font-size-${12 + i * 2}`)
    );
    document.body.classList.add(`font-size-${fontSize}`);

    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [fontSize, highContrast]);

  if (!open) return null;

  return (
    <div
      className={`
        fixed top-4 right-4
        ${highContrast ? "bg-black text-yellow-300 border-yellow-400" : "bg-white border-gray-300"}
        rounded-lg p-3 z-[9999] shadow-lg min-w-[120px] text-center
        sm:top-4 sm:right-4
        md:top-6 md:right-6
        max-w-xs
        dark:bg-black dark:text-white
      `}
      aria-label="Panel de accesibilidad"
    >
      <button
        aria-label="Cerrar panel"
        onClick={() => setOpen(false)}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
        title="Cerrar"
      >
        ×
      </button>
      <div className="mb-2 font-bold">Accesibilidad</div>
      <button
        aria-label="Reducir letra"
        title="Reducir tamaño de letra"
        onClick={() => setFontSize((f) => Math.max(12, f - 2))}
        className={`mx-1 px-2 py-1 rounded border border-gray-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-base sm:text-lg
          ${fontSize === 12 ? "ring-2 ring-blue-400" : ""}
        `}
      >
        A-
      </button>
      <button
        aria-label="Aumentar letra"
        title="Aumentar tamaño de letra"
        onClick={() => setFontSize((f) => Math.min(32, f + 2))}
        className={`mx-1 px-2 py-1 rounded border border-gray-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-base sm:text-lg
          ${fontSize === 32 ? "ring-2 ring-blue-400" : ""}
        `}
      >
        A+
      </button>
      <button
        aria-label="Alto contraste"
        title="Activar/desactivar alto contraste"
        onClick={() => setHighContrast((h) => !h)}
        className={`
          mx-1 px-3 py-1 rounded border border-gray-600
          ${highContrast
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-gray-200 text-gray-900 hover:bg-gray-300"}
          transition-colors
        `}
      >
        {highContrast ? "Normal" : "Contraste"}
      </button>
    </div>
  );
}