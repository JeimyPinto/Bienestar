"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Requests", "responseStatus", {
      type: Sequelize.ENUM("pendiente", "aprobada", "rechazada"),
      allowNull: false,
      defaultValue: "pendiente",
    });
    await queryInterface.addColumn("Requests", "responseMessage", {
      type: Sequelize.STRING(255),
      allowNull: true,
      comment: "Motivo del rechazo si aplica",
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("Requests", "responseStatus");
    await queryInterface.removeColumn("Requests", "responseMessage");
  }
};
