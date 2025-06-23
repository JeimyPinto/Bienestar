// models/remission.js

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Remission = sequelize.define('Remission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Requests', key: 'id' },
    },
    referredUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
    assignedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Services', key: 'id' },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'Remissions',
    timestamps: true,
  });

  Remission.associate = function(models) {
    Remission.belongsTo(models.Request, { foreignKey: 'requestId', as: 'request' });
    Remission.belongsTo(models.User, { foreignKey: 'referredUserId', as: 'referredUser' });
    Remission.belongsTo(models.User, { foreignKey: 'assignedUserId', as: 'assignedUser' });
    Remission.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  };

  return Remission;
};
