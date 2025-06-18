"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Requests", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    await queryInterface.addColumn("Requests", "createdBy", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    await queryInterface.addColumn("Requests", "serviceId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Services",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("Requests", "userId");
    await queryInterface.removeColumn("Requests", "createdBy");
    await queryInterface.removeColumn("Requests", "serviceId");
  }
};
