'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lider_Bienestar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lider_Bienestar.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Lider_Bienestar.hasMany(models.Integrante, { foreignKey: 'liderId' });
    }
  }
  Lider_Bienestar.init({
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lider_Bienestar',
    tableName: 'lider_bienestar'
  });
  return Lider_Bienestar;
};