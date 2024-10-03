export const UsuarioModel = (sequelize, Sequelize) => {
  sequelize.define(
    "Usuario",
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
      documento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "TipoUsuario",
          key: "id",
        },
      },
    },
    {
      tableName: "usuario",
      timestamps: true,
    }
  );
};
