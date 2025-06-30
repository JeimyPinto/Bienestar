'use client'

/**
 * Componente de prueba para verificar que todos los colores de la paleta
 * están funcionando correctamente en Tailwind CSS
 */
export default function ColorPaletteTest() {
  const colors = [
    // Colores base
    { name: 'Negro', class: 'bg-negro', text: 'text-blanco' },
    { name: 'Blanco', class: 'bg-blanco border border-gray-300', text: 'text-negro' },
    
    // Paleta principal de marca
    { name: 'Azul Claro', class: 'bg-azul-claro', text: 'text-blanco' },
    { name: 'Azul Oscuro', class: 'bg-azul-oscuro', text: 'text-blanco' },
    { name: 'Magenta', class: 'bg-magenta', text: 'text-blanco' },
    { name: 'Amarillo', class: 'bg-amarillo', text: 'text-negro' },
    
    // Paleta extendida
    { name: 'Verde Corporativo', class: 'bg-verde-corporativo', text: 'text-blanco' },
    { name: 'Azul Marino', class: 'bg-azul-marino', text: 'text-blanco' },
    { name: 'Azul Cielo', class: 'bg-azul-cielo', text: 'text-negro' },
    { name: 'Beige Claro', class: 'bg-beige-claro border border-gray-300', text: 'text-negro' },
    { name: 'Verde Bosque', class: 'bg-verde-bosque', text: 'text-blanco' },
    { name: 'Coral', class: 'bg-coral', text: 'text-blanco' },
    
    // Colores utilitarios
    { name: 'WhatsApp', class: 'bg-whatsapp', text: 'text-blanco' },
    
    // Colores semánticos
    { name: 'Primary', class: 'bg-primary', text: 'text-blanco' },
    { name: 'Secondary', class: 'bg-secondary', text: 'text-blanco' },
    { name: 'Accent', class: 'bg-accent', text: 'text-blanco' },
    { name: 'Success', class: 'bg-success', text: 'text-blanco' },
    { name: 'Info', class: 'bg-info', text: 'text-negro' },
    { name: 'Warning', class: 'bg-warning', text: 'text-negro' },
    { name: 'Danger', class: 'bg-danger', text: 'text-blanco' },
    { name: 'Neutral', class: 'bg-neutral border border-gray-300', text: 'text-negro' },
    { name: 'Dark', class: 'bg-dark', text: 'text-blanco' },
  ]

  const gradients = [
    {
      name: 'Gradient Primary',
      class: 'bg-gradient-primary',
      text: 'text-blanco'
    },
    {
      name: 'Gradient Secondary', 
      class: 'bg-gradient-secondary',
      text: 'text-blanco'
    },
    {
      name: 'Gradient Success',
      class: 'bg-gradient-success', 
      text: 'text-blanco'
    },
    {
      name: 'Gradient Ocean',
      class: 'bg-gradient-ocean',
      text: 'text-blanco'
    }
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-azul-oscuro">
        Prueba de Paleta de Colores - Bienestar SENA
      </h1>
      
      {/* Colores sólidos */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-azul-marino">
          Colores Sólidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`${color.class} ${color.text} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="font-medium text-sm">{color.name}</div>
              <div className="text-xs opacity-80 mt-1">{color.class}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gradientes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-azul-marino">
          Gradientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gradients.map((gradient) => (
            <div
              key={gradient.name}
              className={`${gradient.class} ${gradient.text} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="font-medium">{gradient.name}</div>
              <div className="text-sm opacity-80 mt-1">{gradient.class}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplos de uso */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-azul-marino">
          Ejemplos de Uso
        </h2>
        
        {/* Botones */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-verde-bosque">Botones</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-azul-oscuro text-blanco px-6 py-2 rounded-lg transition-colors">
              Botón Primary
            </button>
            <button className="bg-success hover:bg-verde-bosque text-blanco px-6 py-2 rounded-lg transition-colors">
              Botón Success
            </button>
            <button className="bg-warning hover:bg-amarillo text-negro px-6 py-2 rounded-lg transition-colors">
              Botón Warning
            </button>
            <button className="bg-danger hover:bg-coral text-blanco px-6 py-2 rounded-lg transition-colors">
              Botón Danger
            </button>
            <button className="bg-whatsapp hover:bg-verde-corporativo text-blanco px-6 py-2 rounded-lg transition-colors">
              WhatsApp
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-verde-bosque">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blanco border border-azul-cielo rounded-lg p-6 shadow-md">
              <h4 className="text-azul-oscuro font-semibold mb-2">Card Clásica</h4>
              <p className="text-verde-bosque text-sm">Ejemplo de card con colores sutiles de la paleta.</p>
            </div>
            <div className="bg-beige-claro border border-coral rounded-lg p-6 shadow-md">
              <h4 className="text-azul-marino font-semibold mb-2">Card Neutral</h4>
              <p className="text-verde-bosque text-sm">Card con fondo neutro y bordes de acento.</p>
            </div>
            <div className="bg-gradient-primary text-blanco rounded-lg p-6 shadow-md">
              <h4 className="font-semibold mb-2">Card Gradient</h4>
              <p className="text-sm opacity-90">Card con gradiente de la paleta corporativa.</p>
            </div>
          </div>
        </div>

        {/* Textos */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-verde-bosque">Textos</h3>
          <div className="space-y-2">
            <p className="text-azul-oscuro">Texto en azul oscuro corporativo</p>
            <p className="text-verde-corporativo">Texto en verde SENA oficial</p>
            <p className="text-azul-marino">Texto en azul marino para encabezados</p>
            <p className="text-coral">Texto en coral para alertas o destacados</p>
            <p className="text-verde-bosque">Texto en verde bosque para contenido secundario</p>
          </div>
        </div>
      </section>

      {/* Información de compatibilidad */}
      <section className="bg-beige-claro border border-azul-cielo rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-azul-marino">
          ✅ Estado de la Paleta
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-verde-bosque mb-2">CSS Variables</h3>
            <p className="text-sm text-azul-oscuro">
              Todos los colores están definidos como variables CSS en <code className="bg-blanco px-1 rounded">globals.css</code>
            </p>
          </div>
          <div>
            <h3 className="font-medium text-verde-bosque mb-2">Tailwind Classes</h3>
            <p className="text-sm text-azul-oscuro">
              Todas las clases están disponibles en Tailwind CSS via <code className="bg-blanco px-1 rounded">tailwind.config.js</code>
            </p>
          </div>
          <div>
            <h3 className="font-medium text-verde-bosque mb-2">Gradientes</h3>
            <p className="text-sm text-azul-oscuro">
              Gradientes personalizados disponibles como clases utilitarias CSS
            </p>
          </div>
          <div>
            <h3 className="font-medium text-verde-bosque mb-2">Semánticos</h3>
            <p className="text-sm text-azul-oscuro">
              Colores semánticos (primary, success, etc.) mapeados correctamente
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
