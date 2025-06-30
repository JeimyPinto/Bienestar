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
        colorWpp: "var(--whatsapp)",
        
        // Extensiones de colores con variantes
        'verde': "var(--verde-corporativo)",
        'verde-claro': "var(--verde-corporativo)",
        'verde-oscuro': "color-mix(in srgb, var(--verde-corporativo) 80%, black 20%)",
        'rojo': "var(--danger)",
        'rojo-claro': "color-mix(in srgb, var(--danger) 80%, white 20%)",
        'rojo-oscuro': "color-mix(in srgb, var(--danger) 80%, black 20%)",
        'amarillo-claro': "color-mix(in srgb, var(--amarillo) 80%, white 20%)",
        'amarillo-oscuro': "color-mix(in srgb, var(--amarillo) 80%, black 20%)"
      },
      
      animation: {
        'slide-in-right': 'slideInFromRight 0.3s ease-out',
        'slide-in-left': 'slideInFromLeft 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' }
        }
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px'
      }
    },
  },
  plugins: [],
}