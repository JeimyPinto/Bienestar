'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Usuarios', {
      fields: ['documento'],
      type: 'unique',
      name: 'unique_documento_constraint'
    });

    await queryInterface.addConstraint('Usuarios', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Usuarios', 'unique_documento_constraint');
    await queryInterface.removeConstraint('Usuarios', 'unique_email_constraint');
  }
};
