'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lider_Bienestar extends Model {
    static associate(models) {
      Lider_Bienestar.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  Lider_Bienestar.init({
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Lider_Bienestar',
    tableName: 'Lider_Bienestar',
    timestamps: true,
  });
  return Lider_Bienestar;
};