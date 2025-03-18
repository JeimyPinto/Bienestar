'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Services', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
      },
      description: {
      type: Sequelize.STRING,
      allowNull: false
      },
      creatorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
      },
      area: {
      type: Sequelize.ENUM,
      values: ['Salud', 'Arte y Cultura', 'Deporte y Recreación', 'Apoyo Socioeconomico y Reconocimiento a la Excelencia', 'Apoyo Psicosocial'],
      allowNull: false
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
    await queryInterface.dropTable('Services');
  }
};