'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Integrante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Integrante.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Integrante.belongsTo(models.Lider_Bienestar, { foreignKey: 'liderId' });
      Integrante.hasMany(models.Remision, { foreignKey: 'integranteId' });
      Integrante.hasMany(models.Servicio, { foreignKey: 'encargadoId' });
      Integrante.hasMany(models.SolicitudRemision, { foreignKey: 'integranteId' });
    }
  }
  Integrante.init({
    area: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    liderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Integrante',
    tableName:'Integrante'
  });
  return Integrante;
};