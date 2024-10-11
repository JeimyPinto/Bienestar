const SequelizeModule = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Usuario", "contrasena", {
      type: SequelizeModule.STRING,
      allowNull: false,
      after: "email",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Usuario", "contrasena");
  },
};
