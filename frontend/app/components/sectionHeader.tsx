import React from "react";
import { SectionHeaderProps } from "../../interface/components";
import IcoBack from "./icoBack";


export default function SectionHeader({ title, buttonText, onButtonClick }: SectionHeaderProps) {
  return (
    <main className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-azul-cielo/20">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
        <IcoBack className="flex-shrink-0" />
        <h1 className="text-2xl sm:text-3xl font-bold text-azul-oscuro truncate">
          {title}
        </h1>
      </div>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="
            bg-success hover:bg-verde-bosque text-white 
            py-2.5 px-4 sm:py-3 sm:px-6 rounded-xl 
            font-semibold shadow-md hover:shadow-lg 
            transition-all duration-300 
            hover:scale-105 flex items-center space-x-2
            border border-success/30 w-full sm:w-auto
            justify-center sm:justify-start
          "
        >
          <span>➕</span>
          <span className="text-sm sm:text-base">{buttonText}</span>
        </button>
      )}
    </main>
  );
}