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

    await queryInterface.bulkInsert('Users', users);
    console.log('Usuarios creados exitosamente.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    console.log('Usuarios eliminados exitosamente.');
  },
};