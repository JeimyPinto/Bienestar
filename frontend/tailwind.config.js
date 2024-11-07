/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        blanco: "var(--blanco)",
        cian: "var(--color-azul-claro)",
        azul: "var(--color-azul-oscuro)",
        magenta: "var(--color-magenta)",
        amarillo: "var(--color-amarillo)",
      },
    },
  },
  plugins: [],
}