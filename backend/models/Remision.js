export const RemisionModel = (sequelize, Sequelize) => {
  sequelize.define(
    "Remision",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Usuario",
          key: "id",
        },
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      servicio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "Servicio",
          key: "id",
        },
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      jornada: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numeroFicha: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      programaFormacion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombreGestor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "remisiones",
      timestamps: true,
    }
  );
};
