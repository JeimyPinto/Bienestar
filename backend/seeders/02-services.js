"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
    // Obtén el primer usuario como creador
    const [user] = await queryInterface.sequelize.query(
      "SELECT id FROM Users ORDER BY id ASC LIMIT 1;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!user) {
      throw new Error("No hay usuarios en la base de datos.");
    }

    const now = new Date();

    await queryInterface.bulkInsert("Services", [
      {
        name: "Servicio de Prueba",
        image: null,
        description: "Primer servicio de prueba.",
        creatorId: user.id,
        area: "Salud",
        status: "inactivo",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Servicio de Arte",
        image: null,
        description: "Servicio relacionado con arte y cultura.",
        creatorId: user.id,
        area: "Arte y Cultura",
        status: "inactivo",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Servicio Deportivo",
        image: null,
        description: "Servicio de deporte y recreación.",
        creatorId: user.id,
        area: "Deporte y Recreación",
        status: "inactivo",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Services", null, {});
  }
};