'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // Puedes asociar con User si lo deseas
      user_audit.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  user_audit.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    old_data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    new_data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    changed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    changed_by: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user_audit',
    tableName: 'user_audit',
    timestamps: false
  });
  return user_audit;
};
