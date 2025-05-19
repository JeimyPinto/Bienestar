const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const db = require('../models/index.js');
const User = db.User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    for (let i = 0; i < 10; i++) {
      const password = faker.internet.password(10);
      const hashedPassword = bcrypt.hashSync(password, 10);

      users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        documentType: faker.helpers.arrayElement(['CC', 'TI', 'CE', 'RC', 'PA', 'PEP']),
        documentNumber: faker.number.int({ min: 10000000, max: 99999999 }),
        phone: faker.phone.number('+57 ### ### ####'),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['admin', 'user']),
        status: 'activo',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Inserta los usuarios en la base de datos
    await queryInterface.bulkInsert('Users', users);
    console.log('Usuarios creados exitosamente.');
  },

  down: async (queryInterface, Sequelize) => {
    // Elimina todos los usuarios creados por este seeder
    await queryInterface.bulkDelete('Users', null, {});
    console.log('Usuarios eliminados exitosamente.');
  },
};