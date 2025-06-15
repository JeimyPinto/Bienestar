'use strict';

/**
 * Migración para crear la tabla user_audit para auditoría de cambios en la tabla Users.
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_audit', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      action: {
        type: Sequelize.STRING(10), // 'INSERT', 'UPDATE', 'DELETE'
        allowNull: false
      },
      old_data: {
        type: Sequelize.JSON,
        allowNull: true
      },
      new_data: {
        type: Sequelize.JSON,
        allowNull: true
      },
      changed_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      changed_by: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_audit');
  }
};
