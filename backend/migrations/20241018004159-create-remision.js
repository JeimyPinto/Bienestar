'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Remisiones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aprendizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Aprendices',
          key: 'id'
        }
      },
      integranteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Integrantes',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Remisiones');
  }
};