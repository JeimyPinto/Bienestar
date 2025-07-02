import React from 'react';
import { Button, Card, Badge, Alert, Container, Input, Select } from '../index';

export default function ColorPaletteDemo() {
  const colors = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-primary' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary' },
    { name: 'Success', bg: 'bg-success', text: 'text-success' },
    { name: 'Warning', bg: 'bg-warning', text: 'text-warning' },
    { name: 'Danger', bg: 'bg-danger', text: 'text-danger' },
    { name: 'Info', bg: 'bg-info', text: 'text-info' },
    { name: 'Verde SENA', bg: 'bg-verde-sena', text: 'text-verde-sena' },
    { name: 'Coral', bg: 'bg-coral', text: 'text-coral' },
    { name: 'Azul Marino', bg: 'bg-marino', text: 'text-marino' },
    { name: 'Verde Bosque', bg: 'bg-verde-bosque', text: 'text-verde-bosque' },
  ];

  const gradients = [
    { name: 'Corporate', class: 'bg-gradient-corporate' },
    { name: 'Nature', class: 'bg-gradient-nature' },
    { name: 'Warm', class: 'bg-gradient-warm' },
    { name: 'Elegant', class: 'bg-gradient-elegant' },
  ];

  return (
    <Container size="xl" className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-azul-oscuro mb-8">
          🎨 Demostración de Paleta de Colores y Componentes UI
        </h1>

        {/* Demostración de nuevos componentes UI */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-azul-marino mb-6">Componentes UI Básicos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Botones */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Botones</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Primario
                </Button>
                <Button variant="success" className="w-full">
                  Éxito
                </Button>
                <Button variant="warning" className="w-full">
                  Advertencia
                </Button>
                <Button variant="danger" size="sm" className="w-full">
                  Peligro (Pequeño)
                </Button>
              </div>
            </Card>

            {/* Alertas */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Alertas</h3>
              <div className="space-y-3">
                <Alert variant="success" title="Éxito">
                  Operación completada correctamente
                </Alert>
                <Alert variant="warning">
                  ⚠️ Advertencia importante
                </Alert>
                <Alert variant="danger">
                  ❌ Error crítico detectado
                </Alert>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Estados (Badges)</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Activo</Badge>
                <Badge variant="warning">Pendiente</Badge>
                <Badge variant="info">Información</Badge>
                <Badge variant="neutral">Inactivo</Badge>
                <Badge variant="danger" size="sm">Error</Badge>
              </div>
            </Card>
          </div>

          {/* Formularios */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Componentes de Formulario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Email" 
                type="email" 
                placeholder="ejemplo@correo.com"
                icon="📧"
              />
              <Select
                label="Tipo de Usuario"
                placeholder="Seleccione una opción"
                icon="👤"
                options={[
                  { value: 'admin', label: '👑 Administrador' },
                  { value: 'instructor', label: '👨‍🏫 Instructor' },
                  { value: 'user', label: '👥 Usuario' }
                ]}
              />
            </div>
          </Card>
        </section>

        {/* Colores Sólidos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-azul-marino mb-6">Colores Principales</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${color.bg} h-24 flex items-center justify-center`}>
                  <span className="text-white font-medium text-sm">
                    {color.name}
                  </span>
                </div>
                <div className="p-3">
                  <p className={`${color.text} font-medium text-sm`}>
                    {color.name}
                  </p>
                  <code className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                    {color.bg}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gradientes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-azul-marino mb-6">Gradientes Predefinidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gradients.map((gradient) => (
              <div key={gradient.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${gradient.class} h-32 flex items-center justify-center`}>
                  <span className="text-white font-medium text-lg">
                    {gradient.name}
                  </span>
                </div>
                <div className="p-3">
                  <code className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                    {gradient.class}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ejemplos de Componentes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-azul-marino mb-6">Ejemplos de Componentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Botones */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Botones</h3>
              <div className="space-y-3">
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-azul-cielo transition-colors w-full">
                  Primario
                </button>
                <button className="bg-success text-white px-4 py-2 rounded-lg hover:bg-verde-bosque transition-colors w-full">
                  Éxito
                </button>
                <button className="bg-warning text-azul-marino px-4 py-2 rounded-lg hover:bg-coral transition-colors w-full">
                  Advertencia
                </button>
              </div>
            </div>

            {/* Alertas */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Alertas</h3>
              <div className="space-y-3">
                <div className="bg-success text-white p-3 rounded-lg text-sm">
                  ✅ Operación exitosa
                </div>
                <div className="bg-warning text-azul-marino p-3 rounded-lg text-sm">
                  ⚠️ Advertencia importante
                </div>
                <div className="bg-danger text-white p-3 rounded-lg text-sm">
                  ❌ Error crítico
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-azul-oscuro mb-4">Estados</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-success text-white px-3 py-1 rounded-full text-xs font-medium">
                    Activo
                  </span>
                  <span className="bg-warning text-azul-marino px-3 py-1 rounded-full text-xs font-medium">
                    Pendiente
                  </span>
                  <span className="bg-info text-white px-3 py-1 rounded-full text-xs font-medium">
                    Información
                  </span>
                  <span className="bg-neutral text-azul-oscuro px-3 py-1 rounded-full text-xs font-medium">
                    Inactivo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Texto con colores */}
        <section>
          <h2 className="text-2xl font-semibold text-azul-marino mb-6">Textos con Colores</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-primary text-lg mb-2">Texto primario - usado para enlaces y elementos principales</p>
            <p className="text-secondary text-lg mb-2">Texto secundario - para títulos y contenido importante</p>
            <p className="text-success text-lg mb-2">Texto de éxito - para confirmaciones y estados positivos</p>
            <p className="text-danger text-lg mb-2">Texto de peligro - para errores y advertencias críticas</p>
            <p className="text-azul-marino text-lg">Texto azul marino - para contenido general</p>
          </div>
        </section>
      </div>
    </Container>
  );
}
