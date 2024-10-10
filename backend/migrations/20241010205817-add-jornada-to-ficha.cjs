'use strict';

const SequelizeModule = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ficha', 'jornada', {
      type: SequelizeModule.STRING,
      allowNull: false,
      after: 'numero'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Ficha', 'jornada');
  },
};