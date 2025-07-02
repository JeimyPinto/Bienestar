/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--primary), var(--azul-cielo))',
        'gradient-success': 'linear-gradient(to right, var(--verde-corporativo), var(--verde-bosque))',
        'gradient-corporate': 'linear-gradient(to right, var(--azul-oscuro), var(--azul-claro))',
        'gradient-warm': 'linear-gradient(to right, var(--coral), var(--amarillo))',
        'gradient-nature': 'linear-gradient(to right, var(--verde-bosque), var(--azul-cielo))',
        'gradient-elegant': 'linear-gradient(to right, var(--azul-marino), var(--magenta))',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(130,222,240,0.08) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        fadeInUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideUp: {
          'from': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}