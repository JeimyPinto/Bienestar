'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ficha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ficha.hasMany(models.Aprendiz, { foreignKey: 'fichaId' });
      Ficha.hasMany(models.Instructor, { foreignKey: 'fichaId' });
    }
  }
  Ficha.init({
    numero: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ficha',
    tableName: 'Ficha'
  });
  return Ficha;
};