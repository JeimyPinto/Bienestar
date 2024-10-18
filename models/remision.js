'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Remision extends Model {
    static associate(models) {
      Remision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
      Remision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
    }
  }
  Remision.init({
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aprendizId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    integranteId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Remision',
  });
  return Remision;
};