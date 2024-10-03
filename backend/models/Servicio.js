export const ServicioModel = (sequelize, Sequelize) => {
  sequelize.define(
    "Servicio",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "servicio",
      timestamps: true,
    }
  );
};
