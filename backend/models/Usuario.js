import { Sequelize, DataTypes } from "sequelize";
import { db } from "../config/config.js";

/**
 * Inicializar el modelo de usuario
 * @param {Sequelize} sequelize Instancia de Sequelize
 */
const Usuario = sequelize.define(
  "Usuario",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
