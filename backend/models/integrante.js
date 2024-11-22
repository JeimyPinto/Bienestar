'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Integrante extends Model {
    static associate(models) {
      Integrante.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  Integrante.init({
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Integrante',
  });
  return Integrante;
};