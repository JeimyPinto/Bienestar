'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    static associate(models) {
      Servicio.belongsTo(models.Usuario, { foreignKey: 'encargadoId' });
    }
  }
  Servicio.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    encargadoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Servicio',
    tableName: 'Servicios',
    timestamps: true
  });
  return Servicio;
};