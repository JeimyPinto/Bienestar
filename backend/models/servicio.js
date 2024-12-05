'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    static associate(models) {
      Servicio.belongsTo(models.Integrante, { foreignKey: 'encargadoId' });
    }
  }
  Servicio.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    encargadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Integrante',
        key: 'id'
      },
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Servicio',
  });
  return Servicio;
};