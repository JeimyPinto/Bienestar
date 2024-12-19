"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    await queryInterface.addColumn("Usuarios", "rol", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Usuarios", "imagen", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.removeColumn("Usuarios", "rol");
    await queryInterface.removeColumn("Usuarios", "imagen");
  },
};
