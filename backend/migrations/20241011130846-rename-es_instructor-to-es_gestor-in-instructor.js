'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Instructor', 'es_instructor', 'es_gestor');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Instructor', 'es_gestor', 'es_instructor');
  },
};
