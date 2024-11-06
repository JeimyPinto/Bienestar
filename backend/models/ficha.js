'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ficha extends Model {
    static associate(models) {
      // Define associations here
      // Example: Ficha.hasMany(models.Aprendiz, { foreignKey: 'fichaId' });
    }
  }
  Ficha.init({
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jornada: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ficha',
    tableName: 'Fichas',
    timestamps: true
  });
  return Ficha;
};