"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     *
     * @param {object} models - An object containing all the models defined in the application.
     */
    static associate(models) {
      // Define associations here
    }

    // Método para verificar la contraseña
    validPassword(password) {
      return bcrypt.compareSync(password, this.contrasena);
    }
  }

  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nombre del usuario",
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Apellido del usuario",
      },
      documento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "Documento de identificación del usuario",
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Número de teléfono del usuario",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        comment: "Correo electrónico del usuario",
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Contraseña del usuario",
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activa',
        validate: {
          isIn: [['inactiva', 'activa', 'cerrada']]
        },
        comment: "Estado del usuario"
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      timestamps: true,
      comment: "Tabla que almacena los datos de los usuarios",
      hooks: {
        beforeCreate: async (usuario) => {
          const salt = await bcrypt.genSalt(10);
          usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
        },
        beforeUpdate: async (usuario) => {
          if (usuario.changed("contrasena")) {
            const salt = await bcrypt.genSalt(10);
            usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
          }
        },
      },
    }
  );

  return Usuario;
};
