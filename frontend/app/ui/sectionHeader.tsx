import React from "react";
import { SectionHeaderProps } from "../types/components/type";
import IcoBack from "./icoBack";


export default function SectionHeader({ title, buttonText, onButtonClick }: SectionHeaderProps) {
  return (
    <main className="flex flex-col md:flex-row justify-around items-center mb-8 p-8 bg-gray-100 rounded-lg shadow-md relative">
      <IcoBack />
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 ml-20">
        {title}
      </h1>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="bg-gradient-to-r from-azul to-magenta text-white py-2 px-4 rounded-md shadow-md hover:from-green-500 hover:to-blue-500 transition-all duration-300"
        >
          {buttonText}
        </button>
      )}
    </main>
  );
}