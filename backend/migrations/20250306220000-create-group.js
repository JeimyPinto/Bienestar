"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fichaNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      programName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      programType: {
        type: Sequelize.ENUM("tecnico", "tecnologia", "complementaria"),
        allowNull: false
      },
      fichaStatus: {
        type: Sequelize.ENUM("etapa lectiva", "etapa practica", "certificados"),
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
  async down(queryInterface) {
    await queryInterface.dropTable("Groups");
  }
};
