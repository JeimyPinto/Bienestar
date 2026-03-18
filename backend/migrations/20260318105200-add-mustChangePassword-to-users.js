"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("Users", "mustChangePassword", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
    } catch (error) {
      console.log("Columna mustChangePassword puede que ya exista.");
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "mustChangePassword");
  }
};
