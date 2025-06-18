"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class audit_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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