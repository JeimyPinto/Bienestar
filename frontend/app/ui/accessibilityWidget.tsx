"use client"
import React, { useState, useEffect } from "react";

export default function AccessibilityWidget() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.backgroundColor = highContrast ? "#000" : "";
    document.body.style.color = highContrast ? "#fff" : "";
  }, [fontSize, highContrast]);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        zIndex: 9999,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        minWidth: 120,
        textAlign: "center"
      }}
      aria-label="Panel de accesibilidad"
    >
      <div style={{ marginBottom: 8, fontWeight: "bold" }}>Accesibilidad</div>
      <button
        aria-label="Reducir letra"
        onClick={() => setFontSize(f => Math.max(12, f - 2))}
        style={{ margin: "0 4px" }}
      >
        A-
      </button>
      <button
        aria-label="Aumentar letra"
        onClick={() => setFontSize(f => Math.min(32, f + 2))}
        style={{ margin: "0 4px" }}
      >
        A+
      </button>
      <button
        aria-label="Alto contraste"
        onClick={() => setHighContrast(h => !h)}
        style={{
          margin: "0 4px",
          background: highContrast ? "#222" : "#eee",
          color: highContrast ? "#fff" : "#222",
          border: "1px solid #888",
          borderRadius: 4,
          padding: "2px 8px"
        }}
      >
        {highContrast ? "Normal" : "Contraste"}
      </button>
    </div>
  );
}