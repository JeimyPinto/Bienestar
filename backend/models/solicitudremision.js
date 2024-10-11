'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SolicitudRemision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SolicitudRemision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
      SolicitudRemision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
    }
  }
  SolicitudRemision.init({
    area: DataTypes.STRING,
    aprendizId: DataTypes.INTEGER,
    integranteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SolicitudRemision',
    tableName: 'SolicitudRemision',
  });
  return SolicitudRemision;
};