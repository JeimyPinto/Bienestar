const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];

    // Usuario fijo
    users.push({
      firstName: "Jeimy Tatiana",
      lastName: "Pinto Tapia",
      documentType: "CC",
      documentNumber: 1053872476,
      phone: "3058122481",
      email: "jeimytatianapinto@gmail.com",
      password: bcrypt.hashSync("1053872476", 10),
      role: "admin",
      status: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Usuarios aleatorios
    for (let i = 0; i < 3; i++) {
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
        role: faker.helpers.arrayElement(['admin', 'user', 'integrante']),
        status: 'activo',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', users);
    console.log('Usuarios creados exitosamente.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    console.log('Usuarios eliminados exitosamente.');
  },
};