"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.User, {
        foreignKey: "userId",
        as: "applicant"
      });
      Request.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service"
      });
      Request.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "creator"
      });
    }
  }
  Request.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Service",
        key: "id"
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id"
      }
    },
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    responseStatus: {
      type: DataTypes.ENUM("pendiente", "aprobada", "rechazada"),
      allowNull: false,
      defaultValue: "pendiente"
    },
    responseMessage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Motivo del rechazo si aplica"
    }
  }, {
    sequelize,
    modelName: "Request",
    timestamps: true,
  });
  return Request;
};