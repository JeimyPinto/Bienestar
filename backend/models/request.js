'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Request.belongsTo(models.Service, {
        foreignKey: 'serviceId',
        as: 'service'
      });
    }
  }
  Request.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Service',
        key: 'id'
      }
    },
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Request',
    timestamps: true,
  });
  return Request;
};