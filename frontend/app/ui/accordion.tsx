import React, { useState, useRef } from 'react';

export default function Accordion({ title, content }: { title: string; content: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Maneja teclado para accesibilidad
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
        }
    };

    return (
        <div
            className="border-b sm:py-4 py-3 px-2 sm:px-4 transition-colors duration-200"
            style={{
                borderColor: "var(--color-azul-claro)",
                background: isOpen ? "var(--color-azul-claro)" : "var(--blanco)",
                color: isOpen ? "var(--blanco)" : "var(--negro)",
            }}
        >
            <button
                className="w-full flex justify-between items-center text-left text-lg sm:text-xl font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors duration-200"
                style={{
                    color: isOpen ? "var(--blanco)" : "var(--color-azul-oscuro)",
                }}
                onClick={() => setIsOpen((prev) => !prev)}
                onKeyDown={handleKeyDown}
                aria-expanded={isOpen}
                aria-controls="accordion-content"
                id="accordion-header"
            >
                <span>{title}</span>
                <span
                    className={`ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
                    aria-hidden="true"
                >
                    ▶
                </span>
            </button>
            <div
                id="accordion-content"
                role="region"
                aria-labelledby="accordion-header"
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                }}
            >
                <div
                    className="mt-2 text-base sm:text-lg px-1 sm:px-2"
                    style={{
                        color: isOpen ? "var(--blanco)" : "var(--negro)",
                        transition: "color 0.2s",
                    }}
                >
                    {content}
                </div>
            </div>
        </div>
    );
}
