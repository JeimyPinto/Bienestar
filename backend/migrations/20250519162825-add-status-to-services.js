'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Services', 'status', {
      type: Sequelize.ENUM('activo', 'inactivo'),
      allowNull: false,
      defaultValue: 'activo',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Services', 'status');
    // Elimina el tipo ENUM si no lo usa ninguna otra tabla
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Services_status";');
  }
};