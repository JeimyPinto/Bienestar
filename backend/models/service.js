"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.User, {
        foreignKey: "creatorId",
        as: "creator",
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      area: {
        type: DataTypes.ENUM,
        values: [
          "Salud",
          "Arte y Cultura",
          "Deporte y Recreación",
          "Apoyo Socioeconomico y Reconocimiento a la Excelencia",
          "Apoyo Psicosocial",
        ],
      },
      image: DataTypes.STRING,
      detailUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "URL personalizada para la página de detalle del servicio"
      },
      status: {
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: false,
        defaultValue: "activo",
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true,
    }
  );
  return Service;
};