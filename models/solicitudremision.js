'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SolicitudRemision extends Model {
    static associate(models) {
      SolicitudRemision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
      SolicitudRemision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
    }
  }
  SolicitudRemision.init({
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aprendizId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    integranteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'SolicitudRemision',
  });
  return SolicitudRemision;
};