'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Servicio.belongsTo(models.Integrante, { foreignKey: 'encargadoId' });
    }
  }
  Servicio.init({
    nombre: DataTypes.STRING,
    encargadoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Servicio',
    tableName: 'Servicio'
  });
  return Servicio;
};