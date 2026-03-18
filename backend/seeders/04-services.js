"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtén el primer usuario como creador (usualmente un admin o instructor)
    const [user] = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE role IN ('admin', 'superadmin') ORDER BY id ASC LIMIT 1;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!user) {
      throw new Error("No hay usuarios administrativos en la base de datos para asignar como creadores de servicios.");
    }

    const now = new Date();
    const servicesData = [
      { name: "Atención en Enfermería", description: "Evaluación básica de salud, primeros auxilios y orientación en cuidado personal.", area: "Salud" },
      { name: "Jornadas de Promoción y Prevención", description: "Actividades enfocadas en prevención de enfermedades, salud sexual y estilos de vida saludables.", area: "Salud" },
      { name: "Talleres de Expresión Artística", description: "Espacios para desarrollar habilidades en danza, música, teatro y artes plásticas.", area: "Arte y Cultura" },
      { name: "Eventos Culturales Institucionales", description: "Participación en actividades culturales que fomentan la identidad y el talento de los aprendices.", area: "Arte y Cultura" },
      { name: "Torneos Deportivos Internos", description: "Competencias deportivas entre aprendices para fomentar la integración y el trabajo en equipo.", area: "Deporte y Recreación" },
      { name: "Actividades Recreativas y Lúdicas", description: "Espacios de esparcimiento para reducir el estrés y fortalecer la convivencia.", area: "Deporte y Recreación" },
      { name: "Apoyo de Sostenimiento", description: "Asignación de ayudas económicas para aprendices en condición de vulnerabilidad.", area: "Apoyo Socioeconómico y Reconocimiento a la Excelencia" },
      { name: "Reconocimiento a la Excelencia Académica", description: "Incentivos y reconocimientos a aprendices destacados por su rendimiento académico.", area: "Apoyo Socioeconómico y Reconocimiento a la Excelencia" },
      { name: "Orientación Psicológica Individual", description: "Atención personalizada para el manejo de situaciones emocionales, familiares o académicas.", area: "Apoyo Psicosocial" },
      { name: "Talleres de Habilidades Socioemocionales", description: "Actividades grupales para fortalecer habilidades como comunicación, manejo del estrés y resolución de conflictos.", area: "Apoyo Psicosocial" }
    ];

    const services = servicesData.map(s => ({
      ...s,
      image: null,
      creatorId: user.id,
      detailUrl: null,
      status: "activo",
      createdAt: now,
      updatedAt: now,
    }));

    // Insertar los servicios
    await queryInterface.bulkInsert("Services", services);

    // Obtener los servicios insertados
    const insertedServices = await queryInterface.sequelize.query(
      "SELECT id, name, area FROM Services ORDER BY id DESC LIMIT 10;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Actualizar cada servicio con su URL dinámica
    for (const service of insertedServices) {
      const normalizedArea = service.area
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      
      const detailUrl = `/${normalizedArea}/${service.id}`;
      
      await queryInterface.bulkUpdate("Services", 
        { detailUrl: detailUrl },
        { id: service.id }
      );
    }

    console.log("10 servicios de Bienestar creados exitosamente.");
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Services", null, {});
  }
};
