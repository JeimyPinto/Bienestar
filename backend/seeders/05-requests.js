const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE role = 'user';",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const services = await queryInterface.sequelize.query(
      "SELECT id FROM Services;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!users.length || !services.length) {
      throw new Error("No hay aprendices o servicios en la base de datos.");
    }

    const requests = [];
    for (let i = 0; i < 20; i++) {
      const user = faker.helpers.arrayElement(users);
      const service = faker.helpers.arrayElement(services);

      requests.push({
        userId: user.id,
        serviceId: service.id,
        createdBy: user.id,
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([true, false]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Requests", requests);
    console.log("20 Peticiones aleatorias creadas.");
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Requests", null, {});
  },
};
