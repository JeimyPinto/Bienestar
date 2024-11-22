'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar la restricción si existe
    await queryInterface.sequelize.query(`
      ALTER TABLE Servicios
      DROP FOREIGN KEY IF EXISTS fk_servicios_encargadoId;
    `).catch(() => {});

    // Agregar la nueva restricción
    await queryInterface.sequelize.query(`
      ALTER TABLE Servicios
      ADD CONSTRAINT fk_servicios_encargadoId
      FOREIGN KEY (encargadoId)
      REFERENCES Integrantes(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la restricción si existe
    await queryInterface.sequelize.query(`
      ALTER TABLE Servicios
      DROP FOREIGN KEY IF EXISTS fk_servicios_encargadoId;
    `).catch(() => {});

    // Revertir a la restricción original
    await queryInterface.sequelize.query(`
      ALTER TABLE Servicios
      ADD CONSTRAINT fk_servicios_encargadoId
      FOREIGN KEY (encargadoId)
      REFERENCES Usuarios(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE;
    `);
  }
};
