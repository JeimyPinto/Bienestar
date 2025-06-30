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
        // Colores base
        background: "var(--background)",
        blanco: "var(--blanco)",
        negro: "var(--negro)",
        
        // Paleta principal de marca
        'azul-claro': "var(--azul-claro)",
        'azul-oscuro': "var(--azul-oscuro)",
        'verde-corporativo': "var(--verde-corporativo)",
        'azul-marino': "var(--azul-marino)",
        'azul-cielo': "var(--azul-cielo)",
        magenta: "var(--magenta)",
        
        // Colores complementarios
        'verde-bosque': "var(--verde-bosque)",
        coral: "var(--coral)",
        amarillo: "var(--amarillo)",
        'beige-claro': "var(--beige-claro)",
        
        // Colores utilitarios
        whatsapp: "var(--whatsapp)",
        
        // Colores semánticos
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        success: "var(--success)",
        info: "var(--info)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        neutral: "var(--neutral)",
        dark: "var(--dark)",
        
        // Alias para compatibilidad con código existente
        cian: "var(--azul-claro)",
        azul: "var(--azul-oscuro)",
        'verde-sena': "var(--verde-corporativo)",
        marino: "var(--azul-marino)",
        beige: "var(--beige-claro)",
        colorWpp: "var(--whatsapp)"
      },
    },
  },
  plugins: [],
}