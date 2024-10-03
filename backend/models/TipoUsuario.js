export const TipoUsuarioModel = (sequelize, Sequelize) => {
  sequelize.define(
    "TipoUsuario",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tipo_usuario",
      timestamps: true,
    }
  );
};
