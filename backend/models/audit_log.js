"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class audit_log extends Model {
    static associate(models) {
      audit_log.belongsTo(models.User, {
        foreignKey: "changed_by",
        targetKey: "id",
        as: "user"
      });
    }
  }
  audit_log.init({
    entity_type: DataTypes.STRING,
    entity_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    old_data: DataTypes.JSON,
    new_data: DataTypes.JSON,
    changed_by: DataTypes.STRING,
    changed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: "audit_log",
  });
  return audit_log;
};