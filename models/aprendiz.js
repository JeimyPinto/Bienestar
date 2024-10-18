'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aprendiz extends Model {
    static associate(models) {
      Aprendiz.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Aprendiz.belongsTo(models.Ficha, { foreignKey: 'fichaId' });
    }
  }
  Aprendiz.init({
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fichaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Aprendiz',
  });
  return Aprendiz;
};