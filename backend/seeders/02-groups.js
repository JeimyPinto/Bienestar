const { groupFactory } = require("./factories/group-factory");

module.exports = {
  up: async (queryInterface) => {
    // Obtener todos los instructores existentes
    const instructors = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE role = 'instructor';",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!instructors.length) {
      throw new Error("No hay instructores en la base de datos para asignar a las fichas.");
    }

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

    const groups = [];

    // Crear al menos una ficha por cada programa mencionado por el usuario
    for (const [type, list] of Object.entries(programs)) {
      list.forEach(programName => {
        // En cada programa, asignamos un instructor aleatorio de los creados
        const randomInstructor = instructors[Math.floor(Math.random() * instructors.length)];
        groups.push(groupFactory({ 
          programName, 
          programType: type,
          instructorId: randomInstructor.id
        }));
      });
    }

    await queryInterface.bulkInsert("Groups", groups);
    console.log(`${groups.length} fichas (grupos) creadas exitosamente.`);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
