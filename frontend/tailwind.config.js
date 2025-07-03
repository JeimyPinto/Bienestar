/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Dashboard Stats colors
    'bg-warning/10', 'text-warning', 'border-warning/20', 'hover:bg-warning/20',
    'bg-success/10', 'text-success', 'border-success/20', 'hover:bg-success/20',
    'bg-primary/10', 'text-primary', 'border-primary/20', 'hover:bg-primary/20',
    'bg-info/10', 'text-info', 'border-info/20', 'hover:bg-info/20',
    'bg-danger/10', 'text-danger', 'border-danger/20', 'hover:bg-danger/20',
    
    // Action Cards colors
    'bg-primary', 'hover:bg-azul-cielo',
    'bg-success', 'hover:bg-verde-bosque', 
    'bg-secondary', 'hover:bg-azul-claro',
    'bg-warning', 'hover:bg-coral',
    'bg-info', 'hover:bg-azul-claro',
    'bg-danger', 'hover:bg-coral',
    
    // Role gradients
    'from-magenta', 'to-coral',
    'from-primary', 'to-azul-cielo',
    'from-success', 'to-verde-bosque',
    'from-secondary', 'to-azul-marino',
    
    // Role colors
    'text-magenta', 'text-primary', 'text-success', 'text-secondary',
    
    // Area colors
    'bg-red-500/20', 'border-red-500/30', 'text-red-600',
    'bg-blue-500/20', 'border-blue-500/30', 'text-blue-600',
    'bg-green-500/20', 'border-green-500/30', 'text-green-600',
    'bg-purple-500/20', 'border-purple-500/30', 'text-purple-600',
    'bg-orange-500/20', 'border-orange-500/30', 'text-orange-600',
    'bg-teal-500/20', 'border-teal-500/30', 'text-teal-600',
    'bg-pink-500/20', 'border-pink-500/30', 'text-pink-600',
    'bg-indigo-500/20', 'border-indigo-500/30', 'text-indigo-600',
    'bg-cyan-500/20', 'border-cyan-500/30', 'text-cyan-600',
    'bg-gray-500/20', 'border-gray-500/30', 'text-gray-600',
    
    // Common opacity variations
    'bg-azul-cielo/5', 'bg-azul-cielo/10', 'bg-azul-cielo/20', 'bg-azul-cielo/30',
    'border-azul-cielo/20', 'border-azul-cielo/30',
    'text-azul-oscuro', 'text-azul-marino', 'text-azul-marino/70', 'text-azul-marino/80',
  ],
  safelist: [
    // Clases dinámicas para estadísticas del dashboard
    'bg-primary/10', 'text-primary', 'border-primary/20', 'hover:bg-primary/20',
    'bg-success/10', 'text-success', 'border-success/20', 'hover:bg-success/20',
    'bg-warning/10', 'text-warning', 'border-warning/20', 'hover:bg-warning/20',
    'bg-danger/10', 'text-danger', 'border-danger/20', 'hover:bg-danger/20',
    'bg-info/10', 'text-info', 'border-info/20', 'hover:bg-info/20',
    'bg-secondary/10', 'text-secondary', 'border-secondary/20', 'hover:bg-secondary/20',
    'bg-accent/10', 'text-accent', 'border-accent/20', 'hover:bg-accent/20',
    
    // Colores de áreas - areaColors.ts
    'bg-azul', 'text-white', 
    'bg-magenta', 
    'text-black', 'bg-colorWpp',
    'bg-amarillo', 'text-black',
    'bg-cian',
    
    // Gradientes de roles - roleHelpers.ts
    'from-magenta', 'to-coral',
    'from-primary', 'to-azul-cielo', 
    'from-success', 'to-verde-bosque',
    'from-secondary', 'to-azul-marino',
    
    // Estados comunes
    'bg-green-100', 'text-green-700',
    'bg-red-100', 'text-red-700',
    'bg-gray-100', 'text-gray-600',
    
    // Clases de colores base que se usan dinámicamente
    'bg-azul-claro', 'bg-azul-oscuro', 'bg-verde-corporativo', 'bg-azul-marino', 
    'bg-azul-cielo', 'bg-verde-bosque', 'bg-coral', 'bg-amarillo', 'bg-beige-claro',
    'text-azul-claro', 'text-azul-oscuro', 'text-verde-corporativo', 'text-azul-marino',
    'text-azul-cielo', 'text-verde-bosque', 'text-coral', 'text-amarillo', 'text-beige-claro'
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