"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "detailUrl", {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "URL personalizada para la página de detalle del servicio"
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Services", "detailUrl");
  }
};
