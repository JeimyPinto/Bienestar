"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Instructores", {
      fields: ["usuarioId"],
      type: "foreign key",
      name: "fk_intructor_usuario",
      references: {
        table: "Usuarios",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Instructores",
      "fk_intructor_usuario"
    );
  },
};
