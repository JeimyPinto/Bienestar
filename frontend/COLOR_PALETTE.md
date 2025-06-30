# 🎨 Paleta de Colores - Sistema de Bienestar

## Paleta Principal

### Colores de Marca

| Color | Hex | Variable CSS | Uso Principal |
|-------|-----|--------------|---------------|
| 🔵 Azul Claro | `#3AABB7` | `--azul-claro` | Color primario, botones principales |
| 🟣 Azul Oscuro | `#2F2254` | `--azul-oscuro` | Color secundario, headers |
| 🟢 Verde SENA | `#39A900` | `--verde-corporativo` | Éxito, confirmaciones |
| 🔷 Azul Marino | `#00324D` | `--azul-marino` | Textos importantes, fondos oscuros |
| 🌊 Azul Cielo | `#82DEF0` | `--azul-cielo` | Acentos, información |
| 🎨 Magenta | `#54224C` | `--magenta` | Acentos especiales |

### Colores Complementarios

| Color | Hex | Variable CSS | Uso Principal |
|-------|-----|--------------|---------------|
| 🌿 Verde Bosque | `#385C57` | `--verde-bosque` | Elementos naturales, alternativas |
| 🧡 Coral | `#CB7766` | `--coral` | Advertencias suaves, cálido |
| 🟡 Amarillo | `#F6DC25` | `--amarillo` | Advertencias, atención |
| 🤍 Beige Claro | `#FBFBE2` | `--beige-claro` | Fondos suaves, neutros |

### Colores Base

| Color | Hex | Variable CSS | Uso Principal |
|-------|-----|--------------|---------------|
| ⚫ Negro | `#0A0A0A` | `--negro` | Textos principales |
| ⚪ Blanco | `#FFFFFF` | `--blanco` | Fondos, textos en fondos oscuros |

## Colores Semánticos

### Estados del Sistema

| Estado | Variable CSS | Color Base | Uso |
|--------|--------------|------------|-----|
| ✅ Éxito | `--success` | Verde SENA | Confirmaciones, completado |
| ℹ️ Información | `--info` | Azul Cielo | Notificaciones informativas |
| ⚠️ Advertencia | `--warning` | Amarillo | Alertas, precauciones |
| ❌ Error | `--danger` | Coral | Errores, acciones destructivas |
| 🔵 Primario | `--primary` | Azul Claro | Acciones principales |
| 🟣 Secundario | `--secondary` | Azul Oscuro | Acciones secundarias |
| 🎨 Acento | `--accent` | Magenta | Elementos destacados |
| 🖤 Oscuro | `--dark` | Azul Marino | Textos, contrastes fuertes |

## Clases CSS Disponibles

### Tailwind CSS (Recomendado)

```tsx
// Fondos
className="bg-primary bg-secondary bg-success bg-danger"
className="bg-azul-claro bg-verde-sena bg-coral bg-beige-claro"

// Textos
className="text-primary text-secondary text-success text-danger"
className="text-azul-marino text-verde-bosque text-coral"

// Bordes
className="border-primary border-success border-azul-cielo"

// Hover states
className="hover:bg-primary hover:text-success"
```

### CSS Puro (Alternativo)

```css
.bg-primary, .bg-secondary, .bg-accent
.bg-success, .bg-info, .bg-warning, .bg-danger
.bg-azul, .bg-cian, .bg-verde-sena, .bg-verde-bosque
.bg-coral, .bg-beige, .bg-marino
```

### Gradientes Predefinidos

```css
.bg-gradient-primary     /* Azul claro → Azul cielo */
.bg-gradient-success     /* Verde SENA → Verde bosque */
.bg-gradient-corporate   /* Azul oscuro → Azul claro */
.bg-gradient-warm        /* Coral → Amarillo */
.bg-gradient-nature      /* Verde bosque → Azul cielo */
.bg-gradient-elegant     /* Azul marino → Magenta */
```

## Ejemplos de Uso

### Botones con Tailwind

```tsx
// Botón primario
<button className="bg-primary text-white hover:bg-azul-cielo px-4 py-2 rounded-lg">
  Acción Principal
</button>

// Botón de éxito
<button className="bg-success text-white hover:bg-verde-bosque px-4 py-2 rounded-lg">
  Confirmar
</button>

// Botón outline
<button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-colors">
  Secundario
</button>

// Botón con gradiente (usando CSS personalizado)
<button className="bg-gradient-corporate text-white px-6 py-3 rounded-xl shadow-lg">
  Elegante
</button>
```

### Cards y Contenedores

```tsx
// Card principal
<div className="bg-white border border-azul-cielo rounded-xl shadow-lg p-6">
  <h3 className="text-azul-oscuro text-xl font-bold mb-2">Título</h3>
  <p className="text-azul-marino">Contenido del card</p>
</div>

// Card de éxito
<div className="bg-success text-white p-4 rounded-lg shadow-md">
  <div className="flex items-center">
    <span className="text-2xl mr-2">✅</span>
    <p>Operación completada exitosamente</p>
  </div>
</div>

// Card de información
<div className="bg-azul-cielo bg-opacity-20 border-l-4 border-info p-4 rounded-r">
  <p className="text-azul-marino">ℹ️ Información importante</p>
</div>
```

### Estados y Notificaciones

```tsx
// Notificación de éxito
<div className="bg-success text-white p-4 rounded-lg flex items-center space-x-3">
  <span className="text-xl">✅</span>
  <span>Usuario creado exitosamente</span>
</div>

// Alerta de advertencia
<div className="bg-warning text-azul-marino p-4 rounded-lg flex items-center space-x-3">
  <span className="text-xl">⚠️</span>
  <span>Revisa los datos antes de continuar</span>
</div>

// Error
<div className="bg-danger text-white p-4 rounded-lg flex items-center space-x-3">
  <span className="text-xl">❌</span>
  <span>Hubo un error al procesar la solicitud</span>
</div>
```

### Formularios

```tsx
// Input principal
<input 
  className="border-2 border-azul-cielo focus:border-primary focus:ring-2 focus:ring-azul-cielo focus:ring-opacity-20 rounded-lg px-3 py-2 w-full"
  placeholder="Escribe aquí..."
/>

// Input de error
<input 
  className="border-2 border-danger focus:border-danger focus:ring-2 focus:ring-danger focus:ring-opacity-20 rounded-lg px-3 py-2 w-full"
  placeholder="Campo con error..."
/>

// Label
<label className="text-azul-oscuro font-medium text-sm mb-1 block">
  Nombre completo
</label>
```

### Navegación y Headers

```tsx
// Header principal
<header className="bg-azul-oscuro text-white shadow-lg">
  <div className="container mx-auto px-4 py-3">
    <h1 className="text-2xl font-bold">Sistema de Bienestar</h1>
  </div>
</header>

// Navegación
<nav className="bg-white border-b border-azul-cielo">
  <div className="flex space-x-8 px-6 py-4">
    <a href="#" className="text-primary hover:text-azul-oscuro font-medium">
      Inicio
    </a>
    <a href="#" className="text-azul-marino hover:text-primary font-medium">
      Servicios
    </a>
  </div>
</nav>
```

### Badges y Estados

```tsx
// Badge de estado activo
<span className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
  Activo
</span>

// Badge pendiente
<span className="bg-warning text-azul-marino px-2 py-1 rounded-full text-xs font-medium">
  Pendiente
</span>

// Badge inactivo
<span className="bg-neutral text-azul-oscuro px-2 py-1 rounded-full text-xs font-medium">
  Inactivo
</span>
```

## Accesibilidad

Todos los colores han sido seleccionados para cumplir con:

```markdown
* ✅ Contraste WCAG AA (4.5:1 mínimo)
* ✅ Daltonismo friendly
* ✅ Legibilidad en dispositivos móviles
* ✅ Coherencia visual
```

***

## Compatibilidad

- ✅ Mantiene compatibilidad con código existente usando alias
- ✅ Funciona con Tailwind CSS
- ✅ Soporta modo oscuro
- ✅ Variables CSS nativas para máximo rendimiento

