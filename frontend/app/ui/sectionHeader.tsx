import React from "react";
import { SectionHeaderProps } from "../types/components";
import IcoBack from "./icoBack";


export default function SectionHeader({ title, buttonText, onButtonClick }: SectionHeaderProps) {
  return (
    <main className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <IcoBack className="flex-shrink-0" />
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          {title}
        </h1>
      </div>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300 flex-shrink-0"
        >
          {buttonText}
        </button>
      )}
    </main>
  );
}