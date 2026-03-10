# 🎨 Guía de Estilos y UI

Esta sección define el esquema de colores y las pautas para el diseño visual del sistema Bienestar.

## Colores por Área de Bienestar

Cada área de bienestar tiene asignado un color distintivo para facilitar su identificación visual dentro del sistema.

```typescript
const areaColors = {
  "Salud": "bg-azul text-white",
  "Arte y Cultura": "bg-magenta text-white", 
  "Deporte y Recreación": "text-black bg-colorWpp",
  "Apoyo Socioeconomico y Reconocimiento a la Excelencia": "bg-amarillo text-black",
  "Apoyo Psicosocial": "bg-cian text-black",
};
```

## Diseño Responsivo

El sistema está diseñado para ofrecer una experiencia fluida en cualquier tamaño de pantalla.

- **Desktop**: Tablas con visualización completa de datos para una gestión administrativa eficiente.
- **Mobile**: Vistas simplificadas en tarjetas (cards) optimizadas para dispositivos táctiles.
- **Breakpoints**: Uso de los breakpoints estándar de Tailwind CSS para la adaptabilidad de layouts.
- **Navegación**: Menús responsivos que se contraen o expanden según el tamaño de la pantalla.

## UX (User Experience)

- **Vistas Específicas**: Desarrollo de componentes adaptados a la interacción del usuario en cada dispositivo.
- **Interfaz Moderna**: El uso de Tailwind CSS permite un diseño limpio y profesional siguiendo las tendencias actuales.
- **Navegación Intuitiva**: Menús claros y estructurados según el rol del usuario asignado.
