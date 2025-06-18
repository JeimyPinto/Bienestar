"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.User, {
        foreignKey: "groupId",
        as: "members"
      });
      Group.belongsTo(models.User, {
        foreignKey: "instructorId",
        as: "instructor"
      });
    }
  }
  Group.init({
    fichaNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    programName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    programType: {
      type: DataTypes.ENUM("tecnico", "tecnologia", "complementaria"),
      allowNull: false
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fichaStatus: {
      type: DataTypes.ENUM("etapa lectiva", "etapa practica", "certificados"),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "Group",
    timestamps: true,
  });
  return Group;
};
