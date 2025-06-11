const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtén los IDs de usuarios y servicios existentes
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const services = await queryInterface.sequelize.query(
      'SELECT id FROM Services;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!users.length || !services.length) {
      throw new Error('No hay usuarios o servicios en la base de datos.');
    }

    const requests = [];
    for (let i = 0; i < 10; i++) {
      const user = faker.helpers.arrayElement(users);
      const service = faker.helpers.arrayElement(services);

      requests.push({
        userId: user.id,
        serviceId: service.id,
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([true, false]),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Requests', requests);
    console.log('Requests creadas exitosamente.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Requests', null, {});
    console.log('Requests eliminadas exitosamente.');
  },
};