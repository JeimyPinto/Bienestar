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
    const area = "Salud";

    // Insertar el servicio
    await queryInterface.bulkInsert("Services", [
      {
        name: "Servicio de Prueba",
        image: null,
        description: "Primer servicio de prueba.",
        creatorId: user.id,
        area: area,
        detailUrl: null, // Se actualizará después
        status: "activo",
        createdAt: now,
        updatedAt: now,
      }
    ]);

    // Obtener el ID del servicio insertado
    const [insertedService] = await queryInterface.sequelize.query(
      "SELECT id FROM Services WHERE name = 'Servicio de Prueba' ORDER BY id DESC LIMIT 1;",
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Actualizar con la URL dinámica
    if (insertedService) {
      const detailUrl = "/" + area.toLowerCase().replace(/\s+/g, "-") + "/" + insertedService.id;
      await queryInterface.bulkUpdate("Services", 
        { detailUrl: detailUrl },
        { id: insertedService.id }
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Services", null, {});
  }
};