'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instructor.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Instructor.belongsTo(models.Ficha, { foreignKey: 'fichaId' });
    }
  }
  Instructor.init({
    usuarioId: DataTypes.INTEGER,
    es_instructor: DataTypes.BOOLEAN,
    fichaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instructor',
    tableName: 'Instructor'
  });
  return Instructor;
};