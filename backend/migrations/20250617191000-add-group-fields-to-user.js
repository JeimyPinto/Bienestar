"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "groupId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Groups",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "groupId");
  }
};
