'use strict';

const SequelizeModule = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuario', 'documento', {
      type: SequelizeModule.STRING,
      allowNull: false,
      after: 'apellido',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuario', 'documento');
  },
};