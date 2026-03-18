const { fakerES: faker } = require("@faker-js/faker");

const groupFactory = (overrides = {}) => {
  const programs = {
    tecnologia: [
      "Análisis y Desarrollo de Software",
      "Gestión Documental",
      "Gestión Contable y de Información Financiera",
      "Sistemas Integrados de Gestión",
      "Gestión Empresarial",
      "Gestión de Negocios y Finanzas",
      "Gestión Administrativa",
      "Gestión Financiera y Crediticia"
    ],
    tecnico: [
      "Sistemas Teleinformáticos",
      "Cocina",
      "Asistencia Administrativa",
      "Integración de Operaciones Logísticas",
      "Mantenimiento de Equipos de Aire Acondicionado y Refrigeración",
      "Servicio de Restaurante y Bar",
      "Recursos Humanos",
      "Asistencia en Organización de Archivos",
      "Enfermería"
    ],
    complementaria: [
      "Cocina (Auxiliar)",
      "Promotor de Salud",
      "Información Turística",
      "Promoción de Seguridad Alimentaria",
      "Enchapado",
      "Mecánica Industrial",
      "Manejo de Maquinaria de Confección Industrial para Ropa Exterior",
      "Cuidado Estético de Manos y Pies",
      "Manejo de Maquinaria de Confección Industrial",
      "Procesos de Panadería",
      "Piscicultura",
      "Soldadura de Tuberías de Acero al Carbono (Profundización)",
      "Montaje y Mantenimiento de Sistemas Solares Fotovoltaicos",
      "Atención Integral al Paciente Domiciliario"
    ]
  };

  const programType = overrides.programType || faker.helpers.arrayElement(["tecnico", "tecnologia", "complementaria"]);
  const programName = overrides.programName || faker.helpers.arrayElement(programs[programType]);

  return {
    fichaNumber: faker.string.numeric(7), // Ej: 2613934
    programName,
    programType,
    instructorId: null, // Debe ser asignado en el seeder
    fichaStatus: faker.helpers.arrayElement(["etapa lectiva", "etapa practica", "certificados"]),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  };
};

module.exports = { groupFactory };
