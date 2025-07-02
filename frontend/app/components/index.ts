// Componentes específicos de la aplicación organizados por funcionalidad

// Componentes de autenticación
export * from './auth';

// Componentes de auditoría
export * from './audits';

// Componente de header (con lógica de negocio específica)
export { default as Header } from './header';

// Componentes específicos de la aplicación
export { default as SectionHeader } from './sectionHeader';
export { default as IcoBack } from './icoBack';
export { default as FormModalHeader } from './FormModalHeader';
export { default as ColorPaletteDemo } from './paletColor/ColorPaletteDemo';
export { default as Footer } from './footer';