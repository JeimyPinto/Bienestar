'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasOne(models.Lider_Bienestar, { foreignKey: 'usuarioId' });
      Usuario.hasOne(models.Aprendiz, { foreignKey: 'usuarioId' });
      Usuario.hasOne(models.Instructor, { foreignKey: 'usuarioId' });
      Usuario.hasOne(models.Integrante, { foreignKey: 'usuarioId' });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
  });
  return Usuario;
};