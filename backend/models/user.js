"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Service, {
        foreignKey: "creatorId",
        as: "services"
      });
      User.hasMany(models.Request, {
        foreignKey: "userId",
        as: "requests"
      });
      User.belongsTo(models.Group, {
        foreignKey: "groupId",
        as: "group"
      });
      User.hasMany(models.Group, {
        foreignKey: "instructorId",
        as: "managedGroups"
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    documentType: DataTypes.STRING,
    documentNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "User",
    timestamps: true,
  });
  return User;
};
