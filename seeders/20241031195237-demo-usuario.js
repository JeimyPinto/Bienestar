'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Jeimy',
        apellido: 'Pinto',
        documento: '1053872476',
        telefono: '3058122481',
        email: 'jeimytatianapinto@gmail.com',
        contrasena: 'password123',
        estado: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
